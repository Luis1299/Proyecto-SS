import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _storageService: StorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._storageService.getCurrentToken()
    if(token){
      request = request.clone({ headers: request.headers.set('Authorization', "Bearer " + token) })
    }
    if(!request.headers.has('Content-Type')){
        request = request.clone({ headers:  request.headers.set('Content-Type', 'application/json') })
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') })

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let error = ""
        console.log(err)
        if(err.status == 0){
          alert("Se ha perdido la conexion con el servidor")
          location.reload()
        }else{
          if(err.status == 401){
            this._storageService.removeSession()
            alert("La session ha expirado o no es valida")
            location.reload()
          }
        }
        return throwError(error)
      })
    );
  }
}
