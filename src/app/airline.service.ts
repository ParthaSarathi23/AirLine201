import { Subject } from 'rxjs';
import { Passenger } from './Entity/Passenger';

export class AirlineService{
    showLogoutEvent=new Subject<String>();
    passengerChangedEvent=new Subject<Passenger[]>();

    passengerData:Passenger[]=[
        {
           id:1, name:'Subha', email:'subha064@gmail.coming', passport:'BL78785634', address:'Patia,Bhubaneswar,754103', dob:'05/07/1991', disability:'No', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },
        {
            id:2, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:3,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:4, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:5,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:6, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:7, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:8, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:9,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:10,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:11, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:12,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:13,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:14, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:15, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:16,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:17,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:18, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:19,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:20,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:21, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:22, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:23,name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:24, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:25, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
        },{
            id:26, name:'String', email:'String', passport:'String', address:'String', dob:'String', disability:'String', food:true, seatnumber:1, ischeckedin:true, infants:2, ancilarservices:true,
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