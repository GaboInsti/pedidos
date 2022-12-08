import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mobiliario } from '../../../../shared/models/mobiliario.interface';
import { MobiliarioService } from '../../../../shared/services/mobiliario.service';
import { Subscription, take } from 'rxjs';
import { APP_ROUTES } from '../../../../routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../shared/models/category.interface';

const { inventory } = APP_ROUTES;

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit, OnDestroy {

  noImage = '../../../../../assets/img/no-image.jpg';

  mobiliario: Mobiliario;
  mobiliarioSub: Subscription;

  categories: Category[];
  categoriesSub: Subscription;

  mobiliarioForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mobiliarioService: MobiliarioService
  ) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.mobiliarioSub = this.mobiliarioService.mobiliario$.pipe(take(2)).subscribe(mobiliarios => {
      if (mobiliarios) {
        const mobiliarioIndex = mobiliarios.findIndex(mobiliario => mobiliario.id === id);
        if (mobiliarioIndex >= 0) {
          this.mobiliario = mobiliarios[mobiliarioIndex];
          this.oninitForm(this.mobiliario);
        } else {
          this.router.navigate([inventory]);
        }
      }
    });

    this.categoriesSub = this.mobiliarioService.categories$.subscribe(categories => this.categories = categories);
  }

  private oninitForm(mobiliario: Mobiliario) {
    this.mobiliarioForm = this.formBuilder.group({
      'id': this.formBuilder.control(mobiliario.id, [Validators.required]),
      'name': this.formBuilder.control(mobiliario.name, [Validators.required]),
      'stock': this.formBuilder.control(mobiliario.stock, [Validators.required]),
      'price': this.formBuilder.control(mobiliario.price, [Validators.required]),
      'category': this.formBuilder.control(mobiliario.category, [Validators.required]),
      'description': this.formBuilder.control(mobiliario.description, [Validators.required]),
    })
  }

  onChangeCategory(category: Category) {
    this.mobiliarioForm.get('category').setValue(category.name);
  }

  onSaveMobiliario() {
    if (this.mobiliarioForm.valid) {
      const { id, name, stock, price, category, description } = this.mobiliarioForm.value;
      const newMobiliario = {
        ...this.mobiliario,
        id,
        name,
        stock,
        price,
        category,
        description
      };
      this.mobiliarioService.saveMobiliario(newMobiliario).subscribe();
    }
  }

  onDeleteMobiliario() {
    const { id } = this.mobiliarioForm.value;
    this.mobiliarioService.deleteMobiliario(id).subscribe({
      next: () => {
        this.router.navigate([inventory]);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.mobiliarioSub) this.mobiliarioSub.unsubscribe();
    if (this.categoriesSub) this.categoriesSub.unsubscribe();
  }

}
