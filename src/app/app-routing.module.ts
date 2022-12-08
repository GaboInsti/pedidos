import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Admin components
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { AdminComponent } from './components/admin/admin.component';

// Guards
import { LoginGuard } from './components/login/login.guard';

// Order components
import { OrderHomeComponent } from './components/admin/orders/order-home/order-home.component';
import { OrderDetailsComponent } from './components/admin/orders/order-details/order-details.component';
import { CheckOrdersComponent } from './components/admin/orders/check-orders/check-orders.component';

// Staff components
import { StaffHomeComponent } from './components/admin/staff/staff-home/staff-home.component';
import { CheckStaffComponent } from './components/admin/staff/check-staff/check-staff.component';
import { StaffDetailComponent } from './components/admin/staff/staff-detail/staff-detail.component';

// StoreComponents
import { InventoryHomeComponent } from './components/admin/inventory/inventory-home/inventory-home.component';
import { InventoryDetailsComponent } from './components/admin/inventory/inventory-details/inventory-details.component';
import { APP_ROUTES } from './routes';
import { CustomerSearchComponent } from './components/customer/orders/customer-search/customer-search.component';
import { NewOrderComponent } from './components/customer/orders/new-order/new-order.component';

const {
  home,
  login,
  catalog,
  orders,
  newOrder,
  workers,
  newWorker,
  inventory,
  checkAll,
  checkDetails,
  customer,
  search
} = APP_ROUTES;

const routes: Routes = [
  { path: '', redirectTo: home, pathMatch: 'full' },
  { path: home, component: LandingPageComponent },
  { path: login, component: LoginComponent },
  { path: catalog, component: CatalogComponent },
  {
    path: orders,
    component: AdminComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', component: OrderHomeComponent },
      { path: checkAll, component: CheckOrdersComponent },
      { path: checkDetails, component: OrderDetailsComponent },
      { path: newOrder, component: OrderDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: workers,
    component: AdminComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', component: StaffHomeComponent },
      { path: checkAll, component: CheckStaffComponent },
      { path: checkDetails, component: StaffDetailComponent },
      { path: newWorker, component: StaffDetailComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: inventory,
    component: AdminComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', component: InventoryHomeComponent },
      { path: checkDetails, component: InventoryDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  { path: `${customer}/${newOrder}`, component: NewOrderComponent },
  { path: `${customer}/${search}`, component: CustomerSearchComponent },
  { path: `${customer}/${checkDetails}`, component: OrderDetailsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
