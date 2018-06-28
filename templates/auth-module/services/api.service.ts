import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { Config } from '../../common';

import { User } from '../models';

@Injectable()
export class ApiService {
    private baseUrl: string = Config.API_URL;
    private prefix: string = '/api';

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getCurrentUser(): Observable<User> {
        return this.authenticationService.currentUser();
    }

    getUsers(): Observable<User[]> {
        // get users from api
        return this.get('/users')
            .map((response: User[]) => response);
    }

    private get(url: string) {
        return this.http.get(`${this.baseUrl}${this.prefix}${url}/`);
    }    

    private post(url: string, payload: any) {
        return this.http.post(`${this.baseUrl}${this.prefix}${url}/`, JSON.stringify(payload));
    }    
}