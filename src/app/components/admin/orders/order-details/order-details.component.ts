import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, MobiliarioOrder } from '../../../../shared/models/order.interface';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../../../shared/services/orders.service';
import { APP_ROUTES } from '../../../../routes';
import { Category } from '../../../../shared/models/category.interface';
import { MobiliarioService } from '../../../../shared/services/mobiliario.service';
import { Mobiliario } from '../../../../shared/models/mobiliario.interface';
import { LoginService } from '../../../../shared/services/login.service';

const { home } = APP_ROUTES;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  mobile: boolean = false;

  orderForm: FormGroup;

  order: Order;
  orderSub: Subscription;

  categories: Category[];
  categorySub: Subscription;

  categoriesSelected: string[] = [];

  mobiliarios: Mobiliario[];
  mobiliarioSub: Subscription;

  logged: boolean;
  loggedSub: Subscription;

  colonias: string[] = [
    '10 de Abril',
    'Adolfo Lopez Mateos',
    'Altos Bacurimi',
    'Ampliación El Barrio',
    'Balcones Del Valle',
    'Bosques Del Rio',
    'Camino Real',
    'Centro Sinaloa',
    'Chapultepec',
    'Condesa',
    'Emiliano Zapata',
    'Estrella Nueva Galicia',
    'Fincas del Humaya',
    'Gustavo Díaz Ordaz',
    'Hacienda Los Huertos',
    'Industrial Bravo',
    'Jardines de La Sierra',
    'La Campiña',
    'La Primavera',
    'Las Palmas',
    'Lomas Del Humaya',
    'Melchor Ocampo',
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private ordersService: OrdersService,
    private mobiliarioService: MobiliarioService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.mediaQuery();
    const orderID = this.activatedRoute.snapshot.params['id'];
    this.orderSub = this.ordersService.orders$.subscribe(orders => {
      if (orders) {
        const orderIndex = orders.findIndex(order => order.id === orderID);
        if (orderIndex >= 0) {
          this.order = orders[orderIndex];
          this.onInitForm(this.order);
        } else {
          this.router.navigate([home]);
        }
      }
    });
    this.categorySub = this.mobiliarioService.categories$.subscribe(categories => this.categories = categories);
    this.mobiliarioSub = this.mobiliarioService.mobiliario$.subscribe(mobiliarios => this.mobiliarios = mobiliarios);
    this.loggedSub = this.loginService.user$.subscribe(user => this.logged = !!user);
  }

  onInitForm(order: Order) {
    this.orderForm = this.formBuilder.group({
      id: this.formBuilder.control(order.id),
      mobiliarios: this.formBuilder.array([]),
      eventDescription: this.formBuilder.control(order.eventDescription, [Validators.required]),
      damageDescription: this.formBuilder.control(order.damageDescription),
      date: this.formBuilder.group({
        startDate: this.formBuilder.control(order.date.startDate, [Validators.required]),
        endDate: this.formBuilder.control(order.date.endDate, [Validators.required]),
        status: this.formBuilder.control(order.date.status, [Validators.required])
      }),
      address: this.formBuilder.group({
        colonia: this.formBuilder.control(order.address.colonia, [Validators.required]),
        street1: this.formBuilder.control(order.address.street1, [Validators.required]),
        street2: this.formBuilder.control(order.address.street2, [Validators.required]),
        noInterior: this.formBuilder.control(order.address.noInterior, [Validators.required]),
        noExterior: this.formBuilder.control(order.address.noExterior, [Validators.required]),
        codigoPostal: this.formBuilder.control(order.address.codigoPostal, [Validators.required]),
        description: this.formBuilder.control(order.address.description, [Validators.required])
      }),
      transportista: this.formBuilder.group({
        id: this.formBuilder.control(order.transportista.id, [Validators.required]),
        name: this.formBuilder.control(order.transportista.name, [Validators.required])
      }),
      administrador: this.formBuilder.group({
        id: this.formBuilder.control(order.administrador.id, [Validators.required]),
        name: this.formBuilder.control(order.administrador.name, [Validators.required])
      }),
      customer: this.formBuilder.group({
        id: this.formBuilder.control(order.customer.id, [Validators.required]),
        customerName: this.formBuilder.control(order.customer.customerName, [Validators.required]),
        customerLastName: this.formBuilder.control(order.customer.customerLastName, [Validators.required]),
        customerEmail: this.formBuilder.control(order.customer.customerEmail, [Validators.required]),
        customerPhoneNumber: this.formBuilder.control(order.customer.customerPhoneNumber, [Validators.required]),
        customerBirthday: this.formBuilder.control(order.customer.customerBirthday, [Validators.required]),
        genre: this.formBuilder.control(order.customer.genre, [Validators.required]),
      })
    });
    this.onSetMobiliarios(order.mobiliarios);
  }

  private onSetMobiliarios(mobiliarios: MobiliarioOrder[]) {
    console.log(mobiliarios);
    mobiliarios.forEach(mobiliario => {
      this.onAddMobiliario(mobiliario.id, mobiliario.category, mobiliario.name, mobiliario.price, mobiliario.quantity);
    });
  }

  onUpdateOrder() {
    if (this.orderForm.valid) {
      this.ordersService.updateOrder(this.orderForm.value).subscribe();
    }
  }

  onAddMobiliario(id = 0, category = '', name = '', price = 0, quantity = 0) {
    (<FormArray>this.orderForm.get('mobiliarios')).push(
      this.formBuilder.group({
        id: this.formBuilder.control(id, [Validators.required]),
        category: this.formBuilder.control(category, [Validators.required]),
        nameMobiliario: this.formBuilder.control(name, [Validators.required]),
        priceMobiliario: this.formBuilder.control(price, [Validators.required]),
        quantityMobiliario: this.formBuilder.control(quantity, [Validators.required]),
      })
    );
  }

  onRemoveMobiliario(index: number) {
    (<FormArray>this.orderForm.get('mobiliarios')).removeAt(index);
  }

  get mobiliariosControls() {
    return (<FormArray>this.orderForm.get('mobiliarios')).controls;
  }

  onChangeCategory() {
    const mobiliarios = this.orderForm.get('mobiliarios').value;
    mobiliarios.forEach((mobiliario, index) => {
      this.categoriesSelected[index] = mobiliario.category;
    });
  }

  onCheckPrices() {
    const mobiliarios = this.orderForm.get('mobiliarios').value;
    const mobiliarioControls = this.mobiliariosControls;
    let indexArray = [];
    mobiliarios.forEach((mobiliarioForm) => {
      const index = this.mobiliarios.findIndex(
        mobiliario => mobiliario.name.toLocaleLowerCase() === mobiliarioForm.nameMobiliario.toLocaleLowerCase()
      );
      indexArray.push(index);
    });
    mobiliarioControls.forEach((control, index) => {
      control.get('priceMobiliario').setValue(this.mobiliarios[indexArray[index]].price);
    });
  }

  onSetColonia(colonia: string) {
    this.orderForm.get(['address', 'colonia']).setValue(colonia);
  }

  mediaQuery() {
    const medium = '(min-width: 768px)';
    this.breakpointObserver.observe(medium).subscribe(state => this.mobile = !state.matches);
  }

  ngOnDestroy(): void {
    if (this.orderSub) this.orderSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
    if (this.mobiliarioSub) this.mobiliarioSub.unsubscribe();
    if (this.loggedSub) this.loggedSub.unsubscribe();
  }

}
