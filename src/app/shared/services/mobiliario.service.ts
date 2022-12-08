import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap, concatMap, BehaviorSubject, Observable } from 'rxjs';
import { Mobiliario } from '../models/mobiliario.interface';
import { Category } from '../models/category.interface';

const { firebaseURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class MobiliarioService {

  private mobiliarioSubject: BehaviorSubject<Mobiliario[]> = new BehaviorSubject<Mobiliario[]>(null);
  mobiliario$: Observable<Mobiliario[]> = this.mobiliarioSubject.asObservable();

  private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(null);
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getMobiliarios() {
    return this.http.get<Mobiliario[]>(`${firebaseURL}/mobiliario.json`).pipe(
      tap(mobiliario => this.mobiliarioSubject.next(mobiliario)),
      concatMap(() => this.getCategories())
    );
  }

  private getCategories() {
    return this.http.get<Mobiliario[]>(`${firebaseURL}/categories.json`).pipe(
      tap(categories => this.categoriesSubject.next(categories))
    );
  }

  saveMobiliario(newMobiliario: Mobiliario) {
    let mobiliariosToUpdate = this.mobiliarioSubject.getValue().slice();
    const index = mobiliariosToUpdate.findIndex(mobiliario => newMobiliario.id === mobiliario.id);
    mobiliariosToUpdate[index] = {...newMobiliario};
    return this.http.put<Mobiliario[]>(`${firebaseURL}/mobiliario.json`, mobiliariosToUpdate).pipe(
      tap(newMobiliarios => this.mobiliarioSubject.next(newMobiliarios))
    )
  }

  deleteMobiliario(mobiliarioId: number) {
    const newMobiliarios = this.mobiliarioSubject.getValue().slice();
    const index = newMobiliarios.findIndex(mobiliario => mobiliarioId === mobiliario.id);
    newMobiliarios.splice(index, 1);
    return this.http.put<Mobiliario[]>(`${firebaseURL}/mobiliario.json`, newMobiliarios).pipe(
      tap(newMobiliarios => this.mobiliarioSubject.next(newMobiliarios))
    )
  }

}
