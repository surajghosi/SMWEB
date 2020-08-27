import { Injectable } from '@angular/core';
// tslint:disable-next-line: import-spacing
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }  from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

       // return next.handle(request);
        return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
            // tslint:disable-next-line: no-debugger
            if (event instanceof HttpResponse && event.status === 200) {
                if (event.body.message !='' && event.body.message !=undefined) {
                    this.toastr.success(event.body.message);
                }
            }
          }),
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 401) {
            // 401 handled in auth.interceptor
            //this.toastr.error(error.message);
            if ( error.error.message != '' && error.error.message != undefined){
                this.toastr.error(error.error.message, '', {
                    timeOut: 3000
                  });
            } else {
                this.toastr.error('Something went wrong. Please try after sometime', '', {
                    timeOut: 3000
                  });
            }
          }
          return throwError(error);
        })
      );
    }
}

