import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { User, UserExperience } from '../../_models/index';
import { UserService } from '../../_services/index';
import * as moment from 'moment';
import * as _ from "lodash";


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    currentUser: any;
    users: User[] = [];
    inputInterests: string;
    exp_employer: string;
    exp_description: string;
    exp_start_date: DateModel;
    exp_end_date: DateModel;
    currentUserExperience: UserExperience;
    datepickerOptions: DatePickerOptions;
    JSON: any;
    invalidExperienceMessage: string;

    constructor(private userService: UserService) {
        this.JSON = JSON;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.inputInterests = this.currentUser.info.interests;

        this.datepickerOptions = {
          format: 'DD/MM/YYYY'
        };

        this.currentUserExperience = new UserExperience();
        this.invalidExperienceMessage = '';
    }
    validateExperience():Boolean {
      let emptyDate = true;

      if (!!this.exp_start_date && !!this.exp_end_date) {
        emptyDate = _.isEqual(this.exp_start_date, new DateModel()) || _.isEqual(this.exp_end_date, new DateModel());
      }

      if (!emptyDate && this.exp_end_date.momentObj.diff(this.exp_start_date.momentObj) < 0) {
        this.invalidExperienceMessage = 'Invalid Period. End Date cannot be before Start Date';
      } else {
        if(emptyDate || _.trim(this.exp_employer) === '' || _.trim(this.exp_description) === '') {
          this.invalidExperienceMessage = 'Please complete every field';
        } else {
          this.invalidExperienceMessage = '';
        }
      }
      return !!this.invalidExperienceMessage;
    }
    saveExperience() {

      if(!this.validateExperience()) {
        let updatedUserInfo = this.currentUser.info;
        let foundFlag = false;

        this.currentUserExperience.employer = this.exp_employer;
        this.currentUserExperience.description = this.exp_description;
        this.currentUserExperience.start_date = this.exp_start_date.momentObj.toDate().toISOString();
        this.currentUserExperience.end_date = this.exp_end_date.momentObj.toDate().toISOString();

        for (let i = 0; this.currentUserExperience._id && !foundFlag && (i < updatedUserInfo.experience.length); i++) {
          if (updatedUserInfo.experience[i]._id === this.currentUserExperience._id) {
            updatedUserInfo.experience[i] = this.currentUserExperience;
            foundFlag = true;
          }
        }

        if (!foundFlag) {
          updatedUserInfo.experience.push(Object.assign({}, this.currentUserExperience));
        }
      }

    }
    cancelExperience() {
      this.currentUserExperience = new UserExperience();
      this.clearExperience();
    }
    clearExperience() {
      this.exp_employer = '';
      this.exp_description = '';
      this.exp_start_date = new DateModel();
      this.exp_end_date = new DateModel();
      this.invalidExperienceMessage = '';
    }
    editUserExperience(exp:UserExperience, i:Number) {

      this.currentUserExperience = exp;

      this.exp_employer = exp.employer;

      this.exp_description = exp.description;

      this.exp_start_date = new DateModel();
      this.exp_end_date = new DateModel();

      this.exp_start_date.momentObj = moment(new Date(exp.start_date));
      this.exp_start_date.formatted = this.exp_start_date.momentObj.format('DD/MM/YYYY');

      this.exp_end_date.momentObj = moment(new Date(exp.end_date));
      this.exp_end_date.formatted = this.exp_end_date.momentObj.format('DD/MM/YYYY');

      this.invalidExperienceMessage = '';
    }

    removeUserExperience(i:Number) {
      this.currentUser.info.experience.splice(i, 1);
    }

    saveResumeChanges(){
      this.userService.update(this.currentUser.info).subscribe(result => {
        if (!result.err) {
          this.currentUser.info.experience = result.value.experience;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
        location.reload();
      });
    }

    saveInterests() {
      console.log(this.inputInterests);
    }
}
