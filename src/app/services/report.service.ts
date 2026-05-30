import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { FinancialSummary, mapSummaryFromApi } from '../models/financial-summary.model';
import {
  Transaction,
  TransactionApiDto,
  mapTransactionFromApi,
} from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly baseUrl = `${environment.apiUrl}/api/report`;

  constructor(private readonly http: HttpClient) {}

  getSummary(): Observable<FinancialSummary> {
    return this.http
      .get<Record<string, number>>(`${this.baseUrl}/summary`)
      .pipe(map(mapSummaryFromApi));
  }

  getMonthlySummary(month: number, year: number): Observable<FinancialSummary> {
    const params = new HttpParams()
      .set('month', month)
      .set('year', year);

    return this.http
      .get<Record<string, number>>(`${this.baseUrl}/monthly`, { params })
      .pipe(map(mapSummaryFromApi));
  }

  filterByType(type: 'income' | 'expense'): Observable<Transaction[]> {
    return this.http
      .get<TransactionApiDto[]>(`${this.baseUrl}/${type.toUpperCase()}`)
      .pipe(map((items) => items.map(mapTransactionFromApi)));
  }
}
