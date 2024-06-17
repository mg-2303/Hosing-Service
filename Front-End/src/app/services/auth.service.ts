import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }

    authUser(user: any) {
        let userArray = [];
        const usersInStorage = localStorage.getItem('Users');
        if (usersInStorage) {
            userArray = JSON.parse(usersInStorage);
        }
        return userArray.find((p: { userName: string; password: string; }) => (p.userName === user.userName && p.password === user.password));
    }

}
