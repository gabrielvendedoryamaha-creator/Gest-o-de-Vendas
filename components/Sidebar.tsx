
import React from 'react';
import { X, LogOut, User, BarChart2, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userEmail, onLogout }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400">VendaPronta</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <X size={20} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300">
                <User size={24} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Vendedor(a)</p>
                <p className="text-sm font-bold truncate">{userEmail}</p>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium">
                <BarChart2 size={20} />
                Minhas Vendas
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings size={20} />
                Configurações
              </button>
            </nav>
          </div>

          {/* Footer */}
          <div className="mt-auto p-6 border-t border-gray-100 dark:border-gray-700">
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
