import { Pipe, PipeTransform } from '@angular/core';
import { Mobiliario } from '../../../../../shared/models/mobiliario.interface';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(mobiliarios: Mobiliario[], category: string): Mobiliario[] {
    const newMobiliarios = mobiliarios.filter(
      mobiliario => mobiliario.category.toLocaleLowerCase() === category.toLocaleLowerCase()
    )
    if (category === '') {
      return [];
    } else {
      return newMobiliarios;
    }
  }

}
