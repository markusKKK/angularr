import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { CreditCard } from '../models/credit-card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditcardsService {

  private apiUrl = "http://localhost:3000/creditcards";

  constructor(private httpClient: HttpClient) { }

  // CRUD Functionality

  // Create new Credit card
  createCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return this.httpClient.post<CreditCard>(this.apiUrl, creditCard);
  }

  // Get all Credit
  getCreditCards(): Observable<CreditCard[]>{
    return this.httpClient.get<CreditCard[]>(this.apiUrl);
  }

  // Get specific credit card
  getCreditCardById(id: Number): Observable<CreditCard> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<CreditCard>(url);
  }

  // Update Functionality
  updateCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    const url = `${this.apiUrl}/${creditCard.id}`;
    return this.httpClient.put<CreditCard>(url, creditCard);
  }

  // Delete functionality
  deleteCreditCard(id: Number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }


}