import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mobiliario } from '../../../../shared/models/mobiliario.interface';
import { Subscription } from 'rxjs';
import { MobiliarioService } from '../../../../shared/services/mobiliario.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../routes';

const { inventory} = APP_ROUTES;

@Component({
  selector: 'app-inventory-home',
  templateUrl: './inventory-home.component.html',
  styleUrls: ['./inventory-home.component.css']
})
export class InventoryHomeComponent implements OnInit, OnDestroy {

  filter: string = '';

  mobiliarios: Mobiliario[];
  mobiliariosSub: Subscription;

  constructor(
    private router: Router,
    private mobiliarioService: MobiliarioService
  ) { }

  ngOnInit(): void {
    this.mobiliariosSub = this.mobiliarioService.mobiliario$.subscribe(mobiliarios => this.mobiliarios = mobiliarios);
  }

  onCheckDetails(id: number) {
    this.router.navigateByUrl(`${inventory}/consultar/${id}`);
  }

  ngOnDestroy(): void {
    if (this.mobiliariosSub) this.mobiliariosSub.unsubscribe();
  }

}
