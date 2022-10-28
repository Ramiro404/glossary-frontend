import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';
import { HandlerError } from '../utils/HandleError';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_BASE = `${environment.api}/users`
  constructor(
    private http:HttpClient
  ) { }

  create(user:Partial<User>):Observable<User>{
    return this.http.post<User>(`${this.URL_BASE}`,user).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  findAll(id:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.URL_BASE}`).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  findOne(id:string):Observable<User>{
    return this.http.get<User>(`${this.URL_BASE}/${id}`).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )}

  delete(id:string):Observable<unknown>{
    return this.http.delete<unknown>(`${this.URL_BASE}/${id}`).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  update(id:string,user:Partial<User>):Observable<User>{
    return this.http.patch<User>(`${this.URL_BASE}/${id}`,user).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
}
