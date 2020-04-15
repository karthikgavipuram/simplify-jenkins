import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private _cs:AppService) { }

  ngOnInit(): void {
  }
  sendMail(){
    this._cs.sendMail().subscribe((res:any)=>{
      console.log(res);
    })
  }
}
