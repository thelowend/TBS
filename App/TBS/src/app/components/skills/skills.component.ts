import { Component, OnInit } from '@angular/core';
import { SkillService, StatusService } from '../../_services/index';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  activeSkills:any;
  pendingSkills:any;
  currentUser:any;
  statuses:any;
  activeStatus: any;

  constructor(private skillService:SkillService, private statusService:StatusService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadActiveSkills();
    this.loadPendingSkills();
  }
  removeSkill(id:number) {
      this.skillService.delete(id).subscribe(response => {
        this.loadActiveSkills();
        this.loadPendingSkills();
      });
  }
  acceptSkill(id:string) {
      var foundSkill;
      for (let i=0; !foundSkill && i < this.pendingSkills.length; i++) {
        if (this.pendingSkills[i]._id == id) {
          foundSkill = this.pendingSkills[i];
        }
      }
      foundSkill.status = this.activeStatus;
      this.skillService.update(foundSkill).subscribe(response => {
        this.loadActiveSkills();
        this.loadPendingSkills();
      });
  }
  private loadActiveSkills() {
      this.skillService.getByStatus('Activo').subscribe(skills => {
        this.activeSkills = skills;
      });
  }
  private loadPendingSkills() {
      this.skillService.getByStatus('Pendiente').subscribe(skills => {
        this.pendingSkills = skills;
      });
  }
  private loadStatuses() {
      var actStatus = this.activeStatus;
      this.statusService.getAll().subscribe(statuses => {
        this.statuses = statuses;
        var foundStatus;
        for (let i=0; !foundStatus && i < this.statuses.length; i++) {
          if (this.statuses[i].name == 'Activo') {
            foundStatus = this.statuses[i];
          }
        }
        actStatus = foundStatus;
      });
  }
}
