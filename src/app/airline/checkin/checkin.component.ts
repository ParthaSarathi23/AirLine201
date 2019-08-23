import { Component, OnInit, ViewChild } from '@angular/core';
import { Flight } from 'src/app/Entity/Flight';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AirlineService } from 'src/app/airline.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  displayedColumns = ['id', 'name', 'time','passengerno', 'details'];
  // passenger: Passenger[]= ;
  dataSource: MatTableDataSource<Flight>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private airlineService: AirlineService, private router: Router, public dialog: MatDialog, private store: Store<AppState>) {
    const flight: Flight[] = this.airlineService.getFlightDetails();
    if (flight.length > 0) {
      this.dataSource = new MatTableDataSource(flight);
    } else {
     // this.onNoData();
    }
  }


  ngOnInit() {
  }

}
