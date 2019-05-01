import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

interface Tag {
  label: string;
  isCheck: boolean;
}

export interface Condition {
  text: string;
  tags: string[];
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input() tags: Tag[] = [
    { label: 'ジブリ', isCheck: false },
    { label: 'ボカロ', isCheck: false },
    { label: 'アニソン', isCheck: false },
    { label: 'ショタ', isCheck: false },
  ];
  @Output() search: EventEmitter<Condition> = new EventEmitter<Condition>();
  searchText = '';
  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    const tags = this.tags.filter((tag) => tag.isCheck).map((tag) => tag.label);
    this.search.emit({ text: this.searchText, tags });
  }

  onClear() {
    this.searchText = '';
    this.onSearch();
  }

  onCheck(tag: Tag) {
    tag.isCheck = !tag.isCheck;
    this.onSearch();
  }
}
