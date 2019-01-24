import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable()
export class Error401Intercepter implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Do whatever you want to do with the Request
    // console.log("Interceptor!");
    // return next.handle(req);
    return next.handle(req).pipe(
      tap(
        event => {
          // console.log(event);
      },
        error => {
            console.log(error.status);
            if (error.status == 0) {
              alert("Fallo la conexion al servidor");
            }
        })
    );
  }
}
