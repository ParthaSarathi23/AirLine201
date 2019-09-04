import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatSelectModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '@/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AirlineService } from './services/airline.service';
import { PassengerListComponent } from './PassengerDetails/passenger-list/passenger-list.component';
import { AddPassengerComponent } from './PassengerDetails/add-passenger/add-passenger.component';
import { MatRadioModule } from '@angular/material';
import * as $ from 'jquery';
import { PassengerModalComponent } from './PassengerDetails/passenger-modal/passenger-modal.component';
import { SeatAllocationComponent } from './admin/seat-allocation/seat-allocation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';
import { addPassengerDetails } from './reducer/Passenger.reducer';
import { CheckinComponent } from './airline/checkin/checkin.component';
import { InflightComponent } from './airline/inflight/inflight.component';
import { AirlineModalComponent } from './airline/airline-modal/airline-modal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  LinkedinLoginProvider,
} from "angular-6-social-login";
import { FlightEditComponent } from './admin/flight-edit/flight-edit.component';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './helpers';
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
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
    DashboardComponent,
    HeaderComponent,
    PassengerListComponent,
    AddPassengerComponent,
    PassengerModalComponent,
    SeatAllocationComponent,
    CheckinComponent,
    InflightComponent,
    AirlineModalComponent,
    FlightEditComponent

  ],
  imports: [
    NgbModule,
    HttpClientModule,
    TooltipModule.forRoot(),
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
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend:as i dnt have real backend
    //subhalaxmi
    fakeBackendProvider],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
