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

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.scss']
})

export class AddPassengerComponent implements OnInit {
  isFromEdit:boolean;
  id: number = 0;
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
  edit=0;
  isAdminLoggedIn:boolean;
  passengers: Passenger;

  constructor(private route: ActivatedRoute, private router: Router,
    private airlineService: AirlineService,private store: Store<AppState>,public dialog: MatDialog) {
    this.cbArr = ['Bay Seat', 'Wheelchair Access', 'Tip', 'Shopping'];
    this.cbChecked = ['Shopping'];
    this.foods=['Veg','Nonveg'];
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
    data: null
  });

  dialogRef.afterClosed().subscribe(result => {
    //this.e = result;
  });
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

    console.log(this.edit);
    //this.food = form.value.food;
    this.seatno = form.value.seatno;
    this.checkedin = form.value.checkedin;
    this.infantcount = form.value.infantcount;
    this.anicilary = form.value.anicilary;

      
      this.store.dispatch({
        type: 'ADD_PASSENGER',
        payload: <Passenger> {
        
          email: this.email,
          name: this.name,
        }
      });
    
      this.router.navigate(['passenger-list']);
    }
  setDate(date:string){
    let formatedDate = new DatePipe('mm/dd/yyyy').transform(date);

    this.dob = formatedDate;
  }
  seatAllocation(){
    this.router.navigate(['seat-allocation/' + this.id]);

  }
  
}
