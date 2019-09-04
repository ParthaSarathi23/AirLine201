import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Passenger } from '@/Entity/Passenger';
import { Ancilary } from '@/Entity/Ancilary';

export interface data {
  shopping: string;
  wheelchair: string;
  baggage: string;
}

@Component({
  selector: 'app-passenger-modal',
  templateUrl: './passenger-modal.component.html',
  styleUrls: ['./passenger-modal.component.scss']
})

export class PassengerModalComponent implements OnInit {

  bag = "0";
  chairCount = "0";
  shoppingCount = "0";

  baggeges: string[];
  shoppings = [];
  chairs: string[];
  ancilary: Ancilary;
  ancilaryService: boolean

  showBaggage;
  showShopping;
  showWheelchair;

  constructor(public dialogRef: MatDialogRef<PassengerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log(data);
    this.baggeges = ['5 kg', '10 kg', '15 kg', '20 kg'];
    // this.shoppings = ['shoping 1', 'shoping 2'];
    this.chairs = ['1', '2'];

    if (data[0] === true) {
      this.ancilaryService = true;
    } else {
      this.ancilaryService = false;
    }

    if (this.ancilaryService) {
      if ((data[1] === null || data[1] === undefined)) {
        this.showBaggage = true;
        this.showWheelchair = true;
        this.showShopping = true;
      } else {
        this.showBaggage = data[1].baggage;
        this.showWheelchair = data[1].wheelchair;
        this.showShopping = data[1].shopping;
      }


      if (this.ancilaryService && (data[2] != null && data[2] != undefined)) {
        this.bag = data[2].baggage;
        this.chairCount = data[2].wheelchair;
        this.shoppingCount = data[2].shopping;

        if(this.bag==undefined){
          this.bag="0";
        }
        if(this.chairCount==undefined){
          this.chairCount="0";
        }
        if(this.shoppingCount==undefined){
          this.shoppingCount="0";
        }

      }
      

      if (data[3].length == 0) {
        this.shoppings = ['Perfume', 'CardHolder', "PhoneStand"];
      } else {
        data[3].forEach(element => {

          this.shoppings.push(element);


        });

      }
    }
  }





  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  onBagChange(newObj: any) {
    this.bag = newObj;
  }
  onchairChange(newObj: any) {
    this.chairCount = newObj;
  }
  onshoppingChange(newObj: any) {
    this.shoppingCount = newObj;
  }
  submit() {
    this.ancilary = new Ancilary();
    this.ancilary.baggage = this.bag;
    this.ancilary.shopping = this.shoppingCount;
    this.ancilary.wheelchair = this.chairCount;


    console.log(JSON.stringify(this.ancilary));
    localStorage.setItem('ancilary', JSON.stringify(this.ancilary));
    this.dialogRef.close();
  }
}
