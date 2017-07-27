import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';

import { Skill } from '../_models/index';

@Injectable()
export class SkillService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.api + '/api/skill', this.jwt()).map((response: Response) => response.json());
    }
    getByStatus(status:String) {
        return this.http.get(environment.api + '/api/skill/' + status, this.jwt()).map((response: Response) => response.json());
    }
    getById(id: number) {
        console.log(id);
        return this.http.get(environment.api + '/api/skill/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(skill: Skill) {
        return this.http.post(environment.api + '/api/skill', skill, this.jwt()).map((response: Response) => response.json());
    }

    update(skill: Skill) {
        return this.http.put(environment.api + '/api/skill/' + skill._id, skill, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(environment.api + '/api/skill/' + id, this.jwt()).map((response: Response) => response.json());
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
