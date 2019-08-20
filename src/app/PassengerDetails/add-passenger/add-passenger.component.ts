import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AirlineService } from 'src/app/airline.service';
import { Passenger } from 'src/app/Entity/Passenger';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.scss']
})
export class AddPassengerComponent implements OnInit {
  id: number
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

  constructor(private route: ActivatedRoute, private router: Router,
    private airlineService: AirlineService) {
    this.cbArr = ['Bay Seat', 'Wheelchair Access', 'Tip', 'Shopping'];
    this.cbChecked = ['Shopping'];
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        this.passengerParticularData = this.airlineService.getParticularPassengerData(this.id);
        this.updateView(this.passengerParticularData)
      }
    );
  }
  updateView(passenger:Passenger){
      this.name=passenger.name;
      this.email=passenger.email;
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
    this.dob = form.value.dob;
    this.disablity = form.value.disablity;

    this.food = form.value.food;
    this.seatno = form.value.seatno;
    this.checkedin = form.value.checkedin;
    this.infantcount = form.value.infantcount;
    this.anicilary = form.value.anicilary;






  }
}
