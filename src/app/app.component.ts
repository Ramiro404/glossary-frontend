import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-glossary';
  constructor(
    private userService:UserService,
    private tokenService:TokenService,
    private loginService:LoginService
  ){}
  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.loginService.getCurrentUser().subscribe();
    }
  }
}
