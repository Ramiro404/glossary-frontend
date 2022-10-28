import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/Auth.model';
import { User } from '../models/User.model';
import { HandlerError } from '../utils/HandleError';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private BASE_URL= `${environment.api}/auth`;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();
  constructor(
    private http:HttpClient,
    private tokenService:TokenService,
    private userService:UserService
  ) { }

  login(credential:Credential){
    return this.http.post<Auth>(`${this.BASE_URL}/login`, credential).pipe(
      tap(response => this.tokenService.saveToken(response.token)),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    );
  }

  getCurrentUser(){
    const userId = this.tokenService.getUserId();
      return this.userService.findOne(userId|| "0").pipe(
        tap(user => this.user.next(user)),
        catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
      )
  }

  loginAndGet(credential:Credential){
    return this.login(credential)
      .pipe(
        switchMap(() => this.getCurrentUser()),
        catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
      )
  }

  logout(): void{ 
    this.tokenService.deleteToken();
    this.user.next(null);
  }
}
