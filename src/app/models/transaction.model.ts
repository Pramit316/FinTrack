export type TransactionType = 'INCOME' | 'EXPENSE' | 'income' | 'expense';

export interface Transaction {
  id?: number;
  title: string;
  amount: number;
  transactionType: TransactionType | string;
  paymentMethod?: string;
  category?: string;
  date: string;
  description?: string;
}

export type CreateTransaction = Omit<Transaction, 'id'>;

export function normalizeTransactionType(type: string | undefined): 'income' | 'expense' | '' {
  if (!type) {
    return '';
  }
  const value = type.toUpperCase();
  if (value === 'INCOME') {
    return 'income';
  }
  if (value === 'EXPENSE') {
    return 'expense';
  }
  return type.toLowerCase() as 'income' | 'expense';
}

export function toApiTransactionType(type: string | undefined): string {
  return (type ?? '').toUpperCase();
}

export function mapTransactionFromApi(transaction: Transaction): Transaction {
  return {
    ...transaction,
    transactionType: normalizeTransactionType(String(transaction.transactionType)),
  };
}
