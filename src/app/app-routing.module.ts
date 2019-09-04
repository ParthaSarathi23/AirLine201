import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPassengerComponent } from './PassengerDetails/add-passenger/add-passenger.component';
import { PassengerListComponent } from './PassengerDetails/passenger-list/passenger-list.component';
import { SeatAllocationComponent } from './admin/seat-allocation/seat-allocation.component';
import { CheckinComponent } from './airline/checkin/checkin.component';
import { InflightComponent } from './airline/inflight/inflight.component';
import { FlightEditComponent } from './admin/flight-edit/flight-edit.component';
import { AuthGuard } from './guards';
import { Role } from './Entity';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: DashboardComponent },
  { path: 'admin', component: DashboardComponent },
  { path: 'seat-allocation', component: SeatAllocationComponent,canActivate: [AuthGuard] },
  { path: 'add-passenger', component: AddPassengerComponent,canActivate: [AuthGuard]  },
  { path: 'add-passenger/:id', component: AddPassengerComponent,canActivate: [AuthGuard]  },
  { path: 'passenger-list', component: PassengerListComponent,canActivate: [AuthGuard]  },
  { path: 'seat-allocation/:id', component: SeatAllocationComponent,canActivate: [AuthGuard]  },
  { path: 'flight-list', component: CheckinComponent,canActivate: [AuthGuard],data: { roles: [Role.Airline] }  },
  { path: 'in-flight', component: InflightComponent,canActivate: [AuthGuard] ,data: { roles: [Role.Airline] }  },
  { path: 'passenger-list/:id', component: PassengerListComponent,canActivate: [AuthGuard]  },
  { path: 'flight-edit', component: FlightEditComponent,canActivate: [AuthGuard],data: { roles: [Role.Admin] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
