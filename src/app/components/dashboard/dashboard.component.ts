import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Transaction} from '../../Modal/Transaction';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  transactionService: TransactionService = Inject(TransactionService);
  private readonly storageKey = "formStorage";
  transactions: Transaction[] = [];
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpense: number = 0;

  ngOnInit() {
    this.loadData();
  }

  transactionForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    amount: new FormControl(null, Validators.required),
    transactionType: new FormControl('',),
    paymentMethod: new FormControl(''),
    category: new FormControl(''),
    date: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  newBalanceForm: FormGroup = new FormGroup({
    balance: new FormControl('', Validators.required),
  })

  onSubmit() {

    const newTransactionForm = {
      id: Date.now(),
      ...this.transactionForm.getRawValue()
    }

    this.transactions.push(newTransactionForm);
    localStorage.setItem(this.storageKey, JSON.stringify(this.transactions));

    if(newTransactionForm.transactionType === 'income'){
      this.totalIncome += newTransactionForm.amount;
      this.totalBalance += newTransactionForm.amount;
    } else if(newTransactionForm.transactionType === 'expense') {
      this.totalExpense -= newTransactionForm.amount;
      this.totalBalance -= newTransactionForm.amount;
    }

    console.log(this.transactions);

    this.transactionForm.reset({
      title: '',
      amount: null,
      paymentMethod: '',
      transactionType: 'expense',
      category: '',
      date: '',
      description: ''
    });
  }

  private loadData() {
    const data = JSON.parse(localStorage.getItem(this.storageKey) || 'null');
    console.log(data);

    if (!data) {
      this.transactions = [];
    } else if (Array.isArray(data)) {
      this.transactions = data;
    } else {
      this.transactions = [data];
    }

    console.log(this.transactions);
  }

  newBalance() {
    const newBalance = this.newBalanceForm.getRawValue();

    this.totalBalance = newBalance.balance;

    this.newBalanceForm.reset();
  }
}
