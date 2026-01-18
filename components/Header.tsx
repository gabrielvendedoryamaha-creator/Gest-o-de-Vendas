
import React from 'react';
import { Menu, Search, Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleMenu: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  searchTerm, 
  onSearchChange, 
  onToggleMenu, 
  theme, 
  onToggleTheme 
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Menu Button */}
        <button 
          onClick={onToggleMenu}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por Nome ou CPF..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-gray-950 rounded-xl outline-none transition-all dark:text-white"
          />
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={onToggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Alternar Tema"
        >
          {theme === 'light' ? (
            <Moon size={24} className="text-gray-600" />
          ) : (
            <Sun size={24} className="text-yellow-400" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
