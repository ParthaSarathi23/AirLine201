import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Flight } from '@/Entity/Flight';
import { Passenger } from '@/Entity/Passenger';
import { Subject } from 'rxjs';
import { Ancilary } from '@/Entity/Ancilary';
import { Meal } from '@/Entity/Meal';
import { ShoppingItem } from '@/Entity/ShoppingItem';

@Component({
  selector: 'app-airline-modal',
  templateUrl: './airline-modal.component.html',
  styleUrls: ['./airline-modal.component.scss']
})
export class AirlineModalComponent implements OnInit, OnDestroy {

  passenger: Passenger[];

  noOfChckedIn: number = 0;
  noOfWheeleChair: number = 0;
  noInfants: number = 0;

  Baggage;
  Wheelchair;
  Shopping;

  Veg;
  NonVeg;
  CustomisedMeal;

  Perfume;
  CardHolder;
  PhoneStand;

  flight: Flight;
  arrivalTime;
  depatureTime;
  ancilaryServiceCliked = new Subject<Ancilary>();
  ancilary=new Ancilary;
  meal=new Meal;
  shoppingItem=new ShoppingItem;
  passengerNo;
  constructor(public dialogRef: MatDialogRef<AirlineModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log(data);

    if (data[0] == 0) {

      this.passenger = data[1].passengerDetails;
      this.passengerNo=this.passenger.length;
      this.passenger.forEach((element, index) => {
        if (element.ischeckedin) {
          this.noOfChckedIn = this.noOfChckedIn + 1;
        }
        if (element.infants) {
          this.noInfants = (+this.noInfants) + (+element.infants);
        }
        if (element.disability) {
          this.noOfWheeleChair = this.noOfWheeleChair + 1;
        }
        this.arrivalTime=element.arrivaltime;
        this.depatureTime=element.depaturetime;
      });

    } else if (data[0] == 1) {
      this.flight = undefined;
      this.flight = data[2];

      if (this.flight.ancilaryService !== null) {
        this.Baggage = this.flight.ancilaryService.baggage;
        this.Wheelchair = this.flight.ancilaryService.wheelchair;
        this.Shopping = this.flight.ancilaryService.shopping;
      } else {
        this.Baggage = true;
        this.Wheelchair = true;
        this.Shopping = true;
      }

    } else if (data[0] == 2) {
      this.flight = undefined;
      this.flight = data[2];

      if (this.flight.meal !== null) {
        this.Veg = this.flight.meal.veg;
        this.NonVeg = this.flight.meal.nonveg;
        this.CustomisedMeal = this.flight.meal.customisedmeal;
      } else {
        this.Veg = true;
        this.NonVeg = true;
        this.CustomisedMeal = true;
      }

     
    } else if (data[0] == 3) {
      this.flight = undefined;
      this.flight = data[2];

      if (this.flight.shoppingItems.cardholder==undefined && this.flight.shoppingItems.perfume==undefined &&
        this.flight.shoppingItems.phonestand==undefined) {
          this.CardHolder = true;
          this.Perfume = true;
          this.PhoneStand = true;
      } else {
        this.CardHolder = this.flight.shoppingItems.cardholder;
        this.Perfume = this.flight.shoppingItems.perfume;
        this.PhoneStand = this.flight.shoppingItems.phonestand;
       
      }

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.ancilary.baggage=this.Baggage;
    this.ancilary.shopping=this.Shopping;
    this.ancilary.wheelchair=this.Wheelchair;


    this.meal.veg=this.Veg;
    this.meal.nonveg=this.NonVeg;
    this.meal.customisedmeal=this.CustomisedMeal;


    this.shoppingItem.cardholder=this.CardHolder;
    this.shoppingItem.perfume=this.Perfume;
    this.shoppingItem.phonestand=this.PhoneStand;
  }
  // ancilaryClicked() {
  //   this.dialogRef.close();
  //   var ancilary = new Ancilary;
  //   ancilary.baggage = this.Baggage;
  //   ancilary.shopping = this.Shopping;
  //   ancilary.wheelchair = this.Wheelchair;
  //   //this.ancilaryServiceCliked.next(ancilary);

  // }
  ngOnDestroy(): void {
    console.log("destroy called");
  }

}
