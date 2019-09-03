import { Subject, Observable } from 'rxjs';
import { Passenger } from './Entity/Passenger';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Injectable } from '@angular/core';
import { Flight } from './Entity/Flight';
// import { FirebaseDatabase } from '@angular/fire';
// import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { reject } from 'q';


// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
import { Ancilary } from './Entity/Ancilary';
import { Seat } from './Entity/Seat';
import { Meal } from './Entity/Meal';
import { ShoppingItem } from './Entity/ShoppingItem';

@Injectable()
export class AirlineService {

    constructor(private store: Store<AppState>) {

    }
    ancilary = new Ancilary();

    showLogoutEvent = new Subject<String[]>();
    passengerChangedEvent = new Subject<Passenger[]>();
    selectedSeats = new Subject<String[]>();
    passenger;
    flight;
    index: number;
    string: String[];
    passengerDatas: Passenger[] = [];
    passengerFromLocalStorage: Passenger[] = [];
    // passengerData: Passenger[] = [
    //     {
    //         id: 1, name: 'Subhalaxmi Behera', email: 'subha064@gmail.com', passport: 'BL78785634', address: 'PLOT-1064,KIIT SQUARE,BBSR-751021,ODISHA,INDIA', dob: '05/07/1991', disability: 'NO', food: 'veg', seatnumber: 'B_1', ischeckedin: 0, infants: 2, ancilarservices: new Ancilary(), flight: 'Indigo235',arrivaltime:'12.55',depaturetime:'12.78',seat:new Seat()
    //     },
    //     {
    //         id: 2, name: 'partha', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: 'veg', seatnumber: '', ischeckedin: 0, infants: 2, ancilarservices: new Ancilary(), flight: 'Indigo235',arrivaltime:'12.55',depaturetime:'12.78',seat:new Seat()
    //     }, {
    //         id: 3, name: 'sonali', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: 'veg', seatnumber: 'A_1', ischeckedin: 1, infants: 2, ancilarservices: new Ancilary(), flight: 'Indigo235',arrivaltime:'12.55',depaturetime:'12.78',seat:new Seat()
    //     }, {
    //         id: 4, name: 'Arijit', email: 'String', passport: 'BL78785634', address: 'String', dob: 'String', disability: 'String', food: 'veg', seatnumber: '', ischeckedin: 1, infants: 2, ancilarservices: new Ancilary(), flight: 'Indigo235',arrivaltime:'12.55',depaturetime:'12.78',seat:new Seat()
    //     }
    // ]


    flightData: Flight[] = [
        {
            id: 1, name: 'Indigo235', arrivaltime: '10:90', depaturetime: '10:90', passengerNo: 0, passengerDetails: [],
            meal: null, ancilaryService: null, shoppingItems: new ShoppingItem()
        },
        {
            id: 2, name: 'Indigo990', arrivaltime: '10:90', depaturetime: '10:90', passengerNo: 0, passengerDetails: [],
            meal: null, ancilaryService: null, shoppingItems: new ShoppingItem()
        },
        {
            id: 3, name: 'Indigo789', arrivaltime: '10:90', depaturetime: '10:90', passengerNo: 0, passengerDetails: [],
            meal: null, ancilaryService: null, shoppingItems: new ShoppingItem()
        },
        {
            id: 4, name: 'Indigo555', arrivaltime: '10:90', depaturetime: '10:90', passengerNo: 0, passengerDetails: [],
            meal: null, ancilaryService: null, shoppingItems: new ShoppingItem()
        },
        {
            id: 5, name: 'Indigo231', arrivaltime: '10:90', depaturetime: '10:90', passengerNo: 0, passengerDetails: [],
            meal: null, ancilaryService: null, shoppingItems: new ShoppingItem()
        }

    ];
    updateFlightAncilaryData(id, ancilary) {
        var flightsData=[]
         flightsData=this.getFlightsData();
        flightsData.forEach(map_element => {
            if (map_element.id == id) {
            

                map_element.ancilaryService = ancilary;
            }
        });
        localStorage.setItem('flight', JSON.stringify(flightsData));

    }
    updateFlightMealData(id, meal) {
        var flightsData=[]
         flightsData=this.getFlightsData();
         flightsData.forEach(map_element => {
            if (map_element.id == id) {
                map_element.meal = meal;
            }
        });
        localStorage.setItem('flight', JSON.stringify(flightsData));
    }
    updateFlightShoppingData(id, shoppingItems) {
        var flightsData=[]
        flightsData=this.getFlightsData();
        flightsData.forEach(map_element => {
            if (map_element.id == id) {
                map_element.shoppingItems = shoppingItems;
            }
        });
        localStorage.setItem('flight', JSON.stringify(flightsData));

    }
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
    
    getParticularFlightDetails(name) {
        this.getFlightsData().forEach((p, index) => {
            if (p.name === name) {
                this.flight = p;
            }
        });
        return this.flight;
    }
    getParticularFlightIndex(name) {
        this.getFlightsData().forEach((p, index) => {

            if (p.name === name) {
                this.index = index;
                this.flight = p;
            }
        });
        return this.index;
    }


    
   
