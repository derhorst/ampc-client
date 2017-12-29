import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from './../models/song.model';

/**
 * This class is used to provide a caching mechanism for workspaces
*/

@Injectable()
export class CurrentSongService {
  private currentSongObservable: ReplaySubject<Song> = new ReplaySubject(1);
  private artistAlbumsObservable: ReplaySubject<Song[]> = new ReplaySubject(1);

  /**
  * constructor of the WorkspaceStore service
  */
  // constructor() { }


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
