
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Sale } from '../types';

interface SaleFormProps {
  onSubmit: (data: Omit<Sale, 'id' | 'sellerEmail' | 'date'>) => void;
  onClose: () => void;
}

const SaleForm: React.FC<SaleFormProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cpf || !value) return;

    onSubmit({
      clientName: name,
      clientCPF: cpf,
      value: parseFloat(value.replace(',', '.')),
    });
  };

  const formatCPF = (val: string) => {
    const raw = val.replace(/\D/g, '');
    return raw
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-xl font-bold">Cadastrar Venda</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">Nome do Cliente</label>
            <input
              autoFocus
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              placeholder="Digite o nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">CPF</label>
            <input
              required
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              placeholder="000.000.000-00"
              maxLength={14}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">Valor da Venda (R$)</label>
            <input
              required
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary-500 outline-none transition-all font-mono"
              placeholder="0,00"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-[2] bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-95"
            >
              Salvar Venda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleForm;
