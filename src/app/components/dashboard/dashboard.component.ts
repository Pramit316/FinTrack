import { Component } from '@angular/core';
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
export class DashboardComponent {

  private readonly storageKey = "formStorage";
  private transactions: Transaction[] = [];

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
    const newForm = this.transactionForm.getRawValue();

    this.transactions.push(newForm);
    localStorage.setItem(this.storageKey, JSON.stringify(newForm));

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

}
