export class User {
    _id: number;
    status: Object;
    file_number: number;
    name: string;
    pid_type: string;
    pid_number: number;
    address: string;
    phone: string;
    email: string;
    //password: string;
    interests: string;
    skills: Array<Object>;
    experience: Array<Object>;
    roles: Array<Object>;
}
