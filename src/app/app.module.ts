import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';

// Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Login component
import { LoginComponent } from './components/login/login.component';

// Admin components
import { AdminComponent } from './components/admin/admin.component';
import { OrderHomeComponent } from './components/admin/orders/order-home/order-home.component';
import { CheckOrdersComponent } from './components/admin/orders/check-orders/check-orders.component';
import { OrderDetailsComponent } from './components/admin/orders/order-details/order-details.component';
import { StaffHomeComponent } from './components/admin/staff/staff-home/staff-home.component';
import { CheckStaffComponent } from './components/admin/staff/check-staff/check-staff.component';
import { StaffDetailComponent } from './components/admin/staff/staff-detail/staff-detail.component';
import { InventoryHomeComponent } from './components/admin/inventory/inventory-home/inventory-home.component';
import { InventoryDetailsComponent } from './components/admin/inventory/inventory-details/inventory-details.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CustomerSearchComponent } from './components/customer/orders/customer-search/customer-search.component';
import { FilterMobiliarioPipe } from './components/admin/inventory/inventory-home/pipes/filter-mobiliario.pipe';
import { NewOrderComponent } from './components/customer/orders/new-order/new-order.component';
import { FilterCategoryPipe } from './components/customer/orders/new-order/pipes/filter-category.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    HeaderComponent,
    CarouselComponent,
    FooterComponent,
    AdminComponent,
    OrderHomeComponent,
    CheckOrdersComponent,
    OrderDetailsComponent,
    StaffHomeComponent,
    CheckStaffComponent,
    StaffDetailComponent,
    InventoryHomeComponent,
    InventoryDetailsComponent,
    CatalogComponent,
    CustomerSearchComponent,
    FilterMobiliarioPipe,
    NewOrderComponent,
    FilterCategoryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
