import { Component, OnInit } from '@angular/core';

import { User, Skill, UserSkill, Project } from '../../_models/index';
import { UserService, SkillService, ProjectService } from '../../_services/index';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  currentUser: any;
  projects:Array<any>;

  constructor(private projectService: ProjectService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.projects
  }

  ngOnInit() {
    this.loadAllProjects();
  }

  private loadAllProjects() {
      this.projectService.getAssignedProjects(this.currentUser.info._id).subscribe(projects => {
        this.projects = projects;
      });
  }

}
