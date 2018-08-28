export class Applicant{
    id : number;
    firstName : string;
    surname : string;
    password : string;
    email : string;
    coverLetter : string;
    phoneNumber : string;
    
    constructor(values: Object = {}) {
           //Constructor initialization
        Object.assign(this, values);
    }

}