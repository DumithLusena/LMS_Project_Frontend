import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  allUsers: any[] = [];
  filteredUsers: any[] = [];
  userIdSearch: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.allUsers = data;
      this.filteredUsers = data;
    });
  }

  searchUserById() {
    if (!this.userIdSearch) {
      this.filteredUsers = this.allUsers;
      return;
    }

    this.userService.getUserById(this.userIdSearch).subscribe({
      next: (user) => {
        this.filteredUsers = [user];
      },
      error: () => {
        this.filteredUsers = [];
        alert('No user found with the given ID.');
      }
    });
  }
}
