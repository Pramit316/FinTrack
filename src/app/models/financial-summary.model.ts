export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

export function mapSummaryFromApi(data: Record<string, number>): FinancialSummary {
  return {
    totalBalance: pickNumber(data, ['Balance', 'balance', 'totalBalance', 'netBalance']),
    totalIncome: pickNumber(data, ['Income', 'income', 'totalIncome']),
    totalExpense: pickNumber(data, ['Expense', 'expense', 'totalExpense']),
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
