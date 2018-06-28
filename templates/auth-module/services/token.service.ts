import { Injectable } from '@angular/core';
import { User, LocalData } from '../models';

@Injectable()
export class TokenService {
    constructor() {
    }

    get currentUser() : LocalData {
        var currentUser = localStorage.getItem('currentUser');
        return (currentUser && currentUser != 'undefined') ? JSON.parse(currentUser) : { user: {}, token: ''};
    }

    set currentUser(currentUser: LocalData) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    get user() : any {
        // set token if saved in local storage
        return this.currentUser.user;
    }

    set user(user: any) {
        // set token if saved in local storage
        this.currentUser = { user: user, token: this.currentUser.token };
    }

    get token() : string {
        // set token if saved in local storage
        return this.currentUser.token;
    }

    set token(token: string) {
        // set token if saved in local storage
        this.currentUser = { user: this.currentUser.user, token: token };
    }


    reset() {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}