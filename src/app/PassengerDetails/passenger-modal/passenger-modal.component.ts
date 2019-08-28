import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Passenger } from 'src/app/Entity/Passenger';
import { Ancilary } from 'src/app/Entity/Ancilary';

export interface data {
  shopping: string;
  wheelchair: string;
  baggage:string;
}

@Component({
  selector: 'app-passenger-modal',
  templateUrl: './passenger-modal.component.html',
  styleUrls: ['./passenger-modal.component.scss']
})

export class PassengerModalComponent implements OnInit {

  bag="0";
  chairCount="0";
  shoppingCount="0";
  baggeges: string[];
  shoppings: string[];
  chairs: string[];
  ancilary:Ancilary;
  ancilaryService:boolean

  constructor(public dialogRef: MatDialogRef<PassengerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log(data);
    this.baggeges = ['5 kg', '10 kg', '15 kg', '20 kg'];
    this.shoppings = ['shoping 1', 'shoping 2'];
    this.chairs = ['1', '2'];
    if(data[0]===true){
      this.ancilaryService=true;
      if(data[1]===null || data[1]===undefined){
      }else{
        console.log(data[1]);
      this.bag=data[1].baggage;
      this.chairCount=data[1].wheelchair;
      this.shoppingCount=data[1].shopping;
      console.log(this.shoppingCount);
      }
    }else{
      this.ancilaryService=false;
    }
  
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  onBagChange(newObj: any){
    this.bag=newObj;
  }
  onchairChange(newObj: any){
    this.chairCount=newObj;
  }
  onshoppingChange(newObj: any){
    this.shoppingCount=newObj;
  }
  submit(){
     this.ancilary=new Ancilary();
     this.ancilary.baggage=this.bag;
     this.ancilary.shopping=this.shoppingCount;
     this.ancilary.wheelchair=this.chairCount;


     console.log(JSON.stringify(this.ancilary));
    localStorage.setItem('ancilary',JSON.stringify(this.ancilary));
    this.dialogRef.close();
  }
}
