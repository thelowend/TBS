import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { User, Skill, UserSkill, Project } from '../../_models/index';
import { UserService, SkillService, ProjectService } from '../../_services/index';

import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  currentUser: any;
  projects:Array<any>;
  proj_start_date: DateModel;
  proj_end_date: DateModel;
  datepickerOptions: DatePickerOptions;
  projectFilterRadios: String;
  buildTool: any;
  entries = ['All', 'Assigned', 'Unassigned'];
  filter: any;
  _: any;

  constructor(private projectService: ProjectService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.projects = [];
    this.filter = {
      radio: 'All',
      start_date: new DateModel(),
      end_date: new DateModel()
    }
    this._ = _;
  }

  ngOnInit() {
    this.loadAllProjects();
    this.datepickerOptions = {
      format: 'DD/MM/YYYY'
    };
  }

  onSelectionChange(entry) {
      this.filter.radio = entry;
      console.log(this.filter);
  }

  buildTeam() {

  }
  endProject() {}
  editProject() {}
  deleteProject() {}

  filterProjects(){
    switch(this.filter.radio) {
      case 'All':
        this.loadAllProjects();
        break;
      case 'Assigned':
        this.projectService.getAssignedProjects(this.currentUser.info._id)
        break;
      case 'Unassigned':
        this.projectService.getAssignedProjects(this.currentUser.info._id)
        break;
    }
  }

  private loadAllProjects() {
      let start = '', end = '';
      if(this.filter.start_date.momentObj && this.filter.end_date.momentObj) {
        start = this.filter.start_date.momentObj.toDate().toISOString(),
        end =  this.filter.end_date.momentObj.toDate().toISOString();
      }
      this.projectService.getAll(start, end).subscribe(projects => {
        this.projects = projects;
      });
  }

}
