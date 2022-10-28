import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '../models/User.model';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router:Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.loginService.user$.pipe(
      map(user => {
        const id = route.paramMap.get('id');
        if(user && id==user.id && id) return true;
        this.router.navigate(['/']);
        return false;
      })
    )
  }

}
