import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatSelectModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
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
import * as $ from 'jquery';
import { PassengerModalComponent } from './PassengerDetails/passenger-modal/passenger-modal.component';
import { AdminComponent } from './admin/admin.component';
import { SeatAllocationComponent } from './admin/seat-allocation/seat-allocation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';
import { addPassengerDetails } from './reducer/Passenger.reducer';
import { CheckinComponent } from './airline/checkin/checkin.component';
import { InflightComponent } from './airline/inflight/inflight.component';
import { AirlineModalComponent } from './airline/airline-modal/airline-modal.component';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
} from "angular-6-social-login";
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        // {
        //   id: FacebookLoginProvider.PROVIDER_ID,
        //   provider: new FacebookLoginProvider("Your-Facebook-Client-Id")
        // },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("4207341406-v5u4ea4gsfj7fi5mf52faomeu48bs9s0.apps.googleusercontent.com")
        },
          {
            id: LinkedinLoginProvider.PROVIDER_ID,
            provider: new LinkedinLoginProvider("")
          },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    PassengerListComponent,
    AddPassengerComponent,
    PassengerModalComponent,
    AdminComponent,
    SeatAllocationComponent,
    CheckinComponent,
    InflightComponent,
    AirlineModalComponent

  ],
  imports: [
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    NgbModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    //   AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    BrowserModule,
    SocialLoginModule,
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
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    StoreModule.forRoot({ passenger: addPassengerDetails }),

  ],
  entryComponents: [PassengerModalComponent, AirlineModalComponent],

  providers: [AirlineService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
