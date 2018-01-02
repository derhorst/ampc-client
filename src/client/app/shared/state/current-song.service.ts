import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from './../models/song.model';

@Injectable()
export class CurrentSongService {
  private currentSongObservable: ReplaySubject<Song> = new ReplaySubject(1);
  private artistAlbumsObservable: ReplaySubject<Song[]> = new ReplaySubject(1);

  setCurrentSong(song: Song): void {
    this.currentSongObservable.next(song);
  }

  getCurrentSong(): ReplaySubject<Song> {
    return this.currentSongObservable;
  }

  setArtistAlbums(songs: Song[]): void {
    this.artistAlbumsObservable.next(songs);
  }

  getArtistAlbums(): ReplaySubject<Song[]> {
    return this.artistAlbumsObservable;
  }
}
