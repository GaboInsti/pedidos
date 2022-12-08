import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../routes';

const { customer } = APP_ROUTES;

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent {
  idCustomerOrder: string = '';

  constructor(private router: Router) { }

  onSearchCustomerOrder() {
    if (this.idCustomerOrder !== '') {
      this.router.navigateByUrl(`${customer}/consultar/${this.idCustomerOrder}`)
    }
  }
}
