import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { User, Skill, UserSkill, Project } from '../../_models/index';
import { UserService, SkillService, ProjectService } from '../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  currentUser: any;
  currentProject: any;
  projects:Array<any>;
  proj_start_date: DateModel;
  proj_end_date: DateModel;
  datepickerOptions: DatePickerOptions;
  projectFilterRadios: String;
  buildTool: any;
  entries = ['All', 'Assigned', 'Unassigned'];
  filter: any;
  _: any;
  invalidQuery:Boolean;
  invalidQueryMessage:string;

  constructor(private projectService: ProjectService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.projects = [];
    this.filter = {
      radio: 'All',
      start_date: new DateModel(),
      end_date: new DateModel()
    }
    this._ = _;
    this.invalidQuery = false;
    this.invalidQueryMessage = '';
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

  editProject() {

  }
  endProject(id:number) {
    let endIndex;
    _.each(this.projects, function (project, index) {
      if (project._id == id) {
        endIndex = index;
      }
    });
    console.log(this.projects[endIndex].status);
  }
  buildTeam(id:number) {
    let buildIndex;
    _.each(this.projects, function (project, index) {
      if (project._id == id) {
        buildIndex = index;
      }
    });
    this.currentProject = this.projects[buildIndex];
    localStorage.setItem('currentProject', JSON.stringify(this.currentProject));
    this.router.navigate(['/team']);
  }
  deleteProject(id:number) {
    let deleteIndex;
    _.each(this.projects, function (project, index) {
      if (project._id == id) {
        deleteIndex = index;
      }
    });
    this.projects.splice(deleteIndex, 1);

    this.projectService.delete(id).subscribe(projects => {
      //this.projects = projects;
    });

  }

  filterProjects() {
    this.invalidQuery = false;
    this.loadAllProjects();
  }

  private validateQuery() {
    if (this.filter.start_date.momentObj && this.filter.end_date.momentObj && this.filter.end_date.momentObj.diff(this.filter.start_date.momentObj) < 0) {
      this.invalidQuery = true;
      this.invalidQueryMessage = "End date should not be before start date."
    }

    return !this.invalidQuery;
  }

  private loadAllProjects() {
      let query = {};
      if (this.filter.start_date.momentObj) {
        query['start_date'] = this.filter.start_date.momentObj.toDate().toISOString();
      }
      if (this.filter.end_date.momentObj) {
        query['end_date'] = this.filter.end_date.momentObj.toDate().toISOString();
      }
      switch(this.filter.radio) {
        case 'All':
          if(this.validateQuery()) {
            this.projectService.getAll(query).subscribe(projects => {
              this.projects = projects;
            });
          }
          break;
        case 'Assigned':
          if(this.validateQuery()) {
            this.projectService.getAssignedProjects(this.currentUser.info._id, query).subscribe(projects => {
              this.projects = projects;
            });
          }
          break;
        case 'Unassigned':
          if(this.validateQuery()) {
            query['lead'] = null;
            this.projectService.getAll(query).subscribe(projects => {
              this.projects = projects;
            });
          }
          break;
      }
  }
}
