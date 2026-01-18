
import React, { useState } from 'react';
import { User, LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      onLogin(email.toLowerCase());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-500 to-primary-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-8 md:p-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary-600 dark:text-primary-400 rotate-12 shadow-inner">
            <User size={40} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Bem-vindo(a)</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Acesse sua lista de vendas agora</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Seu E-mail</label>
            <div className="relative">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@exemplo.com"
                className="w-full pl-4 pr-4 py-4 bg-gray-100 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-gray-950 rounded-2xl outline-none transition-all dark:text-white font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary-500/30 transition-all hover:-translate-y-1 active:scale-95 group"
          >
            <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
            ENTRAR NO SISTEMA
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest">
          Sistema de Gestão VendaPronta
        </p>
      </div>
    </div>
  );
};

export default Login;
