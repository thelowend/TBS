import { Skill } from './index';

export class User {
    _id: Number;
    status: Object;
    file_number: Number;
    name: string;
    pid_type: string;
    pid_number: Number;
    address: string;
    phone: string;
    email: string;
    //password: String;
    interests: string;
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
  _id: Number;
  employer: string;
  description: string;
  start_date: string;
  end_date: string;
}
