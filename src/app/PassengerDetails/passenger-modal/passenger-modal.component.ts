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

  bag;
  chair;
  shopping;
  baggeges: string[];
  shoppings: string[];
  chairs: string[];
  ancilary:Ancilary;
  ancilaryService:boolean

  constructor(public dialogRef: MatDialogRef<PassengerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log(data);
    if(data[0]===true){
      this.ancilaryService=true;
      if(data[1]===null || data[1]===undefined){
      }else{
      this.bag=data[1].baggage;
      this.chair=data[1].wheelchair;
      this.shopping=data[1].baggage;
      }
    }else{
      this.ancilaryService=false;
    }
    this.baggeges = ['5 kg', '10 kg', '15 kg', '20 kg'];
    this.shoppings = ['shooping 1', 'shopping 2'];
    this.chairs = ['1', '2'];
    
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
    this.chair=newObj;
  }
  onshoppingChange(newObj: any){
    this.shopping=newObj;
  }
  submit(){
     this.ancilary=new Ancilary();
     this.ancilary.baggage=this.bag;
     this.ancilary.shopping=this.shopping;
     this.ancilary.wheelchair=this.chair;


    localStorage.setItem('ancilary',JSON.stringify(this.ancilary));
    this.dialogRef.close();
  }
}
