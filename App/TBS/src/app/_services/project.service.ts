import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';

import { Project } from '../_models/index';

@Injectable()
export class ProjectService {
    constructor(private http: Http) { }

    getAll(start_date:string, end_date:string) {
        if(start_date && end_date){
            return this.http.get(environment.api + '/api/project?start_date='+start_date+'&end_date='+end_date, this.jwt()).map((response: Response) => response.json());
        } else {
            return this.http.get(environment.api + '/api/project', this.jwt()).map((response: Response) => response.json());
        }
    }
    getByStatus(status:String) {
        return this.http.get(environment.api + '/api/project/' + status, this.jwt()).map((response: Response) => response.json());
    }
    getAssignedProjects(userId:number) {
        return this.http.get(environment.api + '/api/project/user/' + userId, this.jwt()).map((response: Response) => response.json());
    }
    getLeadProjects(userId:number) {
        return this.http.get(environment.api + '/api/project/lead/' + userId, this.jwt()).map((response: Response) => response.json());
    }
    getEmployeeProjects(userId:number) {
        return this.http.get(environment.api + '/api/project/employee/' + userId, this.jwt()).map((response: Response) => response.json());
    }
    getById(id: number) {
        console.log(id);
        return this.http.get(environment.api + '/api/project/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(project: Project) {
        return this.http.post(environment.api + '/api/project', project, this.jwt()).map((response: Response) => response.json());
    }

    update(project: Project) {
        return this.http.put(environment.api + '/api/project/' + project._id, project, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(environment.api + '/api/project/' + id, this.jwt()).map((response: Response) => response.json());
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
