import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APP_ROUTES } from '../../routes';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';

const { home, catalog, customer, newOrder, search, orders, login } = APP_ROUTES;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  homeRoute = home;
  catalogRoute = catalog;
  newCustomerOrder = `${customer}/${newOrder}`;
  searchCustomerOrderDetails = `${customer}/${search}`;
  adminRoute = orders;
  loginRoute = login;

  logged: boolean = false;
  userSub: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userSub = this.loginService.user$.subscribe(user => this.logged = !!user);
  }

  onLoginLogout() {
    if (this.logged) {
      this.loginService.logout();
    } else {
      this.router.navigate([this.loginRoute]);
    }
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
