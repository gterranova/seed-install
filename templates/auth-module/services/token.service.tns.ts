import { Injectable } from '@angular/core';
import {
    getString,
    setString,
    remove
} from "application-settings";
import { User, LocalData } from '../models';

@Injectable()
export class TokenService {
    constructor() {
    }

    get currentUser() : LocalData {
        var currentUser = getString('currentUser');
        return (currentUser && currentUser != 'undefined') ? JSON.parse(currentUser) : { user: {}, token: ''};
    }

    set currentUser(currentUser: LocalData) {
        setString('currentUser', JSON.stringify(currentUser));
    }

    get user() : User {
        // set token if saved in local storage
        return this.currentUser.user;
    }

    set user(user: User) {
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
        remove('currentUser');
    }

}