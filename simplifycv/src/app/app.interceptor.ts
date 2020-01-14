import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpHeaders, HttpResponse } from "@angular/common/http";
import { AppService } from './app.service';
import { timeout } from 'rxjs/operators';



@Injectable()
export class apphttpinterceptor implements HttpInterceptor {
    constructor(private _serv: AppService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this._serv.token) {
            this._serv.token = localStorage.getItem("token");
        }
        if (req.url.includes("/upload") || req.url.includes('getCookie')) {
            return next.handle(req).pipe(timeout(3600000))
        }
        let header: HttpHeaders = new HttpHeaders({
            Authorization: this._serv.token, 'Content-Type': 'application/json', 'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
        });
        const req1 = req.clone({ headers: header });
        return next.handle(req1)
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.headers.get('authorization')) {
                        this._serv.token = event.headers.get('authorization');
                        localStorage.setItem("token", event.headers.get('authorization'));
                    }
                }
                return event;
            }).catch(this.handleError)
        // (err:any)=>{
        //     if(err instanceof HttpErrorResponse && err.status == 403){
        //         this._serv.token="";
        //         localStorage.clear();
        //         window.location.href="login?emsg=session Expired";
        //     }
        // })

    }

    private handleError(error: Response) {
        if (error.status == 403) {
            localStorage.clear();
            window.location.href = "login?emsg=session Expired";
        } else {
            return Observable.throw(error || 'Server error');
        }
    }
}

