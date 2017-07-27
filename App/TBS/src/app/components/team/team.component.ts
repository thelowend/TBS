import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { User, Skill, UserSkill, Project } from '../../_models/index';
import { UserService, SkillService, ProjectService } from '../../_services/index';

import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  currentUser: any;
  currentProject: any;
  skills: any;
  projects: any;
  users: any;
  inputProjectName:string;
  inputSkillName:string;
  filter:any;
  invalidSkillQuery:Boolean;
  invalidSkillQueryMessage:string;
  datepickerOptions: DatePickerOptions;


  constructor(private skillService: SkillService, private projectService: ProjectService, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentProject = JSON.parse(localStorage.getItem('currentProject'));
    console.log(this.currentProject);
  }

  ngOnInit() {
    this.loadSkills();
    this.loadProjects();
    this.loadUsers();
    this.filter = {
      start_date: null,
      end_date: null
    }

    this.invalidSkillQuery = false;
    this.invalidSkillQueryMessage = '';

    if (this.currentProject) {
      this.inputProjectName = this.currentProject.name;
      this.onProjectNameChange(this.inputProjectName);
    }

    this.datepickerOptions = {
      format: 'DD/MM/YYYY'
    };

  }

  verifySkillAssign(){
    let invalid = false;
    if(this.currentProject && this.inputSkillName && this.filter.start_date && this.filter.end_date) {
      if (this.filter.end_date.momentObj.diff(this.filter.start_date.momentObj) < 0) {
        invalid = true;
        this.invalidSkillQueryMessage = "End date should not be before start date."
      } else if (this.filter.end_date.momentObj.diff(this.currentProject.end_date.momentObj) > 0 || this.filter.start_date.momentObj.diff(this.currentProject.start_date.momentObj) > 0) {
        invalid = true;
        this.invalidSkillQueryMessage = "Skill does not fall within project date range."
      }
    } else {
      invalid = true;
      this.invalidSkillQueryMessage = "Please fill out every field";
    }
    return !(this.invalidSkillQuery = invalid);
  }

  assignSkill () {
    if(this.verifySkillAssign()) {

      var foundProjectSkillIndex;
      let iskillname = this.inputSkillName;

      _.each(this.currentProject.skills, function (skill, index) {
        if (skill.skill.name == iskillname) {
          foundProjectSkillIndex = index;
        }
      });

      var foundSkill;
      _.each(this.skills, function (skill, index) {
        if (skill.name == iskillname) {
          foundSkill = skill;
        }
      });

      if (foundProjectSkillIndex >= 0) {
        this.currentProject.skills[foundProjectSkillIndex] = {
          skill: foundSkill,
          amount: 1,
          start_date: this.filter.start_date.momentObj.toDate().toISOString(),
          end_date: this.filter.end_date.momentObj.toDate().toISOString()
        };
      } else {
        this.currentProject.skills.push({
          skill: foundSkill,
          amount: 1,
          start_date: this.filter.start_date.momentObj.toDate().toISOString(),
          end_date: this.filter.end_date.momentObj.toDate().toISOString()
        });
      }

      this.saveProject(this.currentProject);
    }
  }
  removeProjectSkill(index:string) {
    this.currentProject.skills.splice(parseInt(index, 10), 1);
    this.saveProject(this.currentProject);
  }

  addAmount(index:string){
    this.currentProject.skills[parseInt(index, 10)].amount++;
    this.saveProject(this.currentProject);
  }
  subAmount(index:string){
    if (this.currentProject.skills[parseInt(index, 10)].amount > 1) {
      this.currentProject.skills[parseInt(index, 10)].amount--;
      this.saveProject(this.currentProject);
    } else {
      this.removeProjectSkill(index);
    }
  }

  saveProject(proj:any) {
      this.projectService.update(proj).subscribe(response => {
        localStorage.setItem('currentProject', JSON.stringify(proj));
      });
  }

  onProjectNameChange(value: any){
    if(this.projects) {
      let foundIndex;
      _.each(this.projects, function (project, index) {
        if (project.name == value) {
          foundIndex = index;
        }
      });
      this.currentProject = this.projects[foundIndex];
      console.log(this.currentProject);
    }
  }
  onSkillNameChange(value: string) {
    this.inputSkillName = value;
  //  this.skillExists = !!this.skills.find(x => x.name.toLowerCase() == value.toLowerCase());
  }

  loadSkills() {
    this.skillService.getByStatus('Activo').subscribe(skills => {
      this.skills = skills;
    });
  }

  loadUsers() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  loadProjects () {
    this.projectService.getAssignedProjects(this.currentUser.info._id, {}).subscribe(projects => {
      this.projects = projects;
    });
  }

}
