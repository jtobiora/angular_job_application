export class User{
    id : number;
    name : string;
    email : string;
    password : string;
    confPassword : string;

    constructor(values: Object = {}) {
           //Constructor initialization
        Object.assign(this, values);
    }

}