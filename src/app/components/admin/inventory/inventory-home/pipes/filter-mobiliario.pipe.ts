import { Pipe, PipeTransform } from '@angular/core';
import { Mobiliario } from '../../../../../shared/models/mobiliario.interface';

@Pipe({
  name: 'filterMobiliario'
})
export class FilterMobiliarioPipe implements PipeTransform {

  transform(mobiliarios: Mobiliario[], filter: string): Mobiliario[] {
    const newMobiliarios = mobiliarios.filter(mobiliario => mobiliario.name.toLocaleLowerCase().includes(filter));
    return newMobiliarios;
  }

}
