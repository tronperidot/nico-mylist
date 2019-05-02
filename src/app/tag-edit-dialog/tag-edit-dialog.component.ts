import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Tag } from '../search-box/search-box.component';

export interface TagEditModel {
  tags: Tag[];
}

export interface TagEditModalResult {
  tags: Tag[];
  result: boolean;
}

@Component({
  selector: 'app-tag-edit-dialog',
  templateUrl: './tag-edit-dialog.component.html',
  styleUrls: ['./tag-edit-dialog.component.css']
})
export class TagEditDialogComponent　extends SimpleModalComponent<TagEditModel, TagEditModalResult> implements TagEditModel {
  tags: Tag[] = [];

  constructor() {
    super();
  }

  onAdd() {
    const tag: Tag = { label: '', isCheck: false };
    this.tags.push(tag);
    this.tags = [...this.tags];
  }

  onRemove(idx: number) {
    this.tags[idx].isRemoved = true;
    this.tags = [...this.tags];
  }

  confirm() {
    this.result = {
      tags: this.tags,
      result: true
    };
    this.close();
  }

  cancel() {
    this.result = {
      tags: this.tags,
      result: false
    };
    this.close();
  }
}
