import { Component, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router'
import { EventEmitter } from 'protractor';
import {DashboardService} from './dashboard.service'
import {AppService} from '@root/app.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Output() section:EventEmitter
  @Output() subsection:EventEmitter
  show:boolean=true;
  showPersonal:boolean = false

  constructor(private r:Router,private _ds:DashboardService,private _as:AppService) { }

  ngOnInit() {
    
  }

  hideOptions(){
    this.show = false
  }

  profilepic:any;
  showPic:boolean
  upload_profilepic(event){
    let formdata = new FormData()
    formdata.append('file',event.target.files[0])
    this._as.uploadprofileImage(formdata,'/upload/uploadProfileImage').subscribe(
      (res:any)=>{

      },
      (err:any)=>{

      }
    )
  }

  navigate(route){
    if(route != 'profilebuilder') this.show = false
    else this.show = true
    this.r.navigate([`/dashboard/${route}`])
  }

  logout(){
    this._as.logout().subscribe(
      (res:any)=>{
        localStorage.clear()
        window.location.reload()
      },
      (err:any)=>{}
    )
  }

  emitSection(section:string){
    this._ds.selectedSection.emit(section)
    if(section == 'Personal Information') this.showPersonal=!this.showPersonal
    else this.showPersonal = false
  }

  emitSubSection(subsection:string){
    this._ds.selectedSubsection.emit(subsection)
  }

}
