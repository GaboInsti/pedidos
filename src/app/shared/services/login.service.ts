import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../routes';

const { home } = APP_ROUTES;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user$: Observable<User> = this.userSubject.asObservable();

  private hardUser: User = {
    email: 'admin@dfantasy.com',
    password: 'admin1234',
  };

  constructor(private router: Router) {}

  login(user: User) {
    const validCredentials =
      user.email === this.hardUser.email &&
      user.password === this.hardUser.password;
    const date = new Date().getTime().toString();
    return of(validCredentials).pipe(
      delay(1500),
      switchMap((valid) => {
        if (valid) {
          const userLogged = {
            user,
            date,
          };
          return of(userLogged);
        } else {
          throw new Error('Usuario o contraseña incorrecto');
        }
      }),
      tap(({ user, date }) => {
        localStorage.setItem('logged', date);
        this.userSubject.next(user);
        this.autoLogout(3600000);
      })
    );
  }

  verifyLogged() {
    const loggedAt = +localStorage.getItem('logged');
    const currentTime = new Date().getTime();
    const timeLeft = 3600000 - (currentTime - loggedAt);
    const validTime = timeLeft >= 0 && timeLeft < 3600000;
    if (!validTime) {
      localStorage.removeItem('logged');
      this.userSubject.next(null);
    } else {
      const user = this.userSubject.getValue();
      if (!user) {
        this.userSubject.next(this.hardUser);
      }
      this.autoLogout(timeLeft);
    }
  }

  logout() {
    localStorage.removeItem('logged');
    this.userSubject.next(null);
    this.router.navigate([home]);
  }

  autoLogout(timeLeft: number) {
    console.log('waiting to logout:', timeLeft);
    setTimeout(() => {
      this.logout();
    }, timeLeft);
  }
}
