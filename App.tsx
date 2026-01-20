
import React, { useState, useEffect, useMemo } from 'react';
import { Sale, User, Theme } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SaleCard from './components/SaleCard';
import SaleForm from './components/SaleForm';
import Login from './components/Login';
import { PlusCircle, Loader2 } from 'lucide-react';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initial Load: User and Theme from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('sales_user');
    const savedTheme = localStorage.getItem('sales_theme') as Theme;

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  // Sync Theme
  useEffect(() => {
    localStorage.setItem('sales_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Fetch Sales from Supabase when user changes
  useEffect(() => {
    if (user) {
      fetchSales();
    }
  }, [user]);

  const fetchSales = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .eq('sellerEmail', user.email)
        .order('date', { ascending: false });

      if (error) throw error;
      if (data) setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
      alert('Erro ao carregar vendas do banco de dados.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (email: string) => {
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem('sales_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setSales([]);
    localStorage.removeItem('sales_user');
    setIsSidebarOpen(false);
  };

  const addSale = async (newSaleData: Omit<Sale, 'id' | 'sellerEmail' | 'date'>) => {
    if (!user) return;
    setIsLoading(true);
    
    const newSale = {
      clientName: newSaleData.clientName,
      clientCPF: newSaleData.clientCPF,
      value: newSaleData.value,
      sellerEmail: user.email,
      date: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from('sales')
        .insert([newSale])
        .select();

      if (error) throw error;
      if (data) {
        setSales(prev => [data[0], ...prev]);
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error adding sale:', error);
      alert('Erro ao salvar venda no banco de dados.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSales = useMemo(() => {
    if (!searchTerm) return sales;
    const term = searchTerm.toLowerCase();
    return sales.filter(s => 
      s.clientName.toLowerCase().includes(term) || 
      s.clientCPF.includes(term)
    );
  }, [sales, searchTerm]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        onToggleMenu={() => setIsSidebarOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 container mx-auto px-4 py-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Minhas Vendas</h1>
          <button 
            onClick={() => setIsFormOpen(true)}
            disabled={isLoading}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg active:scale-95 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <PlusCircle size={20} />}
            <span>Nova Venda</span>
          </button>
        </div>

        {isLoading && sales.length === 0 ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary-500" size={48} />
          </div>
        ) : filteredSales.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSales.map(sale => (
              <SaleCard key={sale.id} sale={sale} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-xl font-medium">Nenhuma venda encontrada.</p>
            {searchTerm && <p className="mt-1">Tente buscar por outro termo.</p>}
          </div>
        )}
      </main>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        userEmail={user.email}
        onLogout={handleLogout}
      />

      {isFormOpen && (
        <SaleForm 
          onSubmit={addSale} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
