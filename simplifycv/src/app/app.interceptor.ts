import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpHeaders, HttpResponse } from "@angular/common/http";
import { AppService } from './app.service';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class apphttpinterceptor implements HttpInterceptor {
    constructor(private _serv: AppService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this._serv.token) {
            this._serv.token = localStorage.getItem("token");
        }
        let header: HttpHeaders = new HttpHeaders({
            Authorization: this._serv.token, 'Content-Type': 'application/json', 'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
        });
        const req1 = req.clone({ headers: header });
        return next.handle(req1).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.headers.get('authorization')) {
                    this._serv.token = event.headers.get('authorization');
                    localStorage.setItem("token", event.headers.get('authorization'));
                }
            }
            return event
        }),
        catchError(this.handleError)
    )

    }

    private handleError(error: Response) {
        if (error.status == 403) {
            localStorage.clear();
            window.location.href = "login?emsg=session Expired";
        } else {
            return throwError(error || 'Server error');
        }
    }
}

