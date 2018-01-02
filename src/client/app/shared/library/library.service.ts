import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from '../models/song.model';

@Injectable()
export class LibraryService {
  library: any;
  private libraryObservable: ReplaySubject<any> = new ReplaySubject(1);

  // constructor() { }
  setAlbumArtists(albumArtists: any) {
    if (!this.library) {
      this.library = {};
      for (let i = 0; i < albumArtists.length; i++) {
        this.library[albumArtists[i].album_artist] = null;
      }
    }
    this.libraryObservable.next(this.library);
  }

  setAlbumsOfAlbumArtist(albums: Song[]) {
    if (this.library) {
      this.library[albums[0].album_artist] = albums;
      this.libraryObservable.next(this.library);
    }
  }

  getAlbumArtists() {
    return this.libraryObservable;
  }
}
