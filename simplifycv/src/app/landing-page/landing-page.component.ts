import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goToLogin(){
    window.location.href="http://localhost:4200/login";
  }
  goToRegister(){
    window.location.href="http://localhost:4200/registerUser";
  }
}
