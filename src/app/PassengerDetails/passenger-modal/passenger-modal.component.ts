import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Passenger } from 'src/app/Entity/Passenger';

@Component({
  selector: 'app-passenger-modal',
  templateUrl: './passenger-modal.component.html',
  styleUrls: ['./passenger-modal.component.scss']
})
export class PassengerModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PassengerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Passenger) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  ngOnInit() {
  }

}
