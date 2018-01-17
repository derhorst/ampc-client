import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from '../models/song.model';

@Injectable()
export class BrowseService {
  browseData: any = {};

  private browseObservable = new ReplaySubject(1);

  setBrowseData(path: string, browseData: any) {
    this.browseData[path] = {
      'directories': {},
      'songs': [],
      'playlists': []
    };

    for (let i = 0; i < browseData.length; i++) {
      if (browseData[i].type === 'directory') {
        this.browseData[path].directories[browseData[i].dir] = null;
      } else if (browseData[i].type === 'song') {
        delete browseData[i].type;
        this.browseData[path].songs.push(browseData[i]);
      }
    }
    this.browseObservable.next(this.browseData);
  }

  setPlaylist(name: string, playlist: Song[]) {
    this.browseData[name] = playlist;
    this.browseObservable.next(this.browseData);
  }

  getBrowseData() {
    return this.browseObservable;
  }
}
