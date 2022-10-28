import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user:User|null=null;
  constructor(
    private tokenService:TokenService,
    private userService:UserService,
    private router:Router,
    private loginService:LoginService
  ) { 
  }

  ngOnInit(): void {
    this.loginService.user$.subscribe(
      data=>{
        this.user=data;
      }
    )
  }

  logout():void{
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

}
