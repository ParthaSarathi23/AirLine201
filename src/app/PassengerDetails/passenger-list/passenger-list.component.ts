import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Passenger } from 'src/app/Entity/Passenger';
import { AirlineService } from 'src/app/airline.service';
import { CdkColumnDef } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { PassengerModalComponent } from '../passenger-modal/passenger-modal.component';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'email', 'details', 'edit', 'delete'];
  // passenger: Passenger[]= ;
  dataSource: MatTableDataSource<Passenger>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private airlineService: AirlineService, private router: Router, public dialog: MatDialog,private store: Store<AppState>) {
    const users: Passenger[] = this.airlineService.getPassengerData();
    this.dataSource = new MatTableDataSource(users);
  }

  openDialog(row): void {
    const dialogRef = this.dialog.open(PassengerModalComponent, {
      width: '650px',
      data: {
        name: row.name, email: row.email, passport: row.passport, address: row.address,
        dob: row.dob, disability: row.disability, food: row.food, seatnumber: row.seatnumber,
        ischeckedin: row.ischeckedin, infants: row.infants, ancilarservices: row.ancilarservices
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.e = result;
    });
  }

  onDetailsClicked(row) {
    console.log('Row clicked: ', row);
    // this.router.navigate(['add-passenger/'+ row.id]);
    this.openDialog(row);
  }
  onEditClicked(row) {
    console.log('Row clicked: ', row);
    this.router.navigate(['add-passenger/' + row.id]);

  }
  
  onDeleteClicked(row){
    //var passenger=this.airlineService.getParticularPassengerData(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to delete '+row.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch({
          type: 'REMOVE_PASSENGER',
          payload: <Passenger> {
            id:row.id,
            email: row.email,
            name: row.name,
          }
        });
      //  this.airlineService.deletePassenger(row.id);
        Swal.fire(
          'Deleted!',
          'Passenger Deleted Successfully!!',
          'success'
        )
        const users: Passenger[] = this.airlineService.getPassengerData();
        this.dataSource = new MatTableDataSource(users);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
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
