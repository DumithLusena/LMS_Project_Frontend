import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/book';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getBookByIsbn(isbn: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/${isbn}`);
  }

  isAvailable(isbn: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/${isbn}/available`);
  }
}
