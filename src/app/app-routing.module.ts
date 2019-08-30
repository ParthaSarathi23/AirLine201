import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { AddPassengerComponent } from './PassengerDetails/add-passenger/add-passenger.component';
import { PassengerListComponent } from './PassengerDetails/passenger-list/passenger-list.component';
import { AdminComponent } from './admin/admin.component';
import { SeatAllocationComponent } from './admin/seat-allocation/seat-allocation.component';
import { CheckinComponent } from './airline/checkin/checkin.component';
import { InflightComponent } from './airline/inflight/inflight.component';
import { FlightEditComponent } from './admin/flight-edit/flight-edit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'seat-allocation', component: SeatAllocationComponent },
  { path: 'add-passenger', component: AddPassengerComponent },
  { path: 'add-passenger/:id', component: AddPassengerComponent },
  { path: 'passenger-list', component: PassengerListComponent },
  { path: 'seat-allocation/:id', component: SeatAllocationComponent },
  { path: 'flight-list', component: CheckinComponent },
  { path: 'in-flight', component: InflightComponent },
  { path: 'passenger-list/:id', component: PassengerListComponent },
  { path: 'flight-edit', component: FlightEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
