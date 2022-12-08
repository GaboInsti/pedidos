import { Component } from '@angular/core';
import { APP_ROUTES } from '../../../../routes';

const { newOrder, checkAll } = APP_ROUTES;

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.css']
})
export class OrderHomeComponent {
  newOrderRoute = `${newOrder}`;
  checkAllOrdersRoute = `${checkAll}`;
}
