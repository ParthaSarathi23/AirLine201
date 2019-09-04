import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AirlineService } from '@/services/airline.service';
import { LoggedInStaus } from '@/user/LoggedInStatus';
// import * as $ from "jquery";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
import { Login } from '../Entity/Login';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services';
import { first } from 'rxjs/operators';
import { User, Role } from '@/Entity';

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
  currentUser: User;
  loggedinObject: object;
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  email1: string = '';
  email2 = '';
  loginpassword = '';
  loginpassword2 = '';
  loginpassword3 = '';
  isAvailable = false;
  isSocialLogin = false;
  isDisabled = false;
  password: string;
  name: string;
  title = 'airline-app';
  selectedValue: string;
  loggedinType: string;
  loginInfo: Login[] = [];
  loading = false;
  userTypes: UserType[] = [
    { value: 'login', display: 'Login/SignUp' }

  ];


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private airlineService: AirlineService, private socialAuthService: AuthService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    this.radioData = 'Airline';
    this.isLoggedIn = false;
    this.isAdminLoggedIn = false;

    var loggedInStatus: LoggedInStaus[] = [];

  }
  signuporlogin() {
    $('#modalLRForm').modal('show');

  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isAirline() {
    return this.currentUser && this.currentUser.role === Role.Airline;
  }
  loggedOut() {
    this.authenticationService.logout();
    this.signuporlogin();
    this.currentUser = null;
  }
  login(form: NgForm) {
    this.loading = true;
    this.email1 = form.value.email1;
    this.loginpassword = form.value.loginpassword;
    this.authenticationService.login(this.email1, this.loginpassword)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          $("#modalLRForm").modal('hide');
          this.router.navigate(['admin'], { relativeTo: this.activatedRoute });
        },
        error => {
          // this.error = error;
          // this.loading = false;
          this.loading = false;

          if(error!=="Username or password is incorrect"){
          alert("Please register first");
          }else{
            alert(error);
          }
        });
  }




  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;

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

      }
    );
  }

  signup(form: NgForm) {

    this.email2 = form.value.email2;
    this.loginpassword2 = form.value.loginpassword2;

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
      login.role = this.radioData;
      this.loginInfo.push(login);
      localStorage.setItem('LoginInfo', JSON.stringify(this.loginInfo));
      $('.nav-tabs a:first').tab('show');
      this.email2 = '';
      this.loginpassword2 = '';
      this.loginpassword3 = '';
      this.email1 = '';
      this.loginpassword = '';
    }

  }

}