    getAllPassengerData(){
        this.passenger = [];
        var passengerData = [];
       
        var retrievedObject = localStorage.getItem('PassengerList');
        if (retrievedObject == '' || retrievedObject==null) {
            return passengerData;
            
        }else {
            passengerData = JSON.parse(retrievedObject);
            return passengerData;
        }
    }

    getPassengerDataOfParticularFlight(id) {
        var passengerData = [];
        this.flightData.forEach((flight, index) => {
            if (flight.id == id) {
                passengerData = flight.passengerDetails;
            }
        });
        return passengerData;
    }
    getPassengerDataOfParticularFlightName(name) {
        var passengerData = [];
        this.flightData.forEach((flight, index) => {
            if (flight.name == name) {
                passengerData = flight.passengerDetails;
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
    getPassengerSeatData(name) {
        var seatArray: Passenger[] = [];
        this.getFlightsData().forEach((p, index) => {

            if (p.name === name) {
                seatArray = p.passengerDetails;
            }
        });
        return seatArray;

    }
    private getPassengerDataOnAdd() {
        this.passengerDatas = [];
        this.store.select(state => state).subscribe(data => {
            data.passenger.forEach((element, index) => {
                this.passengerDatas.unshift(element);
            });
        });
        if (this.passengerDatas == null || this.passengerDatas == undefined) {
            return [];
        } else {
            return this.passengerDatas.slice();
        }
    }
   private getParticularPassengerDataOnAdd(id: number): any {
        if (this.getPassengerDataOnAdd() == null || this.getPassengerDataOnAdd() == undefined || this.getPassengerDataOnAdd().length == 0) {
            return
        } else {
            this.getPassengerDataOnAdd().forEach((p, index) => {
                if (p.id === id) {
                    this.passenger = p;
                }
            });
            return this.passenger;
        }
    }
    addPassengerDataToLocalStorage(id) {
        this.passenger = [];
        var passengerData = [];
        this.passenger = this.getParticularPassengerDataOnAdd(id);
        var retrievedObject = localStorage.getItem('PassengerList');
        if (retrievedObject == '' || retrievedObject==null) {
            passengerData.push(this.passenger);
           
            localStorage.setItem('PassengerList', JSON.stringify(passengerData));
        }else {
            passengerData = JSON.parse(retrievedObject);
            passengerData.push(this.passenger);
            localStorage.setItem('PassengerList', JSON.stringify(passengerData));
        }
    }


    getPassengerDataOfParticularID(id){
        this.passenger = [];
        var passengerData = [];
        this.passenger = this.getParticularPassengerData(id);
        var retrievedObject = localStorage.getItem('PassengerList');
        if (retrievedObject == '' || retrievedObject==null) {
            passengerData.push(this.passenger);
            localStorage.setItem('PassengerList', JSON.stringify(passengerData));
        }else {
            passengerData = JSON.parse(retrievedObject);
            passengerData.forEach((element,index) => {
                if(this.passenger.id==element.id){
                    passengerData[index]=this.passenger;
                }
            });
            localStorage.setItem('PassengerList', JSON.stringify(passengerData));
        }
    }

    newPassenger(passengerData: Observable<Passenger[]>) {
        console.log(passengerData);
        //  this.passengerData.push(passengerData);
        //  this.passengerChangedEvent.next(this.passengerData.slice());
    }

    getSelectedSeats(seat: string[]) {
        this.selectedSeats.next(seat);
    }

    getParticularPassengerData(id){
        var passengerData=null;
        var retrievedObject = localStorage.getItem('PassengerList');
        if (retrievedObject == '' || retrievedObject==null) {
            return passengerData;
        }else {
            passengerData = JSON.parse(retrievedObject);
            passengerData.forEach((element,index) => {
                if(id==element.id){
                passengerData=element;
                }
            });
            return passengerData;
        }
    }

    editPassengerDataToLocalStorage(id){
        this.passenger = [];
        var passengerData = [];
        this.passenger = this.getParticularPassengerData(id);
        var retrievedObject = localStorage.getItem('PassengerList');
        if (retrievedObject == '' || retrievedObject==null) {
            passengerData.push(this.passenger);
            localStorage.setItem('PassengerList', JSON.stringify(passengerData));
        }else {
            passengerData = JSON.parse(retrievedObject);
            passengerData.forEach((element,index) => {
                if(this.passenger.id==element.id){
                    passengerData[index]=this.passenger;
                }
            });
            localStorage.setItem('PassengerList', JSON.stringify(passengerData));
        }
    }
    addFlightOnAddPassenger(id) {
        this.passenger = [];
        this.flightData=[];
        this.passenger = this.getParticularPassengerData(id);
        this.flightData=this.getFlightsData();
        this.flightData.forEach((flight, index) => {
            if (this.passenger.flight == flight.name) {
                this.flightData[index].passengerNo = this.flightData[index].passengerNo + 1;
                this.flightData[index].passengerDetails.push(this.passenger);
            }
        });
        localStorage.setItem('flight', JSON.stringify(this.flightData));
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

     getFlightsData(){
        var flightData=null;
        var retrievedObject = localStorage.getItem('flight');
        if (retrievedObject == '' || retrievedObject==null) {
            return flightData;
        }else {
            flightData = JSON.parse(retrievedObject);
            return flightData;
        }
    }
}