import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpEvent, HttpResponse, HttpHandler, HttpRequest, HttpInterceptor, HttpHeaders } from "@angular/common/http";
import { AppService } from './app.service';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private _rs: AppService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this._rs.token) {
            this._rs.token = localStorage.getItem("token");
        }
        if (req.url.includes("/upload/uploadResume")) {
            return next.handle(req);
        }
         let header: HttpHeaders = new HttpHeaders({
            Authorization: "XPrsCRiuDE0HlurNLjjo1dcthtkF7shuAwWu6NyMj2H2NllhMHlMyfzdSfrflZvVvqAXCBBl5BnlTnO0B7mjKodULbIQFUQtHc6GUto9GCJd0jJNi4DGtZFT", 'Content-Type': 'application/json', 'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
        });
        const req1 = req.clone({ headers: header });
        return next.handle(req1).pipe(map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.headers.get('authorization')) {
                        this._rs.token = event.headers.get('authorization');
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