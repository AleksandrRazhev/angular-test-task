import { Injectable } from '@angular/core';

import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] | null = localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users') as string)
    : [];
  authorization(user: User): boolean {
    if (!this.users) return true;
    const storedUser = this.users.find(
      ({ username }) => username === user.username
    );
    if (!storedUser) return true;
    if (storedUser && storedUser.password === user.password) return true;
    return false;
  }
  addUser(user: User) {
    if (!this.users) return (this.users = [user]);
    if (this.users.find(({ username }) => username === user.username)) return;
    return this.users.push(user);
  }
  saveUsers() {
    if (!this.users) return;
    localStorage.setItem('users', JSON.stringify(this.users));
  }
  saveCurrentUser(user: User) {
    localStorage.setItem('currentUser', user.username);
  }
  deleteCurrentUser() {
    localStorage.removeItem('currentUser');
  }
  get currentUserName(): string {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ?? '';
  }
}
