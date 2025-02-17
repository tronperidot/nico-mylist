import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Tag {
  id: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private db: AngularFirestore,
  ) { }

  getTags(): Observable<Tag[]> {
    return this.tags.valueChanges();
  }

  update(tag: Tag) {
    this.tags.doc(tag.id).set(tag);
  }

  private get tags() {
    return this.db.collection<Tag>('tags');
  }
}
