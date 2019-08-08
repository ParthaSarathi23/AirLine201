import { Subject } from 'rxjs';
import { Passenger } from './Entity/Passenger';

export class AirlineService{
    showLogoutEvent=new Subject<String>();
    passengerChangedEvent=new Subject<Passenger[]>();

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

    getPassengerData(){
        return this.passengerData.slice();
    }
    updatePassenger(id:number,passengerData:Passenger){
        this.passengerData[id]=passengerData;
        console.log(this.passengerData[0].name);
        this.passengerChangedEvent.next(this.passengerData.slice());
    }

    newPassenger(passengerData:Passenger){
        this.passengerData.push(passengerData);
        this.passengerChangedEvent.next(this.passengerData.slice());
    }

    deletePassenger(index:number){
        this.passengerData.splice(index,1);
        this.passengerChangedEvent.next(this.passengerData.slice());
    }

  
}