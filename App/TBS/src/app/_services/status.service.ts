import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';

import { Status } from '../_models/index';

@Injectable()
export class StatusService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.api + '/api/status', this.jwt()).map((response: Response) => response.json());
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
