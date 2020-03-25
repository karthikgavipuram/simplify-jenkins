import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AppService } from './app.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SimplifyCV';


  constructor(private _cs:AppService){}


  async ngOnInit(){
    this._cs.getcookie().subscribe(
      (res:any)=>{
        if(res.token) localStorage.setItem('token',res.token)
        this._cs.setUserDetails();
      },
      (err)=>{
        console.log('error in getcookie()')
      }
    )
  }
  
}
