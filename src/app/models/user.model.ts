export class User {

    admin: boolean;
    user_id?: string;
    email: string;

    constructor(admin: boolean,user_id: string, email:string) {
        this.admin= admin;
        this.user_id = user_id;
        this.email = email;
    }
    
}
