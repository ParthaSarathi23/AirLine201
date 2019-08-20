import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AirlineService } from '../airline.service';
// import * as $ from "jquery";

declare var $:any;

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
  
  
  isLoggedIn:boolean;
  isAdminLoggedIn:boolean;
  email:string;
  password:string;
  name:string;
  title = 'airline-app';
  selectedValue: string; 
  loggedinType:string;
   userTypes: UserType[] = [
      {value: 'login', display: 'Login/SignUp'}
      
   ];
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
    private airlineService:AirlineService) { }

  ngOnInit() {
    this.isLoggedIn=false;
    this.isAdminLoggedIn=false;
    
    this.airlineService.showLogoutEvent.subscribe(
      (string:string[])=>{
        this.name=string[0];
        this.loggedinType=string[1];
        console.log(name);
        if(this.loggedinType==='USER'){
         this.isLoggedIn=true;
         this.isAdminLoggedIn=false;
        }else if(this.loggedinType==='ADMIN'){
          this.isLoggedIn=false;
          this.isAdminLoggedIn=true;
        }
      }
    );
  }
  signuporlogin(){
    $('#modalLRForm').modal('show');

  }
  login(form:NgForm){
    console.log("sigin");
    this.email=form.value.email1;
    this.password=form.value.loginpassword;
 
    console.log(this.email);
    console.log(this.password);

    if(this.email=='subha064@gmail.com' && this.password=='sonali064'){
      console.log("success");
      $("#modalLRForm").modal('hide');
      this.router.navigate(['login'],{relativeTo:this.activatedRoute});
      this.airlineService.showLogout(this.email,'USER');

    }else if(this.email=='partha064@gmail.com' && this.password=='sonali064'){
      console.log("success");
      $("#modalLRForm").modal('hide');
      this.router.navigate(['admin'],{relativeTo:this.activatedRoute});
      this.airlineService.showLogout(this.email,'ADMIN');

    }else{
      console.log("failed");
    }
  }
}
