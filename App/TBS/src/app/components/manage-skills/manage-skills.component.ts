import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { User, Skill, UserSkill } from '../../_models/index';
import { UserService, SkillService } from '../../_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-manage-skills',
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.scss']
})
export class ManageSkillsComponent implements OnInit {
  currentUser: any;
  currentSkill: Skill;
  currentUserSkill: UserSkill;
  skills: Array<Skill>;
  inputSkillName: String;
  inputSkillLevel: Number;
  skillExists: Boolean;
  skillSelected: Boolean;

  constructor(private userService: UserService, private skillService: SkillService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.loadAllSkills();
      this.currentSkill = new Skill();
      this.currentUserSkill = new UserSkill();
      this.skillExists = true;
      this.skillSelected = false;
      this.inputSkillLevel = 1;
  }

  onSkillNameChange(value: String) {
    //Sets suggest Enabled if the skill name input text doesn't match any existing skill
    this.inputSkillName = value;
    this.skillExists = !!this.skills.find(x => x.name.toLowerCase() == value.toLowerCase());
  }

  updateSkillScore(value: number) {
    this.currentUserSkill.level = value;
  }

  selectSkill() {
    if (this.inputSkillName) {
      this.currentSkill = this.skills.find(x => x.name.toLowerCase() == this.inputSkillName.toLowerCase());
      this.skillSelected = true;
      this.currentUserSkill.skill = this.currentSkill;
      this.currentUserSkill.level = this.inputSkillLevel;
      this.currentUserSkill.verified = false;
    }
  }

  saveSkill() {
    let updatedUserInfo = this.currentUser.info;
    let foundFlag = false;

    for (let i = 0; !foundFlag && (i < updatedUserInfo.skills.length); i++) {
      if (updatedUserInfo.skills[i].skill._id === this.currentUserSkill.skill._id) {
        updatedUserInfo.skills[i] = Object.assign({}, this.currentUserSkill);
        foundFlag = true;
      }
    }

    if (!foundFlag) {
      updatedUserInfo.skills.push(Object.assign({}, this.currentUserSkill));
    }

    this.userService.update(updatedUserInfo).subscribe(result => {
      if (!result.err) {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
      location.reload();
    });
  }

  deleteSkill(id: number) {
      //this.skillService.delete(id).subscribe(() => { this.loadAllSkills() });
  }

  private loadAllSkills() {
      this.skillService.getAll().subscribe(skills => {
        this.skills = skills;
      });

  }

}
