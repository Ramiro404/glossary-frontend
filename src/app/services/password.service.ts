import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HandlerError } from '../utils/HandleError';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private URL_BASE=`${environment.api}/auth`
  constructor(
    private http:HttpClient
  ) { }

  sendEmail(email:string):Observable<string>{
    return this.http.post<string>(`${this.URL_BASE}/recovery`,email).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }

  changePassword(token:string,newPassword:string):Observable<string>{
    return this.http.post<string>(`${this.URL_BASE}/change-password`,{token,newPassword}).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
}
