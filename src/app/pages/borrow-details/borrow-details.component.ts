import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BorrowService } from '../../service/borrow.service';

@Component({
  selector: 'app-borrow-details',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './borrow-details.component.html',
  styleUrl: './borrow-details.component.css'
})
export class BorrowDetailsComponent implements OnInit {

issueForm = {
    userId: 0,
    bookIsbn: '',
    borrowedAt: '',
    dueDate: ''
  };

  returnForm = {
    borrowId: 0
  };

  borrowList: any[] = [];

  constructor(private borrowService: BorrowService) {}

  ngOnInit(): void {
    this.loadAllBorrows();
  }

  loadAllBorrows(): void {
    this.borrowService.getAllBorrows().subscribe({
      next: data => this.borrowList = data,
      error: err => console.error('Error fetching borrows:', err)
    });
  }

  issueBook(): void {
    if (!this.issueForm.userId || isNaN(this.issueForm.userId)) {
      alert('Please enter a valid User ID.');
      return;
    }

    const payload = {
      userId: this.issueForm.userId,
      bookIsbn: this.issueForm.bookIsbn,
      borrowedAt: this.issueForm.borrowedAt,
      dueDate: this.issueForm.dueDate
    };

    this.borrowService.issueBook(payload).subscribe({
      next: () => {
        this.loadAllBorrows();
        this.issueForm = { userId: 0, bookIsbn: '', borrowedAt: '', dueDate: '' };
      },
      error: err => {
        console.error('Error issuing book:', err);
        alert('Failed to issue book.');
      }
    });
  }

  returnBook(): void {
    if (!this.returnForm.borrowId || isNaN(this.returnForm.borrowId)) {
      alert('Please enter a valid Borrow ID.');
      return;
    }

    const payload = {
      borrowId: this.returnForm.borrowId,
      returnedAt: new Date().toISOString()
    };

    this.borrowService.returnBook(payload).subscribe({
      next: () => {
        alert('Book returned successfully.');
        this.returnForm.borrowId = 0;
        this.loadAllBorrows();
      },
      error: err => {
        console.error('Error returning book:', err);
        alert('Failed to return book.');
      }
    });
  }
}
