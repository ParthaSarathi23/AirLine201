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
import { Login } from '../Entity/Login';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

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

  radioData;

  loggedinObject: object;
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  email1: string='';
  email2='';
  loginpassword='';
  loginpassword2='';
  loginpassword3='';
  isAvailable = false;
  isSocialLogin = false;
  isDisabled = false;
  password: string;
  name: string;
  title = 'airline-app';
  selectedValue: string;
  loggedinType: string;
  loginInfo: Login[] = [];
  userTypes: UserType[] = [
    { value: 'login', display: 'Login/SignUp' }

  ];


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private airlineService: AirlineService, private socialAuthService: AuthService) { }

  ngOnInit() {
    this.radioData = 'airline';
    this.isLoggedIn = false;
    this.isAdminLoggedIn = false;


    this.airlineService.showLogoutEvent.subscribe(
      (string: string[]) => {
        this.name = string[0];
        this.loggedinType = string[1];
        console.log(name);
        var loggedInStatus: LoggedInStaus[] = [];

        if (this.loggedinType === 'airline') {
          this.isLoggedIn = true;
          this.isAdminLoggedIn = false;
          this.name = this.name;
          loggedInStatus.push(new LoggedInStaus('airline', true, this.name));
          localStorage.setItem('loggedIn', '');
          localStorage.setItem('loggedIn', JSON.stringify(loggedInStatus));

        } else if (this.loggedinType === 'admin') {
          this.isLoggedIn = false;
          this.isAdminLoggedIn = true;
          this.name = this.name;
          loggedInStatus.push(new LoggedInStaus('admin', true, this.name));
          localStorage.setItem('loggedIn', '');
          localStorage.setItem('loggedIn', JSON.stringify(loggedInStatus));
        }
      }
    );


    var loggedInStatus: LoggedInStaus[] = [];

    var retrievedObject = localStorage.getItem('loggedIn');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    loggedInStatus = JSON.parse(retrievedObject);
    if (loggedInStatus != null && loggedInStatus.length > 0) {
      if (loggedInStatus[0].user === 'airline' && loggedInStatus[0].isLoggedIn === true) {

        this.isLoggedIn = true;
        this.isAdminLoggedIn = false;
        this.name = loggedInStatus[0].name;

      } else if (loggedInStatus[0].user === 'admin' && loggedInStatus[0].isLoggedIn === true) {
        this.isLoggedIn = false;
        this.isAdminLoggedIn = true;
        this.name = loggedInStatus[0].name;

      } else {
        this.isLoggedIn = false;
        this.isAdminLoggedIn = false;
      }
    } else {
      this.isLoggedIn = false;
      this.isAdminLoggedIn = false;
    }
  }
  signuporlogin() {
    $('#modalLRForm').modal('show');

  }

  login() {

    console.log(this.email1);
    console.log(this.loginpassword);

    var retrievedObject = localStorage.getItem('LoginInfo');
    this.loginInfo = JSON.parse(retrievedObject);
    this.loginInfo.forEach(element => {
      if (this.email1 == element.username && this.loginpassword == element.password) {
        $("#modalLRForm").modal('hide');
        this.router.navigate(['admin'], { relativeTo: this.activatedRoute });
        this.airlineService.showLogout(this.email1, element.userType);
        this.email2 = '';
        this.loginpassword = '';
      }
    });



    // if (this.email == 'subha064@gmail.com' && this.password == 'sonali064') {
    //   console.log("success");
    //   $("#modalLRForm").modal('hide');
    //   this.router.navigate(['flight-list'], { relativeTo: this.activatedRoute });
    //   this.airlineService.showLogout(this.email, 'USER');

    // } else if (this.email == 'partha064@gmail.com' && this.password == 'sonali064') {
    //   console.log("success");
    //   $("#modalLRForm").modal('hide');
    //   this.router.navigate(['flight-edit'], { relativeTo: this.activatedRoute });
    //   this.airlineService.showLogout(this.email, 'ADMIN');

    // } else {
    //   console.log("failed");
    // }
  }

  loggedOut() {
    localStorage.setItem('loggedIn', '');
    this.isLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.name = "";
    this.signuporlogin();
  }

  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    // if(socialPlatform == "facebook"){
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // }
    if (socialPlatform == "google") {

      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // this.gotit=true;
        console.log(socialPlatform + " sign in data : ", userData);
        this.email2 = userData.email;
        this.isSocialLogin = true;
        // if(this.email2.length==0){
        //   this.isDisabled=false;
        //  }else if(this.isSocialLogin && this.email2.length>0){
        //   this.isDisabled=true;
        //  }else{
        //   this.isDisabled=false;
        //  }

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

  signup() {



    var retrievedObject = localStorage.getItem('LoginInfo');
    this.loginInfo = JSON.parse(retrievedObject);
    this.isAvailable = false;
    if (this.loginInfo == null || this.loginInfo == undefined) {
      this.loginInfo = [];
    } else {

      this.loginInfo.forEach(element => {
        if (this.email2 == element.username) {
          this.isAvailable = true;
        }
      });
    }

    if (this.isAvailable) {
      alert("Already LoggedIn:Try using diffrent email");
    } else {
      this.isAvailable = false;
      var login = new Login();
      login.password = this.loginpassword2;
      login.username = this.email2;
      login.userType = this.radioData;
      this.loginInfo.push(login);
      localStorage.setItem('LoginInfo', JSON.stringify(this.loginInfo));
      $('.nav-tabs a:first').tab('show');
      this.email2 = '';
      this.loginpassword2 = '';
      this.loginpassword3 = '';
      this.email1 = '';
      this.loginpassword = '';
    }


    // if (this.email == 'subha064@gmail.com' && this.password == 'sonali064') {
    //   console.log("success");
    //   $("#modalLRForm").modal('hide');
    //   this.router.navigate(['flight-list'], { relativeTo: this.activatedRoute });
    //   this.airlineService.showLogout(this.email, 'USER');

    // } else if (this.email == 'partha064@gmail.com' && this.password == 'sonali064') {
    //   console.log("success");
    //   $("#modalLRForm").modal('hide');
    //   this.router.navigate(['flight-edit'], { relativeTo: this.activatedRoute });
    //   this.airlineService.showLogout(this.email, 'ADMIN');

    // } else {
    //   console.log("failed");
    // }
  }

}
