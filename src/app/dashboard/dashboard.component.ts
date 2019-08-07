import { Component, OnInit } from '@angular/core';
export interface UserType {
  value: string;
  display: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'airline-app';
  selectedValue: string; 
   userTypes: UserType[] = [
      {value: 'login', display: 'Login'}
      
   ];
  constructor() { }

  ngOnInit() {
  }

}
