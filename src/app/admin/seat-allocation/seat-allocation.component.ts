import { Component, OnInit } from '@angular/core';
import { AirlineService } from '@/services/airline.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PassengerDataClass } from '@/Entity/PassengerDataClass';
import { Seat } from '@/Entity/Seat';
import { Passenger } from '@/Entity/Passenger';

@Component({
  selector: 'app-seat-allocation',
  templateUrl: './seat-allocation.component.html',
  styleUrls: ['./seat-allocation.component.scss']
})
export class SeatAllocationComponent implements OnInit {

  constructor(private airlineService: AirlineService, private router: Router, private route: ActivatedRoute) { }

  seat: string = "";
  private seatConfig: any = null;
  private seatmap = [];
  private passengerSeatData = [];
  private id = 0;
  seatObj;
  substring=[];
  array=[];
  isEditmode:boolean;
  seatArray=[];
  private seatChartConfig = {
    showRowsLabel: true,
    showRowWisePricing: false,
    newSeatNoForRow: true

  }
  passengerData: PassengerDataClass;
  passengerDataOfFlight:Passenger[];
  private cart = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };


  title = 'Airline Booking';


  ngOnInit(): void {
    this.isEditmode=false;

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id !== undefined) {
             this.isEditmode=true;
        } else {
          this.isEditmode=false;
        }
      });

   

    //Process a simple bus layout
    this.seatConfig = [
      {
        "seat_price": 250,
        "seat_map": [
          {
            "seat_label": "F",
            "layout": "gggggggggg",
            "available": "available",
          },
          {
            "seat_label": "E",
            "layout": "gggggggggg",
            "available": "not available",
          },
          {
            "seat_label": "D",
            "layout": "gggggggggg"
          },
          {
            "seat_label": "",
            "layout": ""
          },
          {
            "seat_label": "",
            "layout": ""
          },

          {
            "seat_label": "C",
            "layout": "gggggggggg"
          },
          {
            "seat_label": "B",
            "layout": "gggggggggg"
          },
          {
            "seat_label": "A",
            "layout": "gggggggggg"
          }
        ]
      }
    ]

    this.processSeatChart(this.seatConfig);

   
    var retrievedObject = localStorage.getItem('passengerInfo');
    this.passengerData = JSON.parse(retrievedObject);
    this.passengerDataOfFlight=this.airlineService.getPassengerDataOfParticularFlightName(this.passengerData.flight);
    

    this.passengerDataOfFlight.forEach(element => {
      this.seatArray.push(element.seat.key);
    });

    if(this.seatArray!=undefined && this.seatArray.length!=0){
      this.blockSeats(this.seatArray);
    }
    // this.seatObj = new Seat();
    // this.seatObj.seatNo = this.passengerData.seat.seatNo;
    // this.seatObj.key = this.passengerData.seat.key;
    // this.seatObj.price = this.passengerData.seat.price;
    // this.seatObj.seatLabel = this.passengerData.seat.seatLabel;
    // this.seatObj.status = this.passengerData.seat.status;
    //this.selectSeat(this.seatObj);

   
    if(this.passengerData.seat!=undefined && 
      this.passengerData.seat.key!=undefined && 
      this.passengerData.seat.key.length!==0){
      this.array.push(this.passengerData.seat.key);
      this.OwnSelectedSeats(this.array);
      this.cart.selectedSeats=this.passengerData.seat.seatLabel;
      this.cart.seatstoStore.push(this.passengerData.seat.key);
    }
   
    this.blockSeats(this.passengerSeatData);
  }

  public processSeatChart(map_data: any[]) {

    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = "";
        var item_map = map_data[__counter].seat_map;

        //Get the label name and price
        row_label = "Row " + item_map[0].seat_label + " - ";
        if (item_map[item_map.length - 1].seat_label != " ") {
          row_label += item_map[item_map.length - 1].seat_label;
        }
        else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += " : Rs. " + map_data[__counter].seat_price;

        item_map.forEach(map_element => {
          var mapObj = {
            "seatRowLabel": map_element.seat_label,
            "seats": [],
            "seatPricingInformation": row_label
          };
          row_label = "";
          var seatValArr = map_element.layout.split('');
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; //Reset the seat label counter for new row
          }
          var totalItemCounter = 1;
          seatValArr.forEach(item => {
            var seatObj = {
              "key": map_element.seat_label + "_" + totalItemCounter,
              "price": map_data[__counter]["seat_price"],
              "status": "available"
            };

            if (item != '_') {
              seatObj["seatLabel"] = map_element.seat_label + " " + seatNoCounter;
              if (seatNoCounter < 10) { seatObj["seatNo"] = "0" + seatNoCounter; }
              else { seatObj["seatNo"] = "" + seatNoCounter; }

              seatNoCounter++;
            }
            else {
              seatObj["seatLabel"] = "";
            }
            totalItemCounter++;
            mapObj["seats"].push(seatObj);
          });
          console.log(" \n\n\n Seat Objects ", mapObj);
          this.seatmap.push(mapObj);

        });
      }


      // for (let __counter = 0; __counter < map_data.length; __counter++) {
      //   var row_label = "";
      //   var rowLblArr = map_data[__counter]["seat_labels"];
      //   var seatMapArr = map_data[__counter]["seat_map"];
      //   for (let rowIndex = 0; rowIndex < rowLblArr.length; rowIndex++) {
      //     var rowItem = rowLblArr[rowIndex];
      //     var mapObj = {
      //       "seatRowLabel" : rowItem,
      //       "seats" : []
      //     };
      //     var seatValArr = seatMapArr[rowIndex].split('');
      //     var seatNoCounter = 1;
      //     var totalItemCounter = 1;
      //     seatValArr.forEach(item => {
      //       var seatObj = {
      //         "key" : rowItem+"_"+totalItemCounter,
      //         "price" : map_data[__counter]["seat_price"],
      //         "status" : "available"
      //       };

      //       if( item != '_')
      //       {
      //         seatObj["seatLabel"] = rowItem+" "+seatNoCounter;
      //         if(seatNoCounter < 10)
      //         { seatObj["seatNo"] = "0"+seatNoCounter; }
      //         else { seatObj["seatNo"] = ""+seatNoCounter; }

      //         seatNoCounter++;
      //       }
      //       else
      //       {
      //         seatObj["seatLabel"] = "";
      //       }
      //       totalItemCounter++;
      //       mapObj["seats"].push(seatObj);
      //     });
      //     console.log(" \n\n\n Seat Objects " , mapObj);
      //     this.seatmap.push( mapObj );
      //     console.log(" \n\n\n Seat Map " , this.seatmap);

      //   }

      // }
    }
  }

  public selectSeat(seatObject: any) {

    console.log("Seat to block: ", seatObject);
    if (seatObject.status == "available") {
      if (this.cart.selectedSeats.length == 0) {
        seatObject.status = "booked";
        this.cart.selectedSeats.push(seatObject.seatLabel);
        this.cart.seatstoStore.push(seatObject.key);
        this.cart.totalamount += seatObject.price;
      } else {
        alert("Already One Seat Selected");
      }
    }
    else if (seatObject.status = "booked") {
      seatObject.status = "available";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }

    }
  }

  public blockSeats(seatsToBlockArr: string[]) {
    if (seatsToBlockArr.length > 0) {
      // var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");
        console.log("Split seat: ", seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log("\n\n\nFount Seat to block: ", seatObj);
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              console.log("\n\n\nSeat Obj", seatObj);
              console.log(this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
              break;
            }

          }
        }

      }
    }

  }

  public OwnSelectedSeats(seatsToBlockArr: string[]) {
    if (seatsToBlockArr!==undefined && seatsToBlockArr.length > 0) {
      // var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");
        console.log("Split seat: ", seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log("\n\n\nFount Seat to block: ", seatObj);
              seatObj["status"] = "booked";
              this.cart.selectedSeats.push(seatObj.seatLabel);
              this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              console.log("\n\n\nSeat Obj", seatObj);
              console.log(this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
              break;
            }

          }
        }

      }
    }

  }
  processBooking() {
    this.seat = "";
    
    // this.airlineService.getSelectedSeats(this.cart.selectedSeats);
    var retrievedObject = localStorage.getItem('passengerInfo');
    this.passengerData = JSON.parse(retrievedObject);
    this.passengerData.seatnumber = this.cart.selectedSeats.toString();
    this.passengerData.id=this.id;

    this.passengerData.seat.key = this.cart.seatstoStore[0];
    this.passengerData.seat.price = this.cart.totalamount;
    this.passengerData.seat.seatLabel = this.cart.selectedSeats;
    this.passengerData.seat.seatNo=this.cart.selectedSeats.toString();
    
    // this.substring= this.cart.seatstoStore[0].toString.split('_');
    // this.passengerData.seat.seatNo=this.substring[1];

    localStorage.setItem('passengerInfo', JSON.stringify(this.passengerData));

    if (this.id !== null && this.id !== undefined) {
      // var passengerData=this.airlineService.getParticularPassengerData(this.id);
      // this.seat=this.cart.selectedSeats.toString();
      // passengerData.seatnumber=this.seat;
      // this.airlineService.updatePassenger(this.id,passengerData);

      this.router.navigate(['add-passenger/' + this.id]);
    } else {
      this.router.navigate(['add-passenger/']);
    }
  }
}
