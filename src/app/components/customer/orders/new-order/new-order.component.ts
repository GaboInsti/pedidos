import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../../shared/models/category.interface';
import { Subscription } from 'rxjs';
import { MobiliarioService } from '../../../../shared/services/mobiliario.service';
import { Mobiliario } from '../../../../shared/models/mobiliario.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order, MobiliarioOrder } from '../../../../shared/models/order.interface';

import { v4 as uuidv4 } from 'uuid';
import { OrdersService } from '../../../../shared/services/orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit, OnDestroy {
  mobile: boolean = false;

  categories: Category[] = [];
  categorySub: Subscription;

  mobiliarios: Mobiliario[] = [];
  mobiliarioSub: Subscription;

  categoriesSelected: string[] = [];

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

  orderForm: FormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private mobiliarioService: MobiliarioService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.onInitForm();
    this.mediaQuery();
    this.categorySub = this.mobiliarioService.categories$.subscribe(
      (categories) => (this.categories = categories)
    );
    this.mobiliarioSub = this.mobiliarioService.mobiliario$.subscribe(
      (mobiliarios) => (this.mobiliarios = mobiliarios)
    );
  }

  mediaQuery() {
    const medium = '(min-width: 768px)';
    this.breakpointObserver
      .observe(medium)
      .subscribe((state) => (this.mobile = !state.matches));
  }

  onInitForm() {
    this.orderForm = this.formBuilder.group({
      mobiliarios: this.formBuilder.array([]),
      eventDescription: this.formBuilder.control('', [Validators.required]),
      date: this.formBuilder.group({
        startDate: this.formBuilder.control('', [Validators.required]),
        endDate: this.formBuilder.control('', [Validators.required]),
      }),
      address: this.formBuilder.group({
        colonia: this.formBuilder.control('', [Validators.required]),
        street1: this.formBuilder.control('', [Validators.required]),
        street2: this.formBuilder.control('', [Validators.required]),
        noInterior: this.formBuilder.control('', [Validators.required]),
        noExterior: this.formBuilder.control('', [Validators.required]),
        codigoPostal: this.formBuilder.control('', [Validators.required]),
        description: this.formBuilder.control('', [Validators.required]),
      }),
      customer: this.formBuilder.group({
        customerName: this.formBuilder.control('', [Validators.required]),
        customerLastName: this.formBuilder.control('', [Validators.required]),
        customerEmail: this.formBuilder.control('', [Validators.required]),
        customerPhoneNumber: this.formBuilder.control('', [
          Validators.required,
        ]),
        customerBirthday: this.formBuilder.control('', [Validators.required]),
        genre: this.formBuilder.control('', [Validators.required]),
      }),
    });
    this.onAddMobiliario();
  }

  onAddMobiliario() {
    (<FormArray>this.orderForm.get('mobiliarios')).push(
      this.formBuilder.group({
        category: this.formBuilder.control('', [Validators.required]),
        nameMobiliario: this.formBuilder.control('', [Validators.required]),
        priceMobiliario: this.formBuilder.control('', [Validators.required]),
        quantityMobiliario: this.formBuilder.control('', [Validators.required]),
      })
    );
  }

  onRemoveMobiliario(index: number) {
    (<FormArray>this.orderForm.get('mobiliarios')).removeAt(index);
  }

  get mobiliariosControls() {
    return (<FormArray>this.orderForm.get('mobiliarios')).controls;
  }

  onNewOrder() {
    if (this.orderForm.valid) {
      const { mobiliarios, eventDescription, date, address, customer  } = this.orderForm.value;
      const newOrder: Order = {
        id: uuidv4(),
        mobiliarios: this.onTransformMobiliarios(mobiliarios),
        eventDescription,
        damageDescription: '',
        date: {...date, status: 'Por confirmar'},
        address,
        transportista: {id: '', name: ''},
        administrador: {id: '', name: ''},
        customer: {
          ...customer,
          id: uuidv4()
        }
      };
      this.ordersService.newOrder(newOrder).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Su renta ha sido creada!',
            icon: 'info',
            html:
              '<p>¡Cuarde su ID y el de su pedido!</p>' +
              `<p>Cliente ID: ${newOrder.customer.id}</p>` +
              `<p>Renta ID: ${newOrder.id}</p>`,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Listo'
          });
        }
      });
    }
  }

  private onTransformMobiliarios(mobiliarios: any) {
    return mobiliarios.map(mobiliarioForm => {
      const { category, nameMobiliario, quantityMobiliario } = mobiliarioForm;
      const index = this.mobiliarios.findIndex(
        mobiliario => {
          return nameMobiliario.toLocaleLowerCase() === mobiliario.name.toLocaleLowerCase()
        }
      );
      const { id, name, price } = this.mobiliarios[index];
      const newMobiliario: MobiliarioOrder = {
        id,
        category,
        name,
        price,
        quantity: quantityMobiliario
      }
      return newMobiliario;
    });
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

  ngOnDestroy(): void {
    if (this.categorySub) this.categorySub.unsubscribe();
    if (this.mobiliarioSub) this.mobiliarioSub.unsubscribe();
  }
}
