import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { bindCallback, Observable } from 'rxjs';

export interface Mylist {
  description: string[];
  guid: any[];
  link: string[];
  pubDate: string[];
  title: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MylistService {

  constructor(
    private http: HttpClient,
  ) { }

  getMylists(): Observable<Mylist[]> {
    const parseString$ = bindCallback(parseString);
    return this.http
      .get('assets/mylist.xml', { responseType: 'text' })
      .pipe(
        mergeMap(parseString$),
        map<any, Mylist[]>((obj) => obj[1].rss.channel[0].item),
      );
  }
}
