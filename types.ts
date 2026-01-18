
export interface Sale {
  id: string;
  clientName: string;
  clientCPF: string;
  value: number;
  date: string;
  sellerEmail: string;
}

export interface User {
  email: string;
}

export type Theme = 'light' | 'dark';
