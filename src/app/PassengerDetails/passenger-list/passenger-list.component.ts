import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Passenger } from '../../Entity/Passenger';
import { AirlineService } from '../../services/airline.service';
import { CdkColumnDef } from '@angular/cdk/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PassengerModalComponent } from '../passenger-modal/passenger-modal.component';
import Swal from 'sweetalert2';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'email', 'details', 'edit', 'delete'];
  id;
  // passenger: Passenger[]= ;
  dataSource: MatTableDataSource<Passenger>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  passengers;

  constructor(private airlineService: AirlineService, private router: Router, public dialog: MatDialog, private store: Store<AppState>,
    private route:ActivatedRoute) {

   
  }

  openDialog(row): void {
    if (row !== null) {
      const dialogRef = this.dialog.open(PassengerModalComponent, {
        width: '650px',
        data: [false,{
          name: row.name, email: row.email, passport: row.passport, address: row.address,
          dob: row.dob, disability: row.disability, food: row.food, seatnumber: row.seatnumber,
          ischeckedin: row.ischeckedin, infants: row.infants, ancilarservices: row.ancilarservices
        }]
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
    localStorage.setItem('ancilary', '');
    localStorage.setItem('passengerInfo', '');

    this.router.navigate(['add-passenger/' + row.id]);
      }
  }
  addPassenger(){
    localStorage.setItem('ancilary', '');

    localStorage.setItem('passengerInfo', '');
    this.router.navigate(['add-passenger/']);
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
        const users: Passenger[] = this.airlineService.getAllPassengerData();
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
        localStorage.setItem('passengerInfo', '');
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


    this.route.params.subscribe(
      (params: Params) => {
        this.id = undefined;
        this.id = params['id'];
        if (this.id !== undefined) {
          const users: Passenger[] = this.airlineService.getPassengerDataOfParticularFlight(+this.id);
          if (users.length > 0) {
            console.log(JSON.stringify(users));
            this.dataSource = new MatTableDataSource(users);
          } else {
            this.onNoData();
          }

        }else{
          const users: Passenger[] = this.airlineService.getAllPassengerData();
          if (users.length > 0) {
            console.log(JSON.stringify(users));
            this.dataSource = new MatTableDataSource(users);
          } else {
            this.onNoData();
          }
        }

      }
    );
  
  }

}
