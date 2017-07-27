import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { User, Skill, UserSkill, Project } from '../../_models/index';
import { UserService, SkillService, ProjectService } from '../../_services/index';

import * as moment from 'moment';
import * as _ from "lodash";
import { KeysPipe } from '../../_helpers/keys.pipe';

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
  filteredUsers: any;


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
        this.filterUsers();
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

  filterUsers() {
    var neededSkills = [];
    var fusers = {};
    var cproject = this.currentProject;

    if (cproject.skills.length) {
      _.each(cproject.skills, function (skill, key) {
        neededSkills.push(skill.skill._id);
        fusers[skill.skill.name] = [];
      });

      _.each(this.users, function (user, key) {
        _.each(neededSkills, function (neededSkill) {
          _.each(user.skills, function (userSkill) {
            if (neededSkill == userSkill.skill._id) {
              var isAlreadyEmployed = false;
              for (let i = 0; !isAlreadyEmployed && i < cproject.employees.length; i++) {
                isAlreadyEmployed = cproject.employees[i].user._id == user._id;
              }
              if(!isAlreadyEmployed) {
                fusers[userSkill.skill.name].push({
                  userid: user._id,
                  name: user.name,
                  skill: userSkill
                });
              }
            }
          });
        });
      });
    }
    this.filteredUsers = fusers;
  }
  addEmployeeProject(id:string){
    console.log(id);
    var cproject = this.currentProject;
    var foundUser;
    for (let i=0; !foundUser && i < this.users.length; i++) {
      if (this.users[i]._id == id) {
          foundUser = this.users[i];
          cproject.employees.push({
            user: foundUser,
            start_date: moment().toDate().toISOString(),
            end_date: moment().toDate().toISOString()
          })
      }
    }
    this.saveProject(cproject);
  }

  loadProjects () {
    this.projectService.getAssignedProjects(this.currentUser.info._id, {}).subscribe(projects => {
      this.projects = projects;
    });
  }

}
