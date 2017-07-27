export class Project {
    _id: number;
    status: Object;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    client: Object;
    lead: Object;
    skills: Array<Object>;
    employees: Array<Object>
}

export class ProjectUser {
    _id: number;
    user: Object;
    start_date: string;
    end_date: string;
}

export class ProjectSkill {
    _id: number;
    skill: Object;
    amount: number;
    start_date: string;
    end_date: string;
}
