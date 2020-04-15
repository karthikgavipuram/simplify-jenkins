import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  file:any
  userDetails:any = {}
  cvDetails:any = {}

  constructor(private _cs:AppService,private r:Router) { }

  ngOnInit() {
    if(!this._cs.userDetails || !this._cs.userDetails.id){
      this._cs.getcookie().subscribe(
        (res:any)=>{
          if(res.token) localStorage.setItem('token',res.token)
          this._cs.setUserDetails();
          this.getData()
        },
        (err)=>{
          console.log('error in getcookie()')
        }
      )
    }else this.getData()
  }

  getData(){
    let query = { userId: this._cs.userDetails.id, deleted: false}
    let search = {
      query:query,
      collection:'user'
    }
    this._cs.getData(search).subscribe(
      (res:any)=>{
        this.userDetails = res.data[0]
        this.cvDetails = this.userDetails.cvdetails
      },
      (err)=>{

      }
    )
  }

  async onSubmit(){
    let details:any = {
      userId:null,
      updateFields:{}
    }
    details.userId = this.userDetails.userId
    details.updateFields.cvdetails = this.cvDetails
    if(this.file){
      let formdata = new FormData()
      formdata.append('file',this.file)
      formdata.append('userId',this.userDetails.userId.toString())
      details.updateFields.cvdetails.cv_dl_url = await this.uploadFile(formdata)
    }
    this._cs.updateUser(details).subscribe(
      (res:any)=>{
        alert('Profile updated successfully')
        this.r.navigate(['/home'])
      },
      (err:any)=>{

      }
    )
  }

  uploadFile(val){
    return new Promise((resolve,reject)=>{
      this._cs.uploadFile(val,'/upload/uploadResume').subscribe(
        (res:any)=>{
          resolve(res.downloadUrl)
        },
        (err:any)=>{
          reject()
        }
      )
    })
  }

  goHome(){
    this.r.navigate(['/home'])
  }

  filechange(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
  }

}
