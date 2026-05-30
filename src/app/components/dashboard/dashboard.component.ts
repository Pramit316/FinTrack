import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { ReportService } from '../../services/report.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, FormsModule, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  totalBalance = 0;
  totalIncome = 0;
  totalExpense = 0;

  isLoading = false;
  isSubmitting = false;
  errorMessage = '';

  searchQuery = '';
  categoryFilter = '';
  typeFilter = '';
  methodFilter = '';

  transactionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    amount: new FormControl<number | null>(null, Validators.required),
    transactionType: new FormControl('', Validators.required),
    paymentMethod: new FormControl(''),
    category: new FormControl(''),
    date: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(
    private readonly transactionService: TransactionService,
    private readonly reportService: ReportService,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    console.log(this.transactions)
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const transactions$ =
      this.typeFilter === 'income' || this.typeFilter === 'expense'
        ? this.reportService.filterByType(this.typeFilter)
        : this.transactionService.getAll();

    forkJoin({
      transactions: transactions$,
      summary: this.reportService.getSummary(),
    }).subscribe({
      next: ({ transactions, summary }) => {
        this.transactions = transactions;
        this.totalBalance = summary.totalBalance;
        this.totalIncome = summary.totalIncome;
        this.totalExpense = summary.totalExpense;
        this.applyClientFilters();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage =
          'Could not reach the API. Start the Spring Boot server on port 8080, then refresh.';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const raw = this.transactionForm.getRawValue();

    this.transactionService
      .add({
        title: raw.title!,
        amount: Number(raw.amount),
        transactionType: raw.transactionType!,
        paymentMethod: raw.paymentMethod || undefined,
        category: raw.category || undefined,
        date: raw.date!,
        description: raw.description || undefined,
      })
      .subscribe({
        next: () => {
          this.transactionForm.reset({
            title: '',
            amount: null,
            paymentMethod: '',
            transactionType: '',
            category: '',
            date: '',
            description: '',
          });
          this.isSubmitting = false;
          this.loadDashboard();
        },
        error: () => {
          this.errorMessage = 'Failed to save the transaction. Check the API and try again.';
          this.isSubmitting = false;
        },
      });
  }

  deleteTransaction(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    this.transactionService.delete(id).subscribe({
      next: () => this.loadDashboard(),
      error: () => {
        this.errorMessage = 'Failed to delete the transaction.';
      },
    });
  }

  onTypeFilterChange(): void {
    this.loadDashboard();
  }

  applyClientFilters(): void {
    const query = this.searchQuery.trim().toLowerCase();

    this.filteredTransactions = this.transactions.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        (item.description ?? '').toLowerCase().includes(query);

      const matchesCategory =
        !this.categoryFilter ||
        (item.category ?? '').toLowerCase() === this.categoryFilter.toLowerCase();

      const matchesMethod =
        !this.methodFilter ||
        (item.paymentMethod ?? '').toLowerCase() === this.methodFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesMethod;
    });
  }

  onClientFilterChange(): void {
    this.applyClientFilters();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.categoryFilter = '';
    this.methodFilter = '';

    if (this.typeFilter) {
      this.typeFilter = '';
      this.loadDashboard();
      return;
    }

    this.applyClientFilters();
  }
}
