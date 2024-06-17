import { Injectable } from '@angular/core';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  addUser(user: User) {
    let users = [];
    const usersFromStorage = localStorage.getItem('Users');
    if (usersFromStorage) {
      users = JSON.parse(usersFromStorage);
      users = [user, ...users];
    }
    else {
      users = [user]
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
