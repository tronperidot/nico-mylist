import { Component, OnInit } from '@angular/core';
import { Item } from './mylist-item/mylist-item.component';
import { Observable, of, combineLatest } from 'rxjs';
import { Condition } from './search-box/search-box.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MylistService, Mylist } from './services/mylist.service';
import { map, merge } from 'rxjs/operators';
import { TagService, Tag } from './services/tag.service';

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
  cashedItems: Item[];

  constructor(
    private tagService: TagService,
    private mylistService: MylistService,
  ) {
    // this.db.collection('comments')
    //   .valueChanges()
    //   .subscribe((item) => console.log(item));
    // update
    // this.db.collection('comments')
    //   .doc('16924413')
    //   .set({ tag: ['ジブリ'], id: '16924413' });
    combineLatest(
      this.mylistService.getMylists(),
      this.tagService.getTags(),
      ((mylists, tags) => ({ mylists, tags }))
    ).pipe(
      map(({mylists, tags }) => mylists.map((mylist) => this.convert(mylist, tags)))
    ).subscribe((items) => this.cashedItems = this.items = items);
  }

  ngOnInit() {
  }

  onSearch(condition: Condition) {
    let items = this.cashedItems.filter((val) => val.title.indexOf(condition.text) !== -1);
    condition.tags.forEach(tag => {
      items = items.filter((item) => item.tags.includes(tag));
    });
    this.items = items;
  }

  private convert(mylist: Mylist, tagSrc: Tag[]): Item {
    const id = this.pickId(mylist.link[0]);
    const thumbnail = this.thumbnailUrl(id);
    const tagItem = tagSrc.find((tag) => tag.id === id) || { tags: [] };
    return {
      id,
      title: mylist.title[0],
      url: mylist.link[0],
      thumbnail,
      tags: tagItem.tags,
    } as Item;
  }

  private pickId(movieUrl: string): string {
    return movieUrl.split('https://www.nicovideo.jp/watch/sm')[1];
  }

  private thumbnailUrl(id: string): string {
    return `https://tn.smilevideo.jp/smile?i=${id}`;
  }

  // 悩む
  private getItems$(): Observable<Item[]> {
    const item: Item = {
      id: '',
      title: 'いのちの名前',
      url: 'https://www.nicovideo.jp/watch/sm16924413',
      thumbnail: 'https://tn.smilevideo.jp/smile?i=16924413',
      tags: ['ジブリ']
    };
    return of([item, item, item, item, item]);
  }

  // private getItems(): Item[] {
  //   const item: Item = {
  //     title: 'いのちの名前',
  //     url: 'https://www.nicovideo.jp/watch/sm16924413',
  //     thumbnail: 'https://tn.smilevideo.jp/smile?i=16924413',
  //     tags: ['ジブリ']
  //   };
  //   return [item, item, item, item, item];
  // }

  // private getItems(): Item[] {
  //   return [
  //     {
  //       title: '【ニコカラ】ロキ《off vocal》※リン抜き',
  //       url: 'https://www.nicovideo.jp/watch/sm32874889',
  //       thumbnail: 'https://tn.smilevideo.jp/smile?i=32874889',
  //       tags: ['ボカロ']
  //     },
  //     {
  //       title: '【ニコカラ】ガランド／off vocal',
  //       url: 'https://www.nicovideo.jp/watch/sm33210081',
  //       thumbnail: 'https://tn.smilevideo.jp/smile?i=33210081',
  //       tags: ['ボカロ']
  //     },
  //     {
  //       title: 'いのちの名前',
  //       url: 'https://www.nicovideo.jp/watch/sm16924413',
  //       thumbnail: 'https://tn.smilevideo.jp/smile?i=16924413',
  //       tags: ['ジブリ']
  //     },
  //     {
  //       title: '【ニコカラ】【猫の恩返し】 風になる-Acoustic ver.- 【アコギ】',
  //       url: 'https://www.nicovideo.jp/watch/sm16899289',
  //       thumbnail: 'https://tn.smilevideo.jp/smile?i=16899289',
  //       tags: ['ジブリ']
  //     },
  //     {
  //       title: '【ニコカラ】【ジブリ】 風の通り道-Acoustic ver.- 【となりのトトロ】',
  //       url: 'https://www.nicovideo.jp/watch/sm18670261',
  //       thumbnail: 'https://tn.smilevideo.jp/smile?i=18670261',
  //       tags: ['ジブリ']
  //     },
  //     {
  //       title: '【ニコカラ】カラーズぱわーにおまかせろ!（Off Vocal）FULL(カウントあり)',
  //       url: 'https://www.nicovideo.jp/watch/sm32728805',
  //       thumbnail: 'https://tn.smilevideo.jp/smile?i=32728805',
  //       tags: ['アニソン']
  //     },
  //     {
  //       title: '【ニコカラ】恋愛サーキュレーション【化物語】',
  //       url: 'https://www.nicovideo.jp/watch/sm9512470',
  //       thumbnail: 'https://tn.smilevideo.jp/smile?i=9512470',
  //       tags: ['アニソン']
  //     },
  //     {
  //       title: '【ニコカラ】 テルーの唄　オルゴールver 【off vocal 】',
  //       url: 'https://www.nicovideo.jp/watch/sm14824837',
  //       thumbnail: 'https://tn.smilevideo.jp/smile?i=14824837',
  //       tags: ['ジブリ']
  //     },
  //     {
  //       title: '【ニコカラ】アンインストール/石川智晶(off vocal)【ぼくらの】',
  //       url: 'https://www.nicovideo.jp/watch/sm12666000',
  //       thumbnail: 'https://tn.smilevideo.jp/smile?i=12666000',
  //       tags: ['アニソン']
  //     },
  //   ];
  // }
}
