import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';
import { APP_ROUTES } from '../../routes';

const { login } = APP_ROUTES;

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loginService.user$.pipe(
      take(1),
      map(user => {
        const isLogged = !!user;
        if (isLogged) {
          return true;
        } else {
          return this.router.createUrlTree([login]);
        }
      })
    )
  }
}
