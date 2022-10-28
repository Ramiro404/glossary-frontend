import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token:string): void{
    localStorage.setItem('glossary_app',token);
  }
  getToken(): string|null{
    const token = localStorage.getItem('glossary_app');
    return token;
  }

  getUserId(): string|null{
    const token = this.getToken();
    if(token){
      const payload = jwt_decode<any>(token);
      return payload.sub;
    }else{
      return null;
    }
    
  }
  deleteToken(): void{
    localStorage.removeItem('glossary_app');
  }

}
