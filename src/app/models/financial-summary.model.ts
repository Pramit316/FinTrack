export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

export function mapSummaryFromApi(data: Record<string, number>): FinancialSummary {
  return {
    totalBalance: pickNumber(data, ['totalBalance', 'balance', 'netBalance']),
    totalIncome: pickNumber(data, ['totalIncome', 'income']),
    totalExpense: pickNumber(data, ['totalExpense', 'expense']),
  };
}

function pickNumber(data: Record<string, number>, keys: string[]): number {
  for (const key of keys) {
    const value = data[key];
    if (value !== undefined && value !== null) {
      return Math.abs(value);
    }
  }
  return 0;
}
