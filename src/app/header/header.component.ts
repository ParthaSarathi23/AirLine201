import { Component, OnInit } from '@angular/core';
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
  title = 'airline-app';
  selectedValue: string; 
   userTypes: UserType[] = [
      {value: 'login', display: 'Login/SignUp'}
      
   ];
  constructor() { }

  ngOnInit() {
  }

}
