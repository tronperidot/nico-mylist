import { Component, OnInit, Input } from '@angular/core';
import { MasterService } from '../services/master.service';
import { TagService } from '../services/tag.service';
import { SangService } from '../services/sang/sang.service';

export interface Item {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tags: string[];
  isSang: boolean;
}

interface UseTag {
  label: string;
  isUse: boolean;
}

@Component({
  selector: 'app-mylist-item',
  templateUrl: './mylist-item.component.html',
  styleUrls: ['./mylist-item.component.css']
})
export class MylistItemComponent implements OnInit {
  @Input() item: Item;
  isEditMode = false;
  useTags: UseTag[];

  constructor(
    public masterService: MasterService,
    private tagService: TagService,
    private sangSerive: SangService,
  ) { }

  ngOnInit() {
  }

  open() {
    this.item.isSang = true;
    this.sangSerive.addSang(this.item);
    window.open(this.item.url);
  }

  onEdit() {
    if (this.isEditMode) {
      this.save();
    } else {
      this.useTags = this.masterService.tags.map((tag) => {
        return {
          label: tag.label,
          isUse: this.item.tags.includes(tag.label)
        } as UseTag;
      });
    }
    this.isEditMode = !this.isEditMode;
  }

  private save() {
    const tags = this.useTags
      .filter((tag) => tag.isUse)
      .map((tag) => tag.label);
    this.tagService.update({
      id: this.item.id,
      tags
    });
    this.item.tags = tags;
  }
}
