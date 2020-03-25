import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _cs:AppService,private r:Router) { }

  ngOnInit() {
    if(!this._cs.userDetails || !this._cs.userDetails.id){
      this._cs.getcookie().subscribe(
        (res:any)=>{
          if(res.token) localStorage.setItem('token',res.token)
          this._cs.setUserDetails()
        },
        (err)=>{
          console.log('error in getcookie()')
        }
      )
    }
  }

  logout(){
    this._cs.logout().subscribe(
      (res:any)=>{
        localStorage.clear()
        window.location.reload()
      },
      (err:any)=>{}
    )
  }

}
