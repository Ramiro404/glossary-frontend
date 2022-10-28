import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData:User | null = null;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  constructor() { }
  
  setUser(user:User):void{
    this.userData = user;
    this.userSubject.next(this.userData);
  }


}
