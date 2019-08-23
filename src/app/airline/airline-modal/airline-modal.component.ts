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

  noOfChckedIn:number=0;
  noOfWheeleChair:number=0;
  noInfants:number=0;

  constructor(public dialogRef: MatDialogRef<AirlineModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Flight) {
    console.log(data);
    this.passenger = data.passengerDetails;
    
    this.passenger.forEach((element,index) => {
             if(element.ischeckedin){
               this.noOfChckedIn=this.noOfChckedIn+1;
             }
             if(element.infants){
              this.noInfants=this.noInfants+element.infants;
            }
            if(element.disability){
              this.noOfWheeleChair=this.noOfWheeleChair+1;
            }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
