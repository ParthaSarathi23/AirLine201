import { Component, OnInit } from '@angular/core';
import { AirlineService } from './airline.service';
import { Passenger } from './Entity/Passenger';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private airlineService: AirlineService) {

  }
  ngOnInit(): void {
    var retrievedObject = localStorage.getItem('flight');
    if (retrievedObject == '' || retrievedObject==null) {
      localStorage.setItem('flight', '');
      localStorage.setItem('flight', JSON.stringify(this.airlineService.flightData));        
    }
  }
}
