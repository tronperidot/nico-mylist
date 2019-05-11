import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Item } from './mylist-item/mylist-item.component';
import { Observable, of, combineLatest } from 'rxjs';
import { Condition } from './search-box/search-box.component';
import { MylistService, Mylist } from './services/mylist.service';
import { map } from 'rxjs/operators';
import { TagService, Tag } from './services/tag.service';
import { LoadingScreenService } from './services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'マイリストさがすやつ';
  items$: Observable<Item[]>;
  items: Item[];
  // HACK: リファクタリング
  cashedItems: Item[] = [];

  constructor(
    private tagService: TagService,
    private mylistService: MylistService,
    private loadingService: LoadingScreenService,
  ) {
    this.loadingService.startLoading();
    combineLatest(
      this.mylistService.getMylists(),
      this.tagService.getTags(),
      ((mylists, tags) => ({ mylists, tags }))
    ).pipe(
      map(({mylists, tags }) => mylists.map((mylist) => this.convert(mylist, tags)))
    ).subscribe((items) => {
      this.loadingService.stopLoading();
      this.cashedItems = this.items = items;
    });
  }

  ngOnInit() {
    console.log('↑このエラーはいつか直す。');
    this.log();
  }

  onSearch(condition: Condition) {
    let items = this.cashedItems.filter((val) => val.title.indexOf(condition.text) !== -1);
    condition.tags.forEach(tag => {
      items = items.filter((item) => item.tags.includes(tag));
    });
    this.reload(items);
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

  private pickId(movieUrl: string): string {
    return movieUrl.split('https://www.nicovideo.jp/watch/sm')[1];
  }

  private thumbnailUrl(id: string): string {
    return `https://tn.smilevideo.jp/smile?i=${id}`;
  }

  /**
   * ページトップまでのスクロールのアニメーションだと見栄えが悪いので、表示をなくすことで強制的にページトップにさせる処理をする
   * @param items 検索結果
   */
  private reload(items: Item[]): void {
    this.items = [];
    setTimeout(() => {
      this.items = items;
    }, 0);
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
