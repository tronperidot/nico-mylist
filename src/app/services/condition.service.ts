import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

export interface Condition {
  text: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private condition: Condition;
  readonly resource$: Subject<Condition> = new ReplaySubject<Condition>(1);

  constructor() {
    this.reset();
  }

  setText(text: string): void {
    const condition = Object.assign(this.condition, { text });
    this.setCondtiion(condition);
  }

  setTags(tags: string[]): void {
    const condition = Object.assign(this.condition, { tags });
    this.setCondtiion(condition);
  }

  reset(): void {
    const condition = {
      text: '',
      tags: [],
    };
    this.setCondtiion(condition);
  }

  setCondtiion(condition: Condition): void {
    this.condition = condition;
    this.resource$.next(condition);
  }
}
