
import React, { useState, useEffect, useMemo } from 'react';
import { Sale, User, Theme } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SaleCard from './components/SaleCard';
import SaleForm from './components/SaleForm';
import Login from './components/Login';
import { PlusCircle } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Persistence logic
  useEffect(() => {
    const savedUser = localStorage.getItem('sales_user');
    const savedSales = localStorage.getItem('sales_data');
    const savedTheme = localStorage.getItem('sales_theme') as Theme;

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedSales) setSales(JSON.parse(savedSales));
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sales_data', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('sales_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

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
    localStorage.removeItem('sales_user');
    setIsSidebarOpen(false);
  };

  const addSale = (newSaleData: Omit<Sale, 'id' | 'sellerEmail' | 'date'>) => {
    if (!user) return;
    const newSale: Sale = {
      ...newSaleData,
      id: crypto.randomUUID(),
      sellerEmail: user.email,
      date: new Date().toISOString(),
    };
    setSales(prev => [newSale, ...prev]);
    setIsFormOpen(false);
  };

  const filteredSales = useMemo(() => {
    if (!user) return [];
    const userSales = sales.filter(s => s.sellerEmail === user.email);
    if (!searchTerm) return userSales;

    const term = searchTerm.toLowerCase();
    return userSales.filter(s => 
      s.clientName.toLowerCase().includes(term) || 
      s.clientCPF.includes(term)
    );
  }, [sales, user, searchTerm]);

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
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg active:scale-95"
          >
            <PlusCircle size={20} />
            <span>Nova Venda</span>
          </button>
        </div>

        {filteredSales.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSales.map(sale => (
              <SaleCard key={sale.id} sale={sale} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-xl">Nenhuma venda encontrada.</p>
            {searchTerm && <p>Tente buscar por outro termo.</p>}
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
