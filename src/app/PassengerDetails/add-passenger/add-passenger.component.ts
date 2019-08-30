import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AirlineService } from 'src/app/airline.service';
import { Passenger } from 'src/app/Entity/Passenger';
import { DatePipe } from '@angular/common';
import { LoggedInStaus } from 'src/app/user/LoggedInStatus';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PassengerModalComponent } from '../passenger-modal/passenger-modal.component';
import { Flight } from 'src/app/Entity/Flight';
import { PassengerDataClass } from 'src/app/Entity/PassengerDataClass';
import { Ancilary } from 'src/app/Entity/Ancilary';
import { Seat } from 'src/app/Entity/Seat';
import { Meal } from 'src/app/Entity/Meal';
import { ShoppingItem } from 'src/app/Entity/ShoppingItem';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.scss']
})


export class AddPassengerComponent implements OnInit {
  isFromEdit: boolean;
  id: number = 0;
  email: string;
  name: string;
  passport: string;
  address: string;
  dob: string;
  disablity: string;
  food: string = "0";
  seatno: string = '';
  arrivaltime: string;
  depaturetime: string;
  checkedin: number = 0
  infantcount: number;
  anicilary: string;
  cbArr: string[];
  cbChecked: string[];
  type: number;
  passengerParticularData: Passenger;
  dateofbirth: Date;
  foods = [];
  disabilities: string[];
  fooditem = "0";
  isAdminLoggedIn: boolean;
  passengers: Passenger;
  numbers = [];
  mid: string;
  passenger;
  flightNo = "0";
  flights = [];
  shopingItems:ShoppingItem;
  selectedDeviceObj;
  flight: Flight;
  wheelchair: string;
  radioData;
  infants;
  passengerInfo: PassengerDataClass;
  ancilary: Ancilary;
  meal: Meal;
  ancilaryItem: Ancilary;
  shopping: string;
  baggage: string;
  disablityCount = "0";
  seat;
  seatselection: boolean = false;
  shopingItemsData=[];



  constructor(private route: ActivatedRoute, private router: Router,
    private airlineService: AirlineService, private store: Store<AppState>, public dialog: MatDialog) {


    this.disabilities = ['yes', 'no'];
    this.flights = this.airlineService.getFlightData();
    this.selectedDeviceObj = this.flights[1];
    this.seat = new Seat();


  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }



  openDialog(): void {
    console.log(this.ancilary);
    const dialogRef = this.dialog.open(PassengerModalComponent, {
      width: '650px',
      data: [true, this.ancilary, this.ancilaryItem,this.shopingItemsData],

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      var obj = localStorage.getItem('ancilary');
      if (obj !== '') {
        this.ancilaryItem = JSON.parse(obj);
      }

    });
  }

  ngOnInit() {
    this.radioData = 'no';
    console.log(this.flightNo);
    this.isFromEdit = false;

    var retrievedObject = localStorage.getItem('passengerInfo');

    if (retrievedObject === '') {

      this.route.params.subscribe(
        (params: Params) => {
          this.id = undefined;
          this.id = params['id'];
          if (this.id !== undefined) {
            this.isFromEdit = true;

            console.log(this.id);
            this.passenger = this.airlineService.getParticularPassengerData(+this.id);
            this.updateView(this.passenger);

          } else {
            this.isFromEdit = false;
          }

        }
      );
    } else {
      this.passengerInfo = null;
      this.passengerInfo = JSON.parse(retrievedObject);
      this.updateView(this.passengerInfo);
    }



    var loggedInStatus: LoggedInStaus[] = [];

    var retrievedObject = localStorage.getItem('loggedIn');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    loggedInStatus = JSON.parse(retrievedObject);

    if (loggedInStatus.length > 0) {
      if (loggedInStatus[0].user === 'ADMIN' && loggedInStatus[0].isLoggedIn === true) {
        this.isAdminLoggedIn = true;

      }

    }
    console.log(this.isFromEdit);


  }

  onItemChange(newObj: any) {
    this.flightNo = newObj;
    this.flight = this.airlineService.getParticularFlightDetails(newObj);
    this.depaturetime = this.flight.depaturetime;
    this.arrivaltime = this.flight.arrivaltime;
    this.seatselection = true;
    this.ancilary = this.flight.ancilaryService;
    this.setFoods(this.flight);
    this.setShoppingItems(this.flight);

  }
  onFoodItemChange(newObj: any) {
    console.log(this.fooditem);
    this.food = newObj;
  }

  setFoods(flight) {
    this.meal = flight.meal;
    if (this.meal !== null) {
      if (this.meal.customisedmeal) {
        this.foods.push("CustomisedMeal");
      }
      if (this.meal.veg) {
        this.foods.push("Veg");
      }
      if (this.meal.nonveg) {
        this.foods.push("NonVeg");
      }
    } else {
      this.foods = ['Veg', 'NonVeg', 'CustomisedMeal'];
    }
  }

