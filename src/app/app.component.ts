import { Component, OnInit } from '@angular/core';
import { Item } from './mylist-item/mylist-item.component';
import { Observable, combineLatest } from 'rxjs';
import { MylistService, Mylist } from './services/mylist.service';
import { map, tap, delay, filter, first } from 'rxjs/operators';
import { TagService, Tag } from './services/tag.service';
import { LoadingScreenService } from './services/loading-screen/loading-screen.service';
import { ConditionService, Condition } from './services/condition.service';
import * as deepEqual from 'deep-equal';
import { SangService } from './services/sang/sang.service';

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
    private sangService: SangService,
  ) {
    this.loadingService.startLoading();
    const mylists$ = this.mylist$();
    mylists$.pipe(
      first(),
    ).subscribe((items) => {
      this.items = items;
      this.loadingService.stopLoading();
    });
    // combineLatestだとdistinctUntilChangedのprevが取れないため
    let prevCondition: Condition;
    combineLatest(
      mylists$,
      this.conditionService.resource$,
      ((mylists, condition) => ({ mylists, condition }))
    ).pipe(
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
    const items = mylists.filter((item) => this.isMatch(item, condition));
    return items;
  }

  private isMatch(item: Item, condition: Condition): boolean {
    return (
      (item.title.indexOf(condition.text) !== -1) &&
      !(condition.excludeSangSong && item.isSang) &&
      condition.tags.every((tag) => item.tags.includes(tag))
    );
  }

  private convert(mylist: Mylist, tagSrc: Tag[], sangs: Item[]): Item {
    const id = this.pickId(mylist.link[0]);
    const thumbnail = this.thumbnailUrl(id);
    const { tags } = tagSrc.find((tag) => tag.id === id) || { tags: [] };
    return {
      id,
      title: mylist.title[0],
      url: mylist.link[0],
      thumbnail,
      tags,
      isSang: sangs.some((item) => item.id === id),
    } as Item;
  }

  private mylist$(): Observable<Item[]> {
    // HACK: sangは頻繁に変わるからこいつの変更では進ませたくない
    return combineLatest(
      this.mylistService.getMylists(),
      this.tagService.getTags(),
      this.sangService.resource$,
      ((mylists, tags, sangs) => ({ mylists, tags, sangs }))
    ).pipe(
      map(({mylists, tags, sangs }) => mylists.map((mylist) => this.convert(mylist, tags, sangs))),
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
