import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  // HACK: この場合何が正しいのかよくわからない
  // tslint:disable-next-line:variable-name
  private _loading = false;
  loadingStatus = new BehaviorSubject<boolean>(false);

  get loading() {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
