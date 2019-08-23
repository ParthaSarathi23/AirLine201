import { Passenger } from './Passenger';

export interface Flight{
    id:number,
    name:string,
    time:string,
    passengerDetails:Passenger[],
    passengerNo:number
}