import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.api + '/api/user', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        console.log(id);
        return this.http.get(environment.api + '/api/user/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.put(environment.api + '/api/user', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.post(environment.api + '/api/user', user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/user/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
