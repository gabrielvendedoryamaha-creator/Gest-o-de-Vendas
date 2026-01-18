
import React from 'react';
import { Sale } from '../types';
import { User, DollarSign, Calendar, Fingerprint } from 'lucide-react';

interface SaleCardProps {
  sale: Sale;
}

const SaleCard: React.FC<SaleCardProps> = ({ sale }) => {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(sale.value);

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(sale.date));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-xl">
          <User className="text-primary-600 dark:text-primary-400" size={24} />
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Valor Total</p>
          <p className="text-xl font-black text-primary-600 dark:text-primary-400">{formattedValue}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold truncate" title={sale.clientName}>
          {sale.clientName}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Fingerprint size={16} />
            <span>{sale.clientCPF}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-end">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleCard;
