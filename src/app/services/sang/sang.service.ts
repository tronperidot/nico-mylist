import { Injectable } from '@angular/core';
import { Item } from 'src/app/mylist-item/mylist-item.component';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// HACK: このサービスは冗長な気がしている。もっと有意義な定義で行うべきでは
export class SangService {
  private sangs: Item[] = [];
  readonly resource$: Subject<Item[]> = new BehaviorSubject<Item[]>([]);
  constructor() { }

  addSang(item: Item): void {
    const isFirstSang = !this.sangs.some((sang) => sang.id === item.id);
    if (isFirstSang) {
      this.sangs.push(item);
      this.resource$.next(this.sangs);
    }
  }
}