  setShoppingItems(flight){
    this.shopingItems = flight.shoppingItems;
    if (this.shopingItems !== null) {
      if (this.shopingItems.perfume) {
        this.shopingItemsData.push("Perfume");
      }
      if (this.shopingItems.cardholder) {
        this.shopingItemsData.push("CardHolder");
      }
      if (this.shopingItems.phonestand) {
        this.shopingItemsData.push("PhoneStand");
      }
    } else {
      this.shopingItemsData = ['Perfume', 'CardHolder', 'PhoneStand'];
    }
  }
  onDisabilityItemChange(newObj: any) {
    this.disablity = newObj;
  }
  updateView(passenger: Passenger) {
    this.name = passenger.name;
    this.email = passenger.email;
    this.dob = passenger.dob;
    this.infants = passenger.infants;
    this.passport = passenger.passport;
    this.seatno = passenger.seatnumber ? passenger.seatnumber : '';
    this.mid = passenger.id + '';
    this.address = passenger.address;
    this.arrivaltime = passenger.arrivaltime;
    this.depaturetime = passenger.depaturetime;


    if (this.fooditem === undefined) {
      this.fooditem = "0";
    }

    this.disablityCount = passenger.disability;
    if (this.disablityCount === undefined) {
      this.disablityCount = "0";
    }

    this.ancilaryItem = passenger.ancilarservices;
    this.flightNo = passenger.flight;
    if (this.flightNo === undefined) {
      this.flightNo = "0";
    } else {
      this.flight = this.airlineService.getParticularFlightDetails(this.flightNo);
      this.seatselection = true;
      this.ancilary = this.flight.ancilaryService;
      this.fooditem = passenger.food;
      this.setFoods(this.flight);
      this.setShoppingItems(this.flight);
    }

    //this.selectedDeviceObj = this.flight;

    if (passenger.ischeckedin === 1) {
      this.radioData = 'yes';
    } else {
      this.radioData = 'no';
    }

    this.seat = passenger.seat;
    //updateModal(this.ancilary);
  }
  updateCheckedOptions(chBox, event) {
    var cbIdx = this.cbChecked.indexOf(chBox);
    if (event.target.checked) {
      if (cbIdx < 0)
        this.cbChecked.push(chBox);
    } else {
      if (cbIdx >= 0)
        this.cbChecked.splice(cbIdx, 1);
    }
  }

  updateOptions() {
    console.log(this.cbChecked);
  }
  addPassenger(form: NgForm) {

    console.log(this.radioData);

    if (this.radioData === 'yes') {
      this.checkedin = 1;
    } else {
      this.checkedin = 0;
    }
    const uniqueNumber = (maxVal) => {
      const number = Math.floor((Math.random() * maxVal) + 1);
      if (!this.numbers.includes(number)) {
        this.numbers.push(number);
        return number;
      } else if (this.numbers.length - 1 !== maxVal) {
        uniqueNumber(maxVal);
      }
    }

    this.mid = uniqueNumber(1000) + '';
    this.updateOptions();

    console.log("sigin");
    // this.id = form.value.id;
    this.email = form.value.email;
    this.name = form.value.name;
    this.passport = form.value.passport;
    //this.address=form.value.address;
    this.setDate(form.value.dob);

    console.log(this.food);

    // this.seatno = form.value.seatno;
    console.log(this.seatno);
    this.infantcount = form.value.infants;


    if (this.ancilaryItem === null || this.ancilaryItem === undefined) {
      this.ancilaryItem = new Ancilary();
    } else {

    }

    if (!this.isFromEdit) {
      this.store.dispatch({
        type: 'ADD_PASSENGER',
        payload: <Passenger>{
          id: +this.mid,
          name: this.name,
          dob: this.dob,
          email: this.email,
          flight: this.flightNo,
          infants: this.infantcount,
          passport: this.passport,
          address: this.address,
          seatnumber: this.seatno,
          disability: this.disablityCount,
          ischeckedin: this.checkedin,
          ancilarservices: this.ancilaryItem,
          arrivaltime: this.arrivaltime,
          depaturetime: this.depaturetime,
          food: this.fooditem,
          seat: this.seat

        }
      });


      this.airlineService.addFlightOnAddPassenger(+this.mid);
      this.router.navigate(['passenger-list']);
    } else {
      this.store.dispatch({
        type: 'EDIT_PASSENGER',
        payload: <Passenger>{
          id: +this.id,
          name: this.name,
          dob: this.dob,
          email: this.email,
          flight: this.flightNo,
          infants: this.infantcount,
          passport: this.passport,
          address: this.address,
          seatnumber: this.seatno,
          disability: this.disablityCount,
          ischeckedin: this.checkedin,
          ancilarservices: this.ancilaryItem,
          arrivaltime: this.arrivaltime,
          depaturetime: this.depaturetime,
          food: this.fooditem
        }
      });
      this.router.navigate(['passenger-list']);
    }

  }
  setDate(date: string) {
    let formatedDate = new DatePipe('mm/dd/yyyy').transform(date);

    this.dob = formatedDate;
  }
  seatAllocation() {

    if (this.ancilaryItem === null || this.ancilaryItem === undefined) {
      this.ancilaryItem = new Ancilary();
    } 

    if (this.radioData === 'yes') {
      this.checkedin = 1;
    } else {
      this.checkedin = 0;
    }

    this.passengerInfo = new PassengerDataClass()
    this.passengerInfo.name = this.name;
    this.passengerInfo.dob = this.dob;
    this.passengerInfo.email = this.email;
    this.passengerInfo.flight = this.flightNo;
    this.passengerInfo.infants = this.infants;
    this.passengerInfo.passport = this.passport;
    this.passengerInfo.address = this.address;
    this.passengerInfo.seatnumber = this.seatno;
    this.passengerInfo.disability = this.disablityCount;
    this.passengerInfo.ischeckedin = this.checkedin;
    this.passengerInfo.ancilarservices = this.ancilaryItem;
    this.passengerInfo.arrivaltime = this.arrivaltime;
    this.passengerInfo.depaturetime = this.depaturetime;
    this.passengerInfo.food = this.food;
    this.passengerInfo.seat = this.seat;


    localStorage.setItem('passengerInfo', JSON.stringify(this.passengerInfo));
    if (this.isFromEdit) {
      this.router.navigate(['seat-allocation/' + this.id]);
    } else {
      this.router.navigate(['seat-allocation/']);
    }
  }

}
