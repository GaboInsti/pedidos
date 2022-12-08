import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '../../../../shared/services/orders.service';
import { Order } from '../../../../shared/models/order.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../routes';

const { orders } = APP_ROUTES;

@Component({
  selector: 'app-check-orders',
  templateUrl: './check-orders.component.html',
  styleUrls: ['./check-orders.component.css']
})
export class CheckOrdersComponent implements OnInit, OnDestroy {
  orders: Order[];
  orderSub: Subscription;
  
  constructor(
    private router: Router,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.orderSub = this.ordersService.orders$.subscribe(orders => this.orders = orders);
  }

  onCheckOrderDetails(i: number) {
    const id = this.orders[i].id;
    this.router.navigate([orders, 'consultar', id]);
  }

  ngOnDestroy(): void {
    if (this.orderSub) this.orderSub.unsubscribe();
  }
}
