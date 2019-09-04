import { Component, OnInit } from '@angular/core';
import { AirlineService } from './services/airline.service';
import { Passenger } from './Entity/Passenger';
import { AuthenticationService } from './services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  currentUser;
  constructor(private airlineService: AirlineService,private authenticationService:AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
    var retrievedObject = localStorage.getItem('flight');
    if (retrievedObject == '' || retrievedObject==null) {
      localStorage.setItem('flight', '');
      localStorage.setItem('flight', JSON.stringify(this.airlineService.flightData));        
    }
  }
}
