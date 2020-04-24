import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
cvDetails:any;
userObject:any;
  constructor(private _cs:AppService) { }

  ngOnInit() {
    if(!this._cs.userDetails || !this._cs.userDetails.id){
      this._cs.getcookie().subscribe(
        (res:any)=>{
          if(res.token) localStorage.setItem('token',res.token)
          this._cs.setUserDetails();
          this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
            this.cvDetails=res.body.data[0].cvdetails.builderDetails;
            this.userObject=res.body.data[0];
            console.log(this.cvDetails);
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
        console.log(this.cvDetails);
        this.userObject=res.body.data[0];
      });
    }
  }
}
