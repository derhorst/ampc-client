import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from '../models/song.model';

@Injectable()
export class LibraryService {
  library: any;
  albumArtSongs: Song[] = [];
  private libraryObservable: ReplaySubject<any> = new ReplaySubject(1);
  private albumArtSongsObservable: ReplaySubject<any> = new ReplaySubject(1);

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

  setAllMeta(songs: Song[]) {
    for (let i = 0; i < songs.length; i++) {
      if (!this.library) {
        this.library = {};
      }
      // add artist if not already there
      if (!this.library[songs[i].album_artist]) {
        this.library[songs[i].album_artist] = {};
      }
      // add album
      if (!this.library[songs[i].album_artist][songs[i].album]) {
        this.library[songs[i].album_artist][songs[i].album] = [];
      }
      // add song
      this.library[songs[i].album_artist][songs[i].album].push(songs[i]);
      if (i === 0 || (i > 1 && (songs[i].album !== songs[i - 1].album) || songs[i].album_artist !== songs[i - 1].album_artist)) {
        this.albumArtSongs.push(songs[i]);
      }
    }
    this.albumArtSongsObservable.next(this.albumArtSongs);
    console.log('META', this.library);
  }

  // compare(a: Song, b: Song) {
  //   console.log('comp')
  //   if (a.album_artist < b.album_artist)
  //     return -1;
  //   if (a.album_artist > b.album_artist)
  //     return 1;
  //   return 0;
  // }

  getAlbumArtSongs() {
    return this.albumArtSongsObservable;
  }

  getAlbumArtists() {
    return this.libraryObservable;
  }
}
