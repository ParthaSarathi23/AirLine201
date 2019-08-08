import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatSelectModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCheckboxModule } from  '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AirlineService } from './airline.service';
import { PassengerListComponent } from './PassengerDetails/passenger-list/passenger-list.component';
import { AddPassengerComponent } from './PassengerDetails/add-passenger/add-passenger.component';
import { MatRadioModule } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    PassengerListComponent,
    AddPassengerComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
 	AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule
  ],
  providers: [AirlineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
