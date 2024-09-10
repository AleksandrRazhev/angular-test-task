import { Injectable } from '@angular/core';

import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] | null = null;
  getAll() {
    const users = localStorage.getItem('users');
    if (!users) return (this.users = null);
    return (this.users = JSON.parse(users));
  }
  authorization(currentUser: User): boolean {
    if (!this.users) return true;
    const storedUser = this.users.find(
      ({ username }) => username === currentUser.username
    );
    if (!storedUser) return true;
    if (storedUser && storedUser.password === currentUser.password) return true;
    return false;
  }
  addUser(currentUser: User) {
    if (!this.users) return (this.users = [currentUser]);
    if (this.users.find(({ username }) => username === currentUser.username))
      return;
    return this.users.push(currentUser);
  }
  saveUsers() {
    if (!this.users) return;
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
