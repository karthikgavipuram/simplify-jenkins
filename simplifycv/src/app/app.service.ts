import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
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
      // this.setUserDetails({});
      this.token=token.newValue;
    })
  }
  setUserDetails(){
    if (localStorage.getItem('token')) {
      this.userDetails = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    }
  }
  getcookie(){
    return this.http.get(this._api + '/getCookie', { responseType: "json", observe: "response" }).pipe(
      map(res => res.body),
      catchError(this.handleError)
    )
  }

  updateUser(val:any){
      return this.http.post(this._api + '/updateUser', val, { responseType: "json", observe: "response" }).pipe(
        map(res => res.body),
        catchError(this.handleError)
      )
  }

  getData(data:any){
    return this.http.post(this._api + '/getData', data,{ responseType: "json", observe: "response" } ).pipe(
      map(res => res.body),
      catchError(this.handleError)
    )
  }

  uploadFile(formdata: any, url: string) {
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
