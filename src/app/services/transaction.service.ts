import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CreateTransaction,
  Transaction,
  TransactionApiDto,
  mapTransactionFromApi,
  toApiTransaction,
} from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly baseUrl = `${environment.apiUrl}/api/transactions`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Transaction[]> {
    return this.http
      .get<TransactionApiDto[]>(`${this.baseUrl}/getAll`)
      .pipe(map((items) => items.map(mapTransactionFromApi)));
  }

  getById(id: number): Observable<Transaction> {
    return this.http
      .get<TransactionApiDto>(`${this.baseUrl}/get/${id}`)
      .pipe(map(mapTransactionFromApi));
  }

  add(transaction: CreateTransaction): Observable<Transaction> {
    const payload = toApiTransaction(transaction);

    return this.http
      .post<TransactionApiDto>(this.baseUrl, payload)
      .pipe(map(mapTransactionFromApi));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
