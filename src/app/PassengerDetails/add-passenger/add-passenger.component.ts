import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.scss']
})
export class AddPassengerComponent implements OnInit {

  email:string;
  name:string;
  passport:string;
  address:string;
  dob:string;
  disablity:string;
  food:string;
  seatno:string;
  checkedin:string;
  infantcount:string;
  anicilary:string;

  constructor() { }

  ngOnInit() {
  }

  addPassenger(form:NgForm){
    console.log("sigin");
    this.email=form.value.email;
    this.name=form.value.name;
    this.passport=form.value.passport;
    this.address=form.value.address;
    this.passport=form.value.passport;
    this.dob=form.value.dob;
    //this.disablity=form.value.disablity;

    this.food=form.value.food;
    this.seatno=form.value.seatno;
    //this.checkedin=form.value.checkedin;
    this.infantcount=form.value.infantcount;
   // this.anicilary=form.value.anicilary;

    console.log(this.disablity +"**"+this.checkedin+"**"+this.anicilary );



  }
}
