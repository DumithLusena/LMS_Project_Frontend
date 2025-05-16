import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  private baseUrl = 'http://localhost:8080/borrow';

  constructor(private http: HttpClient) { }

   getAllBorrows(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getActiveBorrowsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}/active`);
  }

   issueBook(payload: {
      userId: number;
      bookIsbn: string;
      borrowedAt: string;
      dueDate: string;
  }): Observable<any> {
      return this.http.post(`${this.baseUrl}/issue`, payload);
}

  returnBook(payload: { borrowId: number; returnedAt: string }) {
    return this.http.post(`${this.baseUrl}/return`, payload);
  }

}
