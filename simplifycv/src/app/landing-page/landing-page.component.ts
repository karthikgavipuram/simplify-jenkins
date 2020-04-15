import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private _cs:AppService) { }

  ngOnInit() {
  }
}
