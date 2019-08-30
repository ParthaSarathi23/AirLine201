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

  onAncilaryClicked(row, index) {
    if (row !== null) {
      const dialogRef = this.dialog.open(AirlineModalComponent, {
        width: '650px',
        data: [1,null
        ]
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    } 
  }
  onMealClicked(row, index) {
    if (row !== null) {
      const dialogRef = this.dialog.open(AirlineModalComponent, {
        width: '650px',
        data: [2,null
        ]
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    } 
  }
  onShoppingClicked(row, index) {
    if (row !== null) {
      const dialogRef = this.dialog.open(AirlineModalComponent, {
        width: '650px',
        data: [3,null
        ]
      });
      dialogRef.afterClosed().subscribe(result => {
      });
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
