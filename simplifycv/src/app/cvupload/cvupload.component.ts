import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cvupload',
  templateUrl: './cvupload.component.html',
  styleUrls: ['./cvupload.component.scss']
})
export class CvuploadComponent implements OnInit {

  file:any
  userDetails:any = {}
  cv_dl_url:any

  constructor(private _cs:AppService,private r:Router) { }

  ngOnInit() {
    if(!this._cs.userDetails || !this._cs.userDetails.id){
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

  async onSubmit(){
    if(!this.file) return 
    let formdata = new FormData()
    formdata.append('file',this.file)
    formdata.append('userId',this._cs.userDetails.id.toString())
    let resp:any 
    try{
      resp = await this.uploadFile(formdata)
    }
    catch(e){
      console.log(JSON.stringify(e))
    }  
    if (resp.downloadPath) {
      let details = {
        userId: 1,
        updateFields: {
          cvdetails: { name: resp.org_name, downloadPath: resp.downloadUrl, parsedCv : resp.parsedCv, builder: resp.builder}
        }
      }
      this._cs.updateUser(details).subscribe(
        (res: any) => {
          alert('CV processed successfully!')
          this.r.navigate(['/profilebuilder'])
        },
        (err: any) => {

        }
      )
    }
  }

  gotobuilder(){
    this.r.navigate(['./profilebuilder'])
  }

  uploadFile(val){
    return new Promise((resolve,reject)=>{
      this._cs.uploadFile(val,'/upload/uploadResume').subscribe(
        (res:any)=>{
          resolve(res)
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
  }

}
