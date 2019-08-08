import { Subject } from 'rxjs';
import { Passenger } from './Entity/Passenger';

export class AirlineService{
    showLogoutEvent=new Subject<String>();

    passengerData:Passenger[]=[
        {
           id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },
        {
            id:2, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:1, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },
]

    showLogout(email:String){
        this.showLogoutEvent.next(email);
    }


}