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
  passengers;

  constructor(private airlineService: AirlineService, private router: Router, public dialog: MatDialog, private store: Store<AppState>) {

    const users: Passenger[] = this.airlineService.getPassengerData();
    if (users.length > 0) {
      this.dataSource = new MatTableDataSource(users);
    } else {
      this.onNoData();
    }
  }

  openDialog(row): void {
    if (row !== null) {
      const dialogRef = this.dialog.open(PassengerModalComponent, {
        width: '650px',
        data: {
          name: row.name, email: row.email, passport: row.passport, address: row.address,
          dob: row.dob, disability: row.disability, food: row.food, seatnumber: row.seatnumber,
          ischeckedin: row.ischeckedin, infants: row.infants, ancilarservices: row.ancilarservices
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }
  onDetailsClicked(row) {
    console.log('Row clicked: ', row);
    this.openDialog(row);
  }
  onEditClicked(row) {
    console.log('Row clicked: ', row);
    if(row.id===1 ||row.id===2|| row.id===3||row.id===4){
      alert("Couldnt able to edit,as these are default data");
      }else{
    this.router.navigate(['add-passenger/' + row.id]);
      }
  }

  onDeleteClicked(row) {
    if(row.id===1 ||row.id===2|| row.id===3||row.id===4){
    alert("Couldnt able to delete,as these are default data");
    }else{
    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to delete ' + row.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {

      if (result.value) {
        this.airlineService.removePassengerFromFlight(row.id);
        this.store.dispatch({
          type: 'REMOVE_PASSENGER',
          payload: <Passenger>{
            id: row.id,
            email: row.email,
            name: row.name,
          }
        });
        Swal.fire(
          'Deleted!',
          'Passenger Deleted Successfully!!',
          'success'
        )
        const users: Passenger[] = this.airlineService.getPassengerData();
        if (users.length > 0) {
          this.dataSource = new MatTableDataSource(users);
        } else {
          this.onNoData();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
  }
  }

  onNoData() {
    Swal.fire({
      title: 'No Data Found!',
      text: 'Do you want to add new Passenger',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['add-passenger']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {

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
