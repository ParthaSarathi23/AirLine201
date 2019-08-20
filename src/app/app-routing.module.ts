import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { AddPassengerComponent } from './PassengerDetails/add-passenger/add-passenger.component';
import { PassengerListComponent } from './PassengerDetails/passenger-list/passenger-list.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'add-passenger',component:AddPassengerComponent},
  { path : 'add-passenger/:id', component : AddPassengerComponent},
  {path:'passenger-list',component:PassengerListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
