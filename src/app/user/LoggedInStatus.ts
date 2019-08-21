export class LoggedInStaus{
    
    user:string;
    isLoggedIn:boolean;
    name:string;

    constructor(user,isLoggedIn,name){
        this.user=user;
        this.isLoggedIn=isLoggedIn;
        this.name=name;
    }

}