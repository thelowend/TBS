import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { User } from '../../_models/index';
import { UserService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    currentUser: any;
    users: User[] = [];
    inputInterests: String;
    start_date: DateModel;
    end_date: DateModel;
    options: DatePickerOptions;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.currentUser);
    }

    ngOnInit() {
        //this.loadAllUsers();
        this.inputInterests = this.currentUser.info.interests;
        this.options = new DatePickerOptions();
    }

    editResume() {

    }

    saveInterests() {
      console.log(this.inputInterests);
    }

    deleteUser(id: number) {
        //this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        //this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
