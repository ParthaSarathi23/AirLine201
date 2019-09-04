import { Component, OnInit, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { Flight } from 'src/app/Entity/Flight';
import { AirlineService } from 'src/app/airline.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AirlineModalComponent } from 'src/app/airline/airline-modal/airline-modal.component';
import { Ancilary } from 'src/app/Entity/Ancilary';
import { Meal } from 'src/app/Entity/Meal';
import { ShoppingItem } from 'src/app/Entity/ShoppingItem';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  displayedColumns = ['ID', 'Name', 'ArrivalTime', 'DepatureTime', 'AncilaryServices', 'Meal', 'ShoppingItems'];
  dataSource: MatTableDataSource<Flight>;
  flight: Flight[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private airlineService: AirlineService, private router: Router, public dialog: MatDialog, private store: Store<AppState>) {
    this.flight = this.airlineService.getFlightsData();
    if (this.flight.length > 0) {
      this.dataSource = new MatTableDataSource(this.flight);
    } else {
      // this.onNoData();
    }
  }


  ngOnInit() {
    //   this.airlineMOdalComponent.ancilaryServiceCliked.subscribe(
    //     (ancilary: Ancilary) => {
    //      var baggage = ancilary.baggage;


    //      console.log(baggage);
    // });
  }

  onAncilaryClicked(row, index) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '650px';
    dialogConfig.data = [1, null, row];

    const dialogRef = this.dialog.open(AirlineModalComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
    
      var flight = row;
      if(flight.ancilaryService!==null){
        flight.ancilaryService.baggage = result.baggage;
        flight.ancilaryService.shopping = result.shopping;
        flight.ancilaryService.wheelchair = result.wheelchair;
      }else{
        flight.ancilaryService=new Ancilary();
        flight.ancilaryService.baggage = result.baggage;
        flight.ancilaryService.shopping = result.shopping;
        flight.ancilaryService.wheelchair = result.wheelchair;
      }
      this.airlineService.updateFlightAncilaryData(flight.id,flight.ancilaryService);
    });

  }
  onMealClicked(row, index) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '650px';
    dialogConfig.data = [2, null, row];

    const dialogRef = this.dialog.open(AirlineModalComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
    
      var flight = row;
      if(flight.meal!==null){
        flight.meal.veg = result.veg;
        flight.meal.nonveg = result.nonveg;
        flight.meal.customisedmeal = result.customisedmeal;
      }else{
        flight.meal=new Meal();
        flight.meal.veg = result.veg;
        flight.meal.nonveg = result.nonveg;
        flight.meal.customisedmeal = result.customisedmeal;
      }
      this.airlineService.updateFlightMealData(flight.id,flight.meal);
    });
  }
  onShoppingClicked(row, index) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '650px';
    dialogConfig.data = [3, null, row];

    const dialogRef = this.dialog.open(AirlineModalComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
     
      var flight = row;
      if(flight.shoppingItems!==null){
        flight.shoppingItems.perfume = result.perfume;
        flight.shoppingItems.cardholder = result.cardholder;
        flight.shoppingItems.phonestand = result.phonestand;
      }else{
        flight.shoppingItems=new ShoppingItem();
        flight.shoppingItems.perfume = result.perfume;
        flight.shoppingItems.cardholder = result.cardholder;
        flight.shoppingItems.phonestand = result.phonestand;
      }
      this.airlineService.updateFlightShoppingData(flight.id,flight.shoppingItems);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
