export class User {

    admin: boolean;
    user_id?: string;
    email: string;
    moviesRented?: string;
    rentalCount?: number;
    constructor(admin: boolean,user_id: string, email:string) {
        this.admin= admin;
        this.user_id = user_id;
        this.email = email;
    }
    
}
