import { Component, OnInit } from '@angular/core';
import { AirlineService } from '@/services/airline.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Passenger } from '@/Entity/Passenger';
import { element } from '@angular/core/src/render3';
import { Seat } from '@/Entity/Seat';

@Component({
  selector: 'app-inflight',
  templateUrl: './inflight.component.html',
  styleUrls: ['./inflight.component.scss']
})
export class InflightComponent implements OnInit {
  flights = [];
  selectedDeviceObj;
  flightname;
  flight;
  depaturetime;
  arrivaltime;
  flightNo = "0";
  serviceitem = "0";
  id;
  passengerData: Passenger[];
  vegfoods = [];
  nonvegfoods = [];
  shopping = [];
  availableSeats = [];
  ancilaryservice = [];
  private seatConfig: any = null;
  private seatmap = [];
  totalseats = [];
  value;

  services = [];
  notBookedSeats = [];
  private seatChartConfig = {
    showRowsLabel: true,
    showRowWisePricing: false,
    newSeatNoForRow: true

  }
  private cart = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };
  constructor(private airlineService: AirlineService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.flights = this.airlineService.getFlightsData();
    this.selectedDeviceObj = this.flights[1];
    this.services = ['Veg','NonVeg', 'shopping'];


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
      console.log(this.seatmap);
    }
  }
  public blockSeats(totalAvailableSeats:string[],seatsToBlockArr: string[], string) {

    if (totalAvailableSeats.length > 0) {
      for (let index = 0; index < totalAvailableSeats.length; index++) {
        var seat = totalAvailableSeats[index] + "";
        var seatSplitArr = seat.split('_');
        console.log("Split seat: ", seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
           
            if (seatObj) {
              seatObj["status"] = "available";
              this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              console.log("\n\n\nSeat Obj", seatObj);
              console.log(this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
              break;
            }

          }
      }  
    }

    }

    if (seatsToBlockArr.length > 0) {
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split(' ');
        console.log("Split seat: ", seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
           
            if (seatObj) {
              console.log("\n\n\nFount Seat to block: ", seatObj);
              if (string === 'Veg') {
                seatObj["status"] = "veg";
              } else if (string === 'NonVeg') {
                seatObj["status"] = "nonveg";
              } else if (string === 'shopping') {
                seatObj["status"] = "shopping";
              }else if(string === 'unavailable'){
                seatObj["status"] = "unavailable";
              }else{
                seatObj["status"] = "available";
              }
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
  public selectSeat(seatObject: Seat) {

    console.log("Seat to block: ", seatObject);
    if (seatObject.status == "available") {
      if (this.cart.selectedSeats.length == 0) {
        seatObject.status = "booked";
        this.cart.selectedSeats.push(seatObject.seatLabel);
        this.cart.seatstoStore.push(seatObject.key);
        //this.cart.totalamount += seatObject.price;
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
        //this.cart.totalamount -= seatObject.price;
      }

    }
  }
  onItemChange(newObj: any) {
    this.vegfoods = [];
    this.nonvegfoods = [];
    this.shopping = [];
    this.totalseats = [];
    this.availableSeats = [];
    this.totalseats=[];
    
    this.flightname = newObj;
    this.flight = this.airlineService.getParticularFlightDetails(newObj);
   
    this.depaturetime = this.flight.depaturetime;
    this.arrivaltime = this.flight.arrivaltime;
    this.id = this.flight.id;
    this.passengerData = this.airlineService.getPassengerDataOfParticularFlight(this.id);
    this.passengerData.forEach(element => {

      if (element.food === 'Veg') {
        this.vegfoods.push(element.seatnumber);
      } else if (element.food === 'NonVeg') {
        this.nonvegfoods.push(element.seatnumber);
      }

      if (element.ancilarservices != undefined) {
        if (element.ancilarservices.shopping != '') {
          this.shopping.push(element.seatnumber);
        }
      }

      if (element.seatnumber != undefined) {
        this.availableSeats.push(element.seat.key);
      }
    });
    this.seatmap.forEach(seatmap =>
      seatmap.seats.forEach(element => {
        this.totalseats.push(element);
      }));

    this.getNotBookedSeats(this.availableSeats);
  }
  getNotBookedSeats(seats) {
   // this.availableSeats=seats;
    var result = [];
    var finalList=[];
    this.totalseats.reduce(function (acc, seat) {
      if (seats.indexOf(seat.key) === -1) {
        acc.push(seat);
      }
      return result;
    }, result);
    console.log(result);

    result.forEach(element => {
      finalList.push(element.seatLabel);
    });
  
    this.blockSeats(seats,finalList, 'unavailable');
    
    if (this.value === 'Veg') {
      if(this.vegfoods.length>0){
        this.blockSeats(seats,this.vegfoods, 'Veg');
      }
    }else  if (this.value === 'NonVeg') {
      if(this.nonvegfoods.length>0){
        this.blockSeats(seats,this.nonvegfoods, 'NonVeg');

      }
    } else if(this.value==='shopping') {
      if(this.shopping.length>0){
        this.blockSeats(seats,this.shopping, 'shopping');

      }
     
  }
  }

  onServiceItemChange(newObj: any) {
    this.value=newObj;
  //  this.blockSeats(this.availableSeats,'available');
    if (this.value === 'Veg') {
      if(this.vegfoods.length>0){
        this.blockSeats(this.availableSeats,this.vegfoods, 'Veg');
      }
    
    }else if (this.value === 'NonVeg') {
    if(this.nonvegfoods.length>0){
        this.blockSeats(this.availableSeats,this.nonvegfoods, 'NonVeg');

      }
    } else if(this.value==='shopping') {
      if(this.shopping.length>0){
        this.blockSeats(this.availableSeats,this.shopping, 'shopping');

      }
     
  }
  }
}
