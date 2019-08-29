import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/airline.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Passenger } from 'src/app/Entity/Passenger';
import { element } from '@angular/core/src/render3';

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
  ancilaryservice = [];
  private seatConfig: any = null;
  private seatmap = [];
  services = [];
  private seatChartConfig = {
    showRowsLabel: true,
    showRowWisePricing: false,
    newSeatNoForRow: true

  }

  constructor(private airlineService: AirlineService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.flights = this.airlineService.getFlightData();
    this.selectedDeviceObj = this.flights[1];
    this.services = ['foods', 'shoping'];


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
    }
  }
  public blockSeats(seatsToBlockArr: string[], string) {
    if (seatsToBlockArr.length > 0) {
      // var seatsToBlockArr = seatsToBlock.split(',');
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
              } else if (string === 'Nonveg') {
                seatObj["status"] = "nonveg";
              } else if (string === 'shopping') {
                seatObj["status"] = "shopping";
              }
              // seatObj["status"] = "unavailable";
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

  onItemChange(newObj: any) {
    this.vegfoods = [];
    this.nonvegfoods = [];
    this.shopping = [];

    this.flightname = newObj;
    this.flight = this.airlineService.getParticularFlightDetails(newObj);
    var time = this.flight.time;
    this.depaturetime = time;
    this.arrivaltime = time;
    this.id = this.flight.id;
    this.passengerData = this.airlineService.getPassengerDataOfParticularFlight(this.id);
    this.passengerData.forEach(element => {
      if (element.food === 'Veg') {
        this.vegfoods.push(element.seatnumber);
      } else if (element.food === 'Nonveg') {
        this.nonvegfoods.push(element.seatnumber);
      }

      if (element.ancilarservices != undefined) {
        if (element.ancilarservices.shopping != '') {
          this.shopping.push(element.seatnumber);
        }
      }
    });



  }
  onServiceItemChange(newObj: any) {
    if (newObj === 'foods') {
      this.blockSeats(this.vegfoods, 'Veg');
      this.blockSeats(this.nonvegfoods, 'Nonveg');
    } else {
      this.blockSeats(this.shopping, 'shopping');
    }
  }
}
