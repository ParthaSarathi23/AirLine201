import { Subject, Observable } from 'rxjs';
import { Passenger } from './Entity/Passenger';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Injectable } from '@angular/core';
import { Flight } from './Entity/Flight';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { reject } from 'q';


// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { Ancilary } from './Entity/Ancilary';

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
    passengerFromLocalStorage: Passenger[] = [];
    passengerData: Passenger[] = [
        {
            id: 1, name: 'Subhalaxmi Behera', email: 'subha064@gmail.com', passport: 'BL78785634', address: 'PLOT-1064,KIIT SQUARE,BBSR-751021,ODISHA,INDIA', dob: '05/07/1991', disability: 'NO', food: 'veg', seatnumber: 'B_1', ischeckedin: 0, infants: 2, ancilarservices: new Ancilary(), flight: 'Indigo235',arrivaltime:'12.55',depaturetime:'12.78',
        },
        {
            id: 2, name: 'partha', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: 'veg', seatnumber: '', ischeckedin: 0, infants: 2, ancilarservices: new Ancilary(), flight: 'Indigo235',arrivaltime:'12.55',depaturetime:'12.78',
        }, {
            id: 3, name: 'sonali', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: 'veg', seatnumber: 'A_1', ischeckedin: 1, infants: 2, ancilarservices: new Ancilary(), flight: 'Indigo235',arrivaltime:'12.55',depaturetime:'12.78',
        }, {
            id: 4, name: 'Arijit', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: 'veg', seatnumber: '', ischeckedin: 1, infants: 2, ancilarservices: new Ancilary(), flight: 'Indigo235',arrivaltime:'12.55',depaturetime:'12.78',
        }
    ]

    flightData: Flight[] = [
        {
            id: 1, name: 'Indigo235', time: '10:90', passengerNo: 0, passengerDetails: []
        },
        {
            id: 2, name: 'Indigo990', time: '25:90', passengerNo: 0, passengerDetails: []
        },
        {
            id: 3, name: 'Indigo789', time: '21:90', passengerNo: 0, passengerDetails: []
        },
        {
            id: 4, name: 'Indigo555', time: '25:90', passengerNo: 0, passengerDetails: []
        },
        {
            id: 5, name: 'Indigo231', time: '22:90', passengerNo: 0, passengerDetails: []
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
        this.getFlightDetails().forEach((p, index) => {
            if (p.name === name) {
                this.flight = p;
            }
        });
        return this.flight;
    }
    getPassengerData() {
        this.passengerDatas = [];
        var retrievedObject = localStorage.getItem('passengers');
        this.passengerFromLocalStorage = JSON.parse(retrievedObject);
        this.passengerDatas = this.passengerFromLocalStorage;
        this.store.select(state => state).subscribe(data => {

            data.passenger.forEach((element,index) => {
                this.passengerDatas.unshift(element);
                //this.passengerDatas.push(element);
            });
        });
        return this.passengerDatas.slice();
    }

    getPassengerDataOfParticularFlight(id){
        var passengerData=[];
        this.flightData.forEach((flight, index) => {
            if (flight.id == id) {
                passengerData=flight.passengerDetails;
            }
        });
        return passengerData;
    }

    addUser() {

        // return this.http.put("https://airlineapp-e133e.firebaseio.com/airlineapp-e133e/recipes.json",
        // this.passengerData);
        // firebase.database().ref('users/' + 'sonali').set({
        //     username: name,
        //     email: 'sonali',
        //     profile_picture : 'htto://'
        //   });

        // this.db.collection("cities").doc("LA").set({
        //     name: "Los Angeles",
        //     state: "CA",
        //     country: "USA"
        // })
        // .then(function() {
        //     console.log("Document successfully written!");
        // })
        // .catch(function(error) {
        //     console.error("Error writing document: ", error);
        // });
        // return new Promise<any>((resolve, reject) => {
        //     this.db
        //       .collection("coffeeOrders")
        //       .add(this.passengerData[0])
        //       .then(res => {}, err => reject(err));
        //   });

        // this.passengerData.forEach(element => {
        //     this.db
        // .collection("passengers")
        // .add(element)
        // .then(res => {
        //     console.log("**********"+res);
        // }, err => reject(err));
        // });

    }

    // createUser(value){
    //     if(value.length>0){
    //     return this.db.collection('users').add({
    //       name: value.name,
    //       email: value.name,

    //     });
    //   }
    // }
    getPassengerSeatData() {
        var seatArray: string[] = [];
        this.passengerData.slice().forEach(map_element => {
            seatArray.push(map_element.seatnumber);
        });
        return seatArray;
    }
    getParticularPassengerData(id: number): any {
        this.getPassengerData().forEach((p, index) => {
            console.log(p);
            console.log(index);
            if (p.id === id) {
                console.log(p);
                this.passenger = p;
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

    getSelectedSeats(seat: string[]) {
        this.selectedSeats.next(seat);
    }

    addFlightOnAddPassenger(id) {
        this.passenger = [];
        this.passenger = this.getParticularPassengerData(id);
        this.flightData.forEach((flight, index) => {
            if (this.passenger.flight == flight.name) {
                this.flightData[index].passengerNo = this.flightData[index].passengerNo + 1;
                this.flightData[index].passengerDetails.push(this.passenger);
            }
        });
        console.log(this.flightData);
    }
    removePassengerFromFlight(id) {
        this.passenger = [];
        this.passenger = this.getParticularPassengerData(id);
        this.flightData.forEach((flight, index) => {
            if (this.passenger.flight == flight.name) {
                this.flightData[index].passengerNo = this.flightData.slice()[index].passengerNo - 1;
                this.flightData[index].passengerDetails.splice(index, 1);
            }
        });
        console.log(this.flightData);
    }
}