import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AirlineService } from '../airline.service';
import { LoggedInStaus } from '../user/LoggedInStatus';
// import * as $ from "jquery";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';

declare var $: any;

export interface UserType {
  value: string;
  display: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {


  loggedinObject: object;
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  email: string;
  password: string;
  name: string;
  title = 'airline-app';
  selectedValue: string;
  loggedinType: string;
  userTypes: UserType[] = [
    { value: 'login', display: 'Login/SignUp' }

  ];


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private airlineService: AirlineService,private socialAuthService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = false;
    this.isAdminLoggedIn = false;

    
    this.airlineService.showLogoutEvent.subscribe(
      (string: string[]) => {
        this.name = string[0];
        this.loggedinType = string[1];
        console.log(name);
        var loggedInStatus: LoggedInStaus[] = [];

        if (this.loggedinType === 'USER') {
          this.isLoggedIn = true;
          this.isAdminLoggedIn = false;
          this.name = this.name;
          loggedInStatus.push(new LoggedInStaus('USER', true, this.name));
          localStorage.setItem('loggedIn', '');
          localStorage.setItem('loggedIn', JSON.stringify(loggedInStatus));

        } else if (this.loggedinType === 'ADMIN') {
          this.isLoggedIn = false;
          this.isAdminLoggedIn = true;
          this.name = this.name;
          loggedInStatus.push(new LoggedInStaus('ADMIN', true, this.name));
          localStorage.setItem('loggedIn', '');
          localStorage.setItem('loggedIn', JSON.stringify(loggedInStatus));
        }
      }
    );

    
    var loggedInStatus: LoggedInStaus[] = [];

    var retrievedObject = localStorage.getItem('loggedIn');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    loggedInStatus = JSON.parse(retrievedObject);
    if(loggedInStatus.length>0){
    if (loggedInStatus[0].user === 'USER' && loggedInStatus[0].isLoggedIn === true) {

      this.isLoggedIn = true;
      this.isAdminLoggedIn = false;
      this.name = loggedInStatus[0].name;

    } else if (loggedInStatus[0].user === 'ADMIN' && loggedInStatus[0].isLoggedIn === true) {
      this.isLoggedIn = false;
      this.isAdminLoggedIn = true;
      this.name = loggedInStatus[0].name;

    } else {
      this.isLoggedIn = false;
      this.isAdminLoggedIn = false;
    }
  }else{
    this.isLoggedIn = false;
    this.isAdminLoggedIn = false;
  }
  }
  signuporlogin() {
    $('#modalLRForm').modal('show');

  }
  login(form: NgForm) {
    console.log("sigin");
    this.email = form.value.email1;
    this.password = form.value.loginpassword;

    console.log(this.email);
    console.log(this.password);

    if (this.email == 'subha064@gmail.com' && this.password == 'sonali064') {
      console.log("success");
      $("#modalLRForm").modal('hide');
      this.router.navigate(['flight-list'], { relativeTo: this.activatedRoute });
      this.airlineService.showLogout(this.email, 'USER');

    } else if (this.email == 'partha064@gmail.com' && this.password == 'sonali064') {
      console.log("success");
      $("#modalLRForm").modal('hide');
      this.router.navigate(['flight-edit'], { relativeTo: this.activatedRoute });
      this.airlineService.showLogout(this.email, 'ADMIN');

    } else {
      console.log("failed");
    }
  }

  loggedOut() {
    localStorage.setItem('loggedIn', '');
    this.isLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.name="";
    this.signuporlogin();
  }

  socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    // if(socialPlatform == "facebook"){
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // }
    if(socialPlatform == "google"){
      alert();
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // this.gotit=true;
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
        // this.User.id=userData.id;
        // this.User.name=userData.name;
        // this.User.image=userData.image;
        // this.User.provider=userData.provider;
        //     console.log(userData.image);
          
        //     // console.log(userData.name);

        // console.log(this.User);

      }
    );
  }


}
