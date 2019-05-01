import { Component, OnInit, Input } from '@angular/core';

export interface Item {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tags: string[];
}

@Component({
  selector: 'app-mylist-item',
  templateUrl: './mylist-item.component.html',
  styleUrls: ['./mylist-item.component.css']
})
export class MylistItemComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

  open() {
    window.open(this.item.url);
  }
}
