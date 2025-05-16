import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  private baseUrl = 'http://localhost:8080/borrow';

  constructor(private http: HttpClient) { }

   getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getActiveByUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}/active`);
  }

  issueBook(data: { userId: number, isbn: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/issue`, data);
  }

  returnBook(data: { userId: number, isbn: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/return`, data);
  }

}
