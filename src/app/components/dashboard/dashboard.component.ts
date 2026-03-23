import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Transaction} from '../../Modal/Transaction';

@Component({
  selector: 'app-dashboard',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  private readonly storageKey = "formStorage";
  transactions: Transaction[] = [];

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
    desctiption: new FormControl('')
  });

  onSubmit() {

    const newForm = {
      id: Date.now(),
      ...this.transactionForm.getRawValue()
    }

    this.transactions.push(newForm);
    localStorage.setItem(this.storageKey, JSON.stringify(this.transactions));

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
}
