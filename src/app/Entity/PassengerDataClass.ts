import { Passenger } from './Passenger';
import { Ancilary } from './Ancilary';
import { Seat } from './Seat';

export class PassengerDataClass{
    id:number;
    name:string;
    email:string;
    passport:string;
    address:string;
    dob:string;
    disability:string;
    food:string;
    seatnumber:string;
    ischeckedin:number;
    infants:number;
    ancilarservices:Ancilary;
    flight:string;
    arrivaltime:string;
    depaturetime:string;
    seat:Seat;
}