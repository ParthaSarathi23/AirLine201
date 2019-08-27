import { Component, OnInit } from '@angular/core';
import { AirlineService } from './airline.service';
import { Passenger } from './Entity/Passenger';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  constructor(private airlineService:AirlineService){

  }
  ngOnInit(): void {
    localStorage.setItem('passengers', '');
    localStorage.setItem('flight', '');


    localStorage.setItem('passengers', JSON.stringify(this.airlineService.passengerData));
    localStorage.setItem('flight', JSON.stringify(this.airlineService.flightData));

    
  }
  

}
