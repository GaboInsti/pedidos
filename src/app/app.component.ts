import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';
import { MobiliarioService } from './shared/services/mobiliario.service';
import { OrdersService } from './shared/services/orders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Diversiones sfantasy';

  constructor(
    private loginService: LoginService,
    private mobiliarioService: MobiliarioService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.loginService.verifyLogged();
    this.mobiliarioService.getMobiliarios().subscribe();
    this.ordersService.getOrders().subscribe();
  }
}

