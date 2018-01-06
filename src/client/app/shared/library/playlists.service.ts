import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from '../models/song.model';

@Injectable()
export class PlaylistsService {
  playlists: {[path: string]: Song[]} = {};

  private playlistsObservable = new ReplaySubject(1);

  setPlaylists(playlists: any) {
    for (let i = 0; i < playlists.length; i++) {
      if (!this.playlists[playlists[i].path]) {
        this.playlists[playlists[i].path] = null;
      }
    }
    this.playlistsObservable.next(this.playlists);
  }

  setPlaylist(name: string, playlist: Song[]) {
    this.playlists[name] = playlist;
    this.playlistsObservable.next(this.playlists);
  }

  getPlaylists() {
    return this.playlistsObservable;
  }
}
