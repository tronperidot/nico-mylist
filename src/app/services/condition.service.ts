import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

export interface Condition {
  text: string;
  tags: string[];
  excludeSangSong: boolean;
}

export interface QueryCondition {
  text?: string;
  tags?: string[];
  excludeSangSong?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private condition: Condition;
  readonly resource$: Subject<Condition> = new ReplaySubject<Condition>(1);

  constructor() {
    this.condition = this.defaultCondtion();
  }

  reset(): void {
    const condition = {
      text: '',
      tags: [],
      excludeSangSong: true,
    };
    this.setCondtiion(condition);
  }

  setCondtiion(condition: QueryCondition): void {
    this.condition = Object.assign(this.condition, condition);
    this.resource$.next(this.condition);
  }

  private defaultCondtion(): Condition {
    return {
      text: '',
      tags: [],
      excludeSangSong: true,
    };
  }
}
