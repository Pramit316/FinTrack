export type TransactionType = 'INCOME' | 'EXPENSE' | 'income' | 'expense';

/** Shape returned/sent by the Spring Boot API */
export interface TransactionApiDto {
  id?: number;
  title: string;
  amount: number;
  type?: string;
  category?: string;
  transactionDate?: string;
  description?: string;
  createdAt?: string;
}

/** Normalized model used by the Angular UI */
export interface Transaction {
  id?: number;
  title: string;
  amount: number;
  transactionType: string;
  category?: string;
  date: string;
  description?: string;
  paymentMethod?: string;
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

export function mapTransactionFromApi(raw: TransactionApiDto): Transaction {
  const typeValue = raw.type ?? (raw as { transactionType?: string }).transactionType;
  const dateValue = raw.transactionDate ?? (raw as { date?: string }).date;

  return {
    id: raw.id,
    title: raw.title,
    amount: raw.amount,
    transactionType: normalizeTransactionType(typeValue),
    category: raw.category,
    date: dateValue ?? '',
    description: raw.description,
  };
}

export function toApiTransaction(transaction: CreateTransaction): TransactionApiDto {
  return {
    title: transaction.title,
    amount: transaction.amount,
    type: normalizeTransactionType(transaction.transactionType) || transaction.transactionType,
    category: transaction.category,
    transactionDate: transaction.date,
    description: transaction.description,
  };
}
