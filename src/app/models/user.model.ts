export class Users {

    email: string;
    password: string;
    role: string;
    hadAccess:boolean;
    constructor(email: string,
        password: string,
        role: string) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
