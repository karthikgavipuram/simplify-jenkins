import {Response,Headers,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable,Inject} from '@angular/core';
import {Observable}     from 'rxjs';
import{Router} from '@angular/router'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {JwtHelper} from 'angular2-jwt';



@Injectable({
  providedIn: 'root'
})
export class AppService {
options:any;
token:string;
userDetails:any;
userPriv:any;
customerId:any;
jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: HttpClient, @Inject('apiBase') private _api:string,private router:Router) {
    var headers = new Headers({ 'Authorization': localStorage.getItem('token'),'Content-Type': 'application/json'});
    this.options = new RequestOptions({ headers: headers });
    window.addEventListener('storage',(token)=>{
      // this.setUserDetails({});
      this.token=token.newValue;
    })
  }
  setUserDetails(){
    this.userDetails =  this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }
  getcookie(){
    return this.http.get(this._api + '/getCookie', this.options)
  }

  updateUser(val:any){
      return this.http.post(this._api + '/updateUser', val, this.options)
  }

  getData(data:any){
    return this.http.post(this._api + '/getData', data, this.options)
  }

  uploadFile(formdata: any, url: string) {
    let headers = new HttpHeaders({ 'Authorization': localStorage.getItem('token') });
    headers.append('Content-Type', 'application/form-data');
    return this.http.post(this._api + url, formdata, { headers: headers})
  }
  
  logout(){
    return this.http.get(this._api + '/logout', this.options)
  }

  private handleError (error: Response) {
    
    return Observable.throw(error || 'Some error');
  }
}
