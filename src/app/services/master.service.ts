import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface MasterTag {
  id?: string;
  label: string;
  isRemoved?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  tags: MasterTag[] = [];

  constructor(
    private db: AngularFirestore,
  ) {
    this.getTags().subscribe((tags) => this.tags = tags);
  }

  getTags(): Observable<MasterTag[]> {
    return this.tagMaster.valueChanges();
  }

  update(tags: MasterTag[]): MasterTag[] {
    // NOTE: ローカルで追加したけど取り消したものを対象から外している
    const targets = tags.filter((tag) => !(tag.isRemoved && tag.id === undefined));
    targets.forEach((tag) => {
      if (tag.isRemoved) {
        this.tagMaster.doc(tag.id).delete();
      } else {
        if (!tag.id) {
          tag.id = this.getUniqueStr();
        }
        this.tagMaster.doc(tag.id).set(tag);
      }
    });
    this.tags = targets.filter((target) => !target.isRemoved);
    return this.tags;
  }

  private get tagMaster() {
    return this.db.collection<MasterTag>('tag-master');
  }

  private getUniqueStr() {
    return new Date().getTime().toString(16)  + Math.floor(1000 * Math.random()).toString(20);
   }
}
