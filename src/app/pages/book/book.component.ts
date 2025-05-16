import { Component } from '@angular/core';
import { BookService } from '../../service/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  allBooks: any[] = [];
  filteredBooks: any[] = [];
  isbnSearch: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data) => {
      this.allBooks = data;
      this.filteredBooks = data;
    });
  }

  searchByIsbn() {
    if (!this.isbnSearch) {
      this.filteredBooks = this.allBooks;
      return;
    }

    this.bookService.getBookByIsbn(this.isbnSearch).subscribe({
      next: (book) => {
        this.filteredBooks = [book];
      },
      error: () => {
        this.filteredBooks = [];
        alert('No book found with given ISBN.');
      }
    });
  }

  checkAvailability(isbn: string): string {
    const book = this.allBooks.find(b => b.isbn === isbn);
    return book && book.available ? 'Yes' : 'No';
  }
}
