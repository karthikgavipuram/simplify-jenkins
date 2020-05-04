import { Component, OnInit } from '@angular/core';
import { AppService } from '@root/app.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  name='shruthi Thejashwini'
  role='software developer'
  cvDetails:any;
  myAngularxQrCode:string=null;
  constructor(private _cs:AppService) { 
    this.myAngularxQrCode = 'facebook.com';
  }

  ngOnInit(){
    if(!this._cs.userDetails || !this._cs.userDetails.id){
      this._cs.getcookie().subscribe(
        (res:any)=>{
          if(res.token) localStorage.setItem('token',res.token)
          this._cs.setUserDetails();
          this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
            this.cvDetails=res.body.data[0].cvdetails.builderDetails;
            console.log(this.cvDetails)
          });
        },
        (err)=>{
          console.log('error in getcookie()')
        }
      )
    }
    else{
      this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
        this.cvDetails=res.body.data[0].cvdetails.builderDetails;
      });
    }
  }

}
