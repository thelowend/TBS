import { Skill } from './index';

export class User {
    _id: Number;
    status: Object;
    file_number: Number;
    name: String;
    pid_type: String;
    pid_number: Number;
    address: String;
    phone: String;
    email: String;
    //password: String;
    interests: String;
    skills: Array<UserSkill>;
    experience: Array<Object>;
    roles: Array<Object>;
    projects: Array<Object>;
}

export class UserSkill {
    skill: Skill;
    level: Number;
    verified: Boolean;
}

export class UserExperience {
  employer: String;
  description: String;
  start_date: Date;
  end_date: Date;
}
