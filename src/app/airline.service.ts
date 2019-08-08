import { Subject } from 'rxjs';

export class AirlineService{
    showLogoutEvent=new Subject<String>();

    showLogout(email:String){
        this.showLogoutEvent.next(email);
    }


}