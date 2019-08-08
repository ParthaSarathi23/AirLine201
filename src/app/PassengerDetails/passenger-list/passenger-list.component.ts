import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Passenger } from 'src/app/Entity/Passenger';
import { AirlineService } from 'src/app/airline.service';
@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'email', 'passport','address','dob','disability','food','seatnumber','ischeckedin','infants','ancilarservices'];
  // passenger: Passenger[]= ;
  dataSource: MatTableDataSource<Passenger>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private airlineService:AirlineService) { 
    const users: Passenger[] = this.airlineService.getPassengerData();
    this.dataSource = new MatTableDataSource(users);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngOnInit() {
  }

}
