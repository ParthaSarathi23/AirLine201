import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AirlineService } from '../airline.service';
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
  email:string;
  password:string;
  name:string;
  title = 'airline-app';
  selectedValue: string; 
   userTypes: UserType[] = [
      {value: 'login', display: 'Login/SignUp'}
      
   ];
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
    private airlineService:AirlineService) { }

  ngOnInit() {
    this.isLoggedIn=false;
    this.airlineService.showLogoutEvent.subscribe(
      (name:string)=>{
        this.name=name;
        console.log(name);
         this.isLoggedIn=true;
      }
    );
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
      this.airlineService.showLogout(this.email);
    }else{
      console.log("failed");
    }
  }
}
