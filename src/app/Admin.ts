export class Admin{
   
    name : string;
    role : string;

    constructor(values: Object = {}) {
           //Constructor initialization
        Object.assign(this, values);
    }

}