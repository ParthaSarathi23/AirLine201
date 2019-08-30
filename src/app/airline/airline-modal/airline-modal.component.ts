import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Flight } from 'src/app/Entity/Flight';
import { Passenger } from 'src/app/Entity/Passenger';

@Component({
  selector: 'app-airline-modal',
  templateUrl: './airline-modal.component.html',
  styleUrls: ['./airline-modal.component.scss']
})
export class AirlineModalComponent implements OnInit {
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

  constructor(public dialogRef: MatDialogRef<AirlineModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log(data);

    if (data[0] == 0) {

      this.passenger = data.passengerDetails;

      this.passenger.forEach((element, index) => {
        if (element.ischeckedin) {
          this.noOfChckedIn = this.noOfChckedIn + 1;
        }
        if (element.infants) {
          this.noInfants = this.noInfants + element.infants;
        }
        if (element.disability) {
          this.noOfWheeleChair = this.noOfWheeleChair + 1;
        }
      });

    } else if (data[0] == 1) {
      this.Baggage=true;
      this.Wheelchair=true;
      this.Shopping=true;

    } else if (data[0] == 2) {
      this.Veg=true;
      this.NonVeg=true;
      this.CustomisedMeal=false;

    } else if (data[0] == 3) {
      this.Perfume=true;
      this.CardHolder=false;
      this.PhoneStand=false;

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
