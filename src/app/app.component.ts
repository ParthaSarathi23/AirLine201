import { Component, OnInit } from '@angular/core';
import { AirlineService } from './airline.service';
import { Passenger } from './Entity/Passenger';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  passengers;
  ngOnInit(): void {
   
  }
  constructor(private airlineService: AirlineService) {
    this.airlineService.addUser().then(res => {
      /*do something here....maybe clear the form or give a success message*/
    });
      ;


  }

}
