import { Component, OnInit, ViewChild } from '@angular/core';
import { Flight } from 'src/app/Entity/Flight';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AirlineService } from 'src/app/airline.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AirlineModalComponent } from '../airline-modal/airline-modal.component';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  displayedColumns = ['id', 'name', 'time', 'passengerno', 'details'];
  // passenger: Passenger[]= ;
  dataSource: MatTableDataSource<Flight>;
  flight: Flight[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private airlineService: AirlineService, private router: Router, public dialog: MatDialog, private store: Store<AppState>) {
    this.flight = this.airlineService.getFlightDetails();
    if (this.flight.length > 0) {
      this.dataSource = new MatTableDataSource(this.flight);
    } else {
      // this.onNoData();
    }
  }


  ngOnInit() {
  }

  onDetailsClicked(row, index) {

    if (row !== null && row.passengerNo !== 0) {
      const dialogRef = this.dialog.open(AirlineModalComponent, {
        width: '650px',
        data: {
          id: +row.id,
          name: row.name,
          time: row.time,
          passengerNo: +row.passengerNo,
          passengerDetails: this.flight[index].passengerDetails
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

}
