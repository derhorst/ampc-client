import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from '../models/song.model';

@Injectable()
export class SearchService {

  private searchObservable = new ReplaySubject(1);

  setSearchResult(searchData: any) {
    this.searchObservable.next(searchData);
  }

  getSearchResult() {
    return this.searchObservable;
  }
}
