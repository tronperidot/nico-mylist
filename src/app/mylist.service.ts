import { Injectable } from '@angular/core';
import { Item } from './mylist-item/mylist-item.component';

@Injectable({
  providedIn: 'root'
})
export class MylistService {
  items: Item[];
  constructor() {}
}
