import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Passenger } from 'src/app/Entity/Passenger';

@Component({
  selector: 'app-passenger-modal',
  templateUrl: './passenger-modal.component.html',
  styleUrls: ['./passenger-modal.component.scss']
})
export class PassengerModalComponent implements OnInit {

  bag = 0;
  chair = 0;
  shopping = 0;
  baggeges: string[];
  shoppings: string[];
  chairs: string[];

  constructor(public dialogRef: MatDialogRef<PassengerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Passenger) {
    console.log(data);
    this.baggeges = ['5 kg', '10 kg', '15 kg', '20 kg'];
    this.shoppings = ['shooping 1', 'shopping 2'];
    this.chairs = ['1', '2'];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
