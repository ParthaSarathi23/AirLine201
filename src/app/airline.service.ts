import { Subject, Observable } from 'rxjs';
import { Passenger } from './Entity/Passenger';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Injectable } from '@angular/core';
import { Flight } from './Entity/Flight';

@Injectable()
export class AirlineService {

    constructor(private store: Store<AppState>) {
    }

    showLogoutEvent = new Subject<String[]>();
    passengerChangedEvent = new Subject<Passenger[]>();
    selectedSeats = new Subject<String[]>();
    passenger;
    flight;
    string: String[];
    passengerDatas: Passenger[] = [];
    passengerData: Passenger[] = [
        {
            id: 1, name: 'Subhalaxmi Behera', email: 'subha064@gmail.com', passport: 'BL78785634', address: 'PLOT-1064,KIIT SQUARE,BBSR-751021,ODISHA,INDIA', dob: '05/07/1991', disability: 'NO', food: true, seatnumber: 'B_1', ischeckedin: true, infants: 2, ancilarservices: true,
        },
        {
            id: 2, name: 'partha', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 3, name: 'sonali', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: 'A_1', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 4, name: 'Arijit', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 5, name: 'Adrita', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 6, name: 'Gopi', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 7, name: 'Biswa', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 8, name: 'Abhisek', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: 'E_1', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 9, name: 'Swapna', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: 'E_2', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 10, name: 'Neel', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: 'E_4', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 11, name: 'Sanjib', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 12, name: 'Nidhi', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 13, name: 'Mohit', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 14, name: 'Madhu', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 15, name: 'queen', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 16, name: 'Lipa', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 17, name: 'Abakash', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 18, name: 'Rinky', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 19, name: 'Satya', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 20, name: 'Sai', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 21, name: 'Gungun', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 22, name: 'Ananya', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 23, name: 'Ardhendu', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 24, name: 'Rajib', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 25, name: 'Arun', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        }, {
            id: 26, name: 'Ashok', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: true, seatnumber: '', ischeckedin: true, infants: 2, ancilarservices: true,
        },
    ]

    
    flightData:Flight[]=[
        {
            id: 1, name: 'Indigo235', time:'10:90',passengerNo:0,passengerDetails:[]
        },
        {
            id: 2, name: 'Indigo990', time:'25:90',passengerNo:0,passengerDetails:[]
        },
        {
            id: 3, name: 'Indigo789', time:'21:90',passengerNo:0,passengerDetails:[]
        },
        {
            id: 4, name: 'Indigo555', time:'25:90',passengerNo:0,passengerDetails:[]
        },
        {
            id: 5, name: 'Indigo231', time:'22:90',passengerNo:0,passengerDetails:[]
        }

    ];
    showLogout(email: String, type: String) {
        this.string = [email, type];
        this.showLogoutEvent.next(this.string);
    }
    getFlightData() {
        var seatArray: string[] = [];
        this.flightData.slice().forEach(map_element => {
            seatArray.push(map_element.name);
        });
        return seatArray;
    }
    getFlightDetails() {
        console.log(this.flightData.slice());
       return this.flightData.slice();
    }
    getParticularFlightDetails(name) {
        this.getFlightDetails().forEach((p,index)=>{
            if(p.name===name){
              this.flight=p;
            }
        });
      return this.flight;
    }
    getPassengerData() {
        this.passengerDatas = [];
        this.store.select(state => state).subscribe(data => {
          //  console.log('data', data.passenger);
            data.passenger.forEach(element => {
                this.passengerDatas.push(element);
            });
        });
        //console.log(this.passengerDatas.slice);
        return this.passengerDatas.slice();
    }
    
    getPassengerSeatData() {
        var seatArray: string[] = [];
        this.passengerData.slice().forEach(map_element => {
            seatArray.push(map_element.seatnumber);
        });
        return seatArray;
    }
    getParticularPassengerData(id: number):any {
        this.getPassengerData().forEach((p,index)=>{
            console.log(p);
            console.log(index);
            if(p.id===id){
              console.log(p);
              this.passenger=p;
            }
        });
      return this.passenger;
    }
    updatePassenger(id: number, passengerData: Passenger) {
        this.passengerData[id] = passengerData;
        console.log(this.passengerData[0].name);
        this.passengerChangedEvent.next(this.passengerData.slice());
    }

    newPassenger(passengerData: Observable<Passenger[]>) {
        console.log(passengerData);
        //  this.passengerData.push(passengerData);
        //  this.passengerChangedEvent.next(this.passengerData.slice());
    }

    deletePassenger(index: number) {
        
        this.passengerData.splice(index, 1);
        this.passengerChangedEvent.next(this.passengerData.slice());
    }

    getSelectedSeats(seat: string[]) {
        this.selectedSeats.next(seat);
    }

    addFlightOnAddPassenger(id){
        this.passenger=[];
        this.passenger=this.getParticularPassengerData(id);
            this.flightData.slice().forEach((flight,index) => {
                if(this.passenger.flight==flight.name){
                    this.flightData.slice()[index].passengerNo=this.flightData.slice()[index].passengerNo+1;
                    this.flightData.slice()[index].passengerDetails.push(this.passenger);
                }
            });

        console.log(this.flightData.slice());
    }
}