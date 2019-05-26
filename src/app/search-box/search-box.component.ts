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

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input() tags: Tag[] = [];
  searchText = '';
  excludeSangSong = true;
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
      excludeSangSong: this.excludeSangSong,
    });
  }

  onClear() {
    const text = '';
    this.searchText = text;
    this.condition.setCondtiion({ text });
  }

  onTextKeyUp(): void {
    const text = this.searchText;
    this.condition.setCondtiion({ text });
  }

  onCheck(tag: Tag) {
    tag.isCheck = !tag.isCheck;
    const tags = this.getFilteredTags();
    this.condition.setCondtiion({ tags });
  }

  onSangSettingCheck(excludeSangSong: boolean) {
    this.excludeSangSong = excludeSangSong;
    this.condition.setCondtiion({ excludeSangSong });
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
