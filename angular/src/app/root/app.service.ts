import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AppService {
options:any;
token:string;
userDetails:any;
userPriv:any;
customerId:any;
jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, @Inject('apiBase') private _api:string,private router:Router) {
    window.addEventListener('storage',(token)=>{
      this.token=token.newValue;
    })
  }

  setUserDetails(){
    if (localStorage.getItem('token')) {
      this.userDetails = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    }
  }
  
  getcookie(){
    return this.http.get(this._api + '/getCookie', { responseType: 'json' })
  }

  updateUser(val:any){
      return this.http.post(this._api + '/updateUser', val, { responseType: "json", observe: "response" })
  }

  getData(data:any){
    return this.http.post(this._api + '/getData', data,{ responseType: "json", observe: "response" } )
  }

  updateObject(val){
    console.log(val)
    return this.http.post(this._api + '/updateObject', val, { responseType: "json", observe: "response" })
  }

  uploadFile(formdata: any, url: string) {
    let headers = new HttpHeaders({ 'Authorization': localStorage.getItem('token') });
    headers.append('Content-Type', 'application/form-data');
    return this.http.post(this._api + url, formdata, { headers: headers})
  }

  uploadprofileImage(formdata: any, url: string) {
    let headers = new HttpHeaders({ 'Authorization': localStorage.getItem('token') });
    headers.append('Content-Type', 'application/form-data');
    return this.http.post(this._api + url, formdata, { headers: headers})
  }
  
  logout(){
    return this.http.get(this._api + '/logout', { responseType: "json", observe: "response" })
  }

  handleError(error: Response) {
    return throwError(error || 'Server error')
  }
}
