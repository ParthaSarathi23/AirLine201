import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AirlineService } from 'src/app/airline.service';
import { Passenger } from 'src/app/Entity/Passenger';
import { DatePipe } from '@angular/common';
import { LoggedInStaus } from 'src/app/user/LoggedInStatus';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.scss']
})
export class AddPassengerComponent implements OnInit {
  isFromEdit:boolean;
  id: number=0;
  email: string;
  name: string;
  passport: string;
  address: string;
  dob: string;
  disablity: string;
  food: string;
  seatno: string;
  checkedin: string;
  infantcount: string;
  anicilary: string;
  cbArr: string[];
  cbChecked: string[];
  type: number;
  passengerParticularData: Passenger;
  dateofbirth:Date;
  foods:string[];
  selectedfood:string;
  isAdminLoggedIn:boolean;

  constructor(private route: ActivatedRoute, private router: Router,
    private airlineService: AirlineService) {
    this.cbArr = ['Bay Seat', 'Wheelchair Access', 'Tip', 'Shopping'];
    this.cbChecked = ['Shopping'];
    this.foods=['Veg','Nonveg'];
  }
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
}
  ngOnInit() {
    this.isFromEdit=false;
    this.id=undefined;


    this.airlineService.selectedSeats.subscribe(
      (string: string[]) => {
        string.forEach(element => {
             this.seatno=this.seatno+element;
        });
        
      });

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(this.id!==undefined){
          this.isFromEdit=true;
     
          console.log(this.id);
          this.passengerParticularData = this.airlineService.getParticularPassengerData(this.id);
          this.updateView(this.passengerParticularData);
        }
    
      }
    );

    var loggedInStatus: LoggedInStaus[] = [];

    var retrievedObject = localStorage.getItem('loggedIn');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    loggedInStatus = JSON.parse(retrievedObject);

    if(loggedInStatus.length>0){
      if (loggedInStatus[0].user === 'ADMIN' && loggedInStatus[0].isLoggedIn === true) {
        this.isAdminLoggedIn = true;
  
      }

    }
  console.log(this.isFromEdit);



  
  }
  updateView(passenger:Passenger){
      this.name=passenger.name;
      this.email=passenger.email;
      this.infantcount=passenger.infants+"";
      this.passport=passenger.passport;
      this.seatno=passenger.seatnumber+"";
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
    this.updateOptions();

    console.log("sigin");
    this.email = form.value.email;
    this.name = form.value.name;
    this.passport = form.value.passport;
    //this.address=form.value.address;
    
    this.setDate(form.value.dob);
    this.disablity = form.value.disablity;

    console.log(this.selectedfood);
    this.food = form.value.food;
    this.seatno = form.value.seatno;
    this.checkedin = form.value.checkedin;
    this.infantcount = form.value.infantcount;
    this.anicilary = form.value.anicilary;






  }
  setDate(date:string){
    let formatedDate = new DatePipe('mm/dd/yyyy').transform(date);

    this.dob = formatedDate;
  }
  seatAllocation(){
    this.router.navigate(['seat-allocation/' + this.id]);

  }
}
