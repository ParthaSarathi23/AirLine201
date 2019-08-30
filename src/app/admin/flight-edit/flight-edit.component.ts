import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Flight } from 'src/app/Entity/Flight';
import { AirlineService } from 'src/app/airline.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AirlineModalComponent } from 'src/app/airline/airline-modal/airline-modal.component';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit {

  displayedColumns = ['ID', 'Name', 'ArrivalTime', 'DepatureTime', 'AncilaryServices', 'Meal','ShoppingItems'];
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
    } else {
      alert("No Passengers,So no details found");
    }
  }
  onPassengerListClicked(row, index) {
    if (row !== null && row.passengerNo !== 0) {
      this.router.navigate(['passenger-list/' + row.id]);
    }else{
      alert("No Passengers,So no details found");
    }
  }
}
