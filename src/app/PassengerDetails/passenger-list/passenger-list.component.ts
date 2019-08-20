import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Passenger } from 'src/app/Entity/Passenger';
import { AirlineService } from 'src/app/airline.service';
import { CdkColumnDef } from '@angular/cdk/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'email','details', 'edit','delete'];
  // passenger: Passenger[]= ;
  dataSource: MatTableDataSource<Passenger>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private airlineService:AirlineService,private router:Router){ 
    const users: Passenger[] = this.airlineService.getPassengerData();
    this.dataSource = new MatTableDataSource(users);
  }

  onDetailsClicked(row) {
    console.log('Row clicked: ', row);
    this.router.navigate(['add-passenger/'+ row.id]);
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
