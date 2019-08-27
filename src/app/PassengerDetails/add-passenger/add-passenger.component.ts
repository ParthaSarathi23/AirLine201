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
  food: string;
  seatno: string='';
  arrivaltime: string;
  depaturetime: string;
  checkedin: number=0
  infantcount: number;
  anicilary: string;
  cbArr: string[];
  cbChecked: string[];
  type: number;
  passengerParticularData: Passenger;
  dateofbirth: Date;
  foods: string[];
  disabilities:string[];
  fooditem = 0;
  isAdminLoggedIn: boolean;
  passengers: Passenger;
  numbers = [];
  mid: string;
  passenger;
  flightNo = 0;
  flights = [];
  selectedDeviceObj;
  flight: Flight;
  wheelchair: string;
  radioData;
  infants;
  passengerInfo: PassengerDataClass;
  ancilary: Ancilary;
  shopping: string;
  baggage: string;
  flightname:string;


  constructor(private route: ActivatedRoute, private router: Router,
    private airlineService: AirlineService, private store: Store<AppState>, public dialog: MatDialog) {
    this.cbArr = ['Bay Seat', 'Wheelchair Access', 'Tip', 'Shopping'];
    this.cbChecked = ['Shopping'];
    this.foods = ['Veg', 'Nonveg'];
    this.disabilities=['yes','no'];
    this.flights = this.airlineService.getFlightData();
    this.selectedDeviceObj = this.flights[1];

    // store.select('addPassengerDetails').subscribe((data: Passenger) => this.passengers = data );

    //console.log(this.passengers);   
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(PassengerModalComponent, {
      width: '650px',
      data: [true,this.ancilary],

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      var obj=localStorage.getItem('ancilary');
      this.ancilary = JSON.parse(obj);
    });
  }

  ngOnInit() {
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
    this.flightname=newObj;
    this.flight = this.airlineService.getParticularFlightDetails(newObj);
    var time = this.flight.time;
    this.depaturetime = time;
    this.arrivaltime = time;
    // this.selectedDeviceObj = newObj;
    // ... do other stuff here ...
  }
  onFoodItemChange(newObj: any) {
   this.food=newObj;
  }
  onDisabilityItemChange(newObj: any) {
    this.disablity=newObj;
   }
  updateView(passenger: Passenger) {
    alert(passenger.infants)
    this.name = passenger.name;
    this.email = passenger.email;
    this.infants = passenger.infants;
    this.passport = passenger.passport;
    this.seatno = passenger.seatnumber ? passenger.seatnumber : '';
    this.mid = passenger.id + '';
    this.address=passenger.address;
    this.arrivaltime=passenger.arrivaltime;
    this.depaturetime=passenger.depaturetime;
  // this.flight.name=passenger.flight;
    this.food=passenger.food;
    alert(JSON.stringify(passenger.ancilarservices));
    this.disablity=passenger.disability;
    this.ancilary=passenger.ancilarservices;
    this.flight= this.airlineService.getParticularFlightDetails(this.flightname);
    this.selectedDeviceObj = this.flight;
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

    this.seatno = form.value.seatno;
    this.infantcount = form.value.infants;
  
    
    if(this.ancilary===null || this.ancilary===undefined){
      this.ancilary=new Ancilary();
    }else{
      this.ancilary.baggage = this.baggage;
      this.ancilary.shopping = this.shopping;
      this.ancilary.wheelchair = this.wheelchair;
  
    }

    if (!this.isFromEdit) {
      this.store.dispatch({
        type: 'ADD_PASSENGER',
        payload: <Passenger>{
          id: +this.mid,
          name: this.name,
          email: this.email,
          flight: this.flight.name,
          infants: this.infantcount,
          passport: this.passport,
          address: this.address,
          seatnumber: this.seatno,
          disability: this.disablity,
          ischeckedin: this.checkedin,
          ancilarservices: this.ancilary,
          arrivaltime: this.arrivaltime,
          depaturetime: this.depaturetime,
        }
      });


      this.airlineService.addFlightOnAddPassenger(+this.mid);
      this.router.navigate(['passenger-list']);
    } else {
      this.store.dispatch({
        type: 'EDIT_PASSENGER',
        payload: <Passenger>{
          id: +this.id,
          email: this.email,
          name: this.name,
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
    if(this.ancilary===null || this.ancilary===undefined){
      this.ancilary=new Ancilary();
    }else{
      
      // this.baggage=this.ancilary.baggage ;
      // this.ancilary.shopping = this.shopping;
      // this.ancilary.wheelchair = this.wheelchair;
  
    }
   
    this.passengerInfo = new PassengerDataClass()
    this.passengerInfo.name = this.name;
    this.passengerInfo.email = this.email;
    this.passengerInfo.flight = this.flightname;
    this.passengerInfo.infants = this.infants;
    this.passengerInfo.passport = this.passport;
    this.passengerInfo.address = this.address;
    this.passengerInfo.seatnumber = this.seatno;
    this.passengerInfo.disability = this.disablity;
    this.passengerInfo.ischeckedin = this.checkedin;
    this.passengerInfo.ancilarservices = this.ancilary;
    this.passengerInfo.arrivaltime = this.arrivaltime;
    this.passengerInfo.depaturetime = this.depaturetime;
    this.passengerInfo.food=this.food;



    localStorage.setItem('passengerInfo', JSON.stringify(this.passengerInfo));
    if (this.isFromEdit) {
      this.router.navigate(['seat-allocation/' + this.id]);
    } else {
      this.router.navigate(['seat-allocation/']);
    }
  }

}
