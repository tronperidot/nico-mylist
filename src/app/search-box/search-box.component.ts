import { Component, OnInit, Input } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { TagEditDialogComponent } from '../tag-edit-dialog/tag-edit-dialog.component';
import { MasterService, MasterTag } from '../services/master.service';
import { ConditionService } from '../services/condition.service';

export interface Tag {
  id?: string;
  label: string;
  isCheck: boolean;
  isRemoved?: boolean;
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
  @Input() tags: Tag[] = [];
  searchText = '';
  constructor(
    private modalService: SimpleModalService,
    private masterService: MasterService,
    private condition: ConditionService,
  ) {
    this.masterService
      .getTags()
      .subscribe((masterTags) => {
        this.tags = masterTags.map((m) => this.convert(m));
      });
  }

  ngOnInit() {
  }

  onSearch() {
    const tags = this.getFilteredTags();
    this.condition.setCondtiion({
      text: this.searchText,
      tags,
    });
  }

  onClear() {
    this.searchText = '';
    this.condition.setText(this.searchText);
  }

  onTextKeyUp(): void {
    this.condition.setText(this.searchText);
  }

  onCheck(tag: Tag) {
    tag.isCheck = !tag.isCheck;
    const tags = this.getFilteredTags();
    this.condition.setTags(tags);
  }

  onEdit() {
    this.modalService.addModal(TagEditDialogComponent, {
      tags: this.tags.map((tag) => Object.assign({}, tag))
    }).subscribe((result) => {
      if (result && result.result) {
        this.save(result.tags);
      }
    });
  }

  private getFilteredTags(): string[] {
    return this.tags.filter((t) => t.isCheck).map((t) => t.label);
  }

  private save(tags: Tag[]) {
    const results = this.masterService.update(tags);
    this.tags = results.map((result) => {
      const tag = this.tags.find((t) => t.id === result.id);
      return (tag !== undefined) ? tag : this.convert(result);
    });
  }

  private convert(masterTag: MasterTag): Tag {
    return {
      id: masterTag.id,
      label: masterTag.label
    } as Tag;
  }
}
