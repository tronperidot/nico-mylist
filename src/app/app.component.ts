import { Component, OnInit } from '@angular/core';
import { Item } from './mylist-item/mylist-item.component';
import { Observable, combineLatest } from 'rxjs';
import { Condition } from './search-box/search-box.component';
import { MylistService, Mylist } from './services/mylist.service';
import { map, tap, delay, skip, filter } from 'rxjs/operators';
import { TagService, Tag } from './services/tag.service';
import { LoadingScreenService } from './services/loading-screen/loading-screen.service';
import { ConditionService } from './services/condition.service';
import * as deepEqual from 'deep-equal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'マイリストさがすやつ';
  // HACK: 本当はObservableにするのがいいのはわかっているけど、一度から配列にして描画をいい感じにさせたいので、仕方なくこれにしている。
  items: Item[];

  constructor(
    private tagService: TagService,
    private mylistService: MylistService,
    private loadingService: LoadingScreenService,
    private conditionService: ConditionService,
  ) {
    const mylists$ = this.mylist$();
    // combineLatestだとdistinctUntilChangedのprevが取れないため
    let prevCondition: Condition;
    combineLatest(
      mylists$,
      this.conditionService.resource$,
      ((mylists, condition) => ({ mylists, condition }))
    ).pipe(
      skip(1),
      filter(({ condition }) => !deepEqual(prevCondition, condition)),
      tap(({ condition }) => prevCondition = Object.assign({}, condition)),
      map(({ mylists, condition }) => this.search(mylists, condition)),
      tap(() => this.items = []),
      delay(250), // ページトップまでのスクロールのアニメーションだと見栄えが悪いので、表示をなくすことで強制的にページトップにさせる処理をする
    ).subscribe((items) => {
      this.items = items;
    });
  }

  ngOnInit() {
    console.log('↑このエラーはいつか直す。');
    this.log();
  }

  private search(mylists: Item[], condition: Condition): Item[] {
    let items = mylists.filter((val) => val.title.indexOf(condition.text) !== -1);
    condition.tags.forEach(tag => {
      items = items.filter((item) => item.tags.includes(tag));
    });
    return items;
  }

  private convert(mylist: Mylist, tagSrc: Tag[]): Item {
    const id = this.pickId(mylist.link[0]);
    const thumbnail = this.thumbnailUrl(id);
    const { tags } = tagSrc.find((tag) => tag.id === id) || { tags: [] };
    return {
      id,
      title: mylist.title[0],
      url: mylist.link[0],
      thumbnail,
      tags,
    } as Item;
  }

  private mylist$(): Observable<Item[]> {
    this.loadingService.startLoading();
    return combineLatest(
      this.mylistService.getMylists(),
      this.tagService.getTags(),
      ((mylists, tags) => ({ mylists, tags }))
    ).pipe(
      map(({mylists, tags }) => mylists.map((mylist) => this.convert(mylist, tags))),
      tap((items) => this.items = items),
      tap(() => this.loadingService.stopLoading()),
    );
  }

  private pickId(movieUrl: string): string {
    return movieUrl.split('https://www.nicovideo.jp/watch/sm')[1];
  }

  private thumbnailUrl(id: string): string {
    return `https://tn.smilevideo.jp/smile?i=${id}`;
  }

  private log() {
    console.log(`
　　　　 /⌒)
　　／＼/ ／
　 (_人｜/
　　／θ θ＼
　 ミ(_Ｙ_)ミ　　＜ Nekoshi is excellent Kuno lisner.）
　　 ＞　＜
　　(／　＼)
　 _(　　　)_
　(＿＞―＜＿)
    `);
  }
}
