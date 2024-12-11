import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  users = [
    { username: 'john_doe', email: 'john@example.com', role: 'Admin' },
    { username: 'jane_smith', email: 'jane@example.com', role: 'User' },
    { username: 'bob_jones', email: 'bob@example.com', role: 'Moderator' }
  ];

  addUser() {
    // Logic for adding a new user
    alert('Add new user functionality');
  }

  editUser(user: any) {
    // Logic for editing the user
    alert(`Edit user: ${user.username}`);
  }

  deleteUser(user: any) {
    // Logic for deleting the user
    if (confirm(`Are you sure you want to delete user: ${user.username}?`)) {
      this.users = this.users.filter(u => u !== user);
    }
  }
}