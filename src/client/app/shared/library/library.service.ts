import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from '../models/song.model';

@Injectable()
export class LibraryService {
  library: {[album_artist: string]: {[album: string]: ReplaySubject<Song[]>}};
  albumArtSongs: Song[] = [];
  preViewAlbumArtSongs: Song[] = [];
  private libraryObservable: ReplaySubject<any> = new ReplaySubject(1);
  private albumArtSongsObservable: ReplaySubject<any> = new ReplaySubject(1);
  private preViewAlbumArtSongsObservable: ReplaySubject<any> = new ReplaySubject(1);

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

  setAlbumsOfAlbumArtist(songs: Song[], onlyOneSongPerAlbum?: boolean) {
    let album: Song[] = [];
    for (let i = 0; i < songs.length; i++) {
      if (!this.library) {
        this.library = {};
      }
      // add artist if not already there
      if (!this.library[songs[i].album_artist]) {
        this.library[songs[i].album_artist] = {};
      }
      // add album
      if (!onlyOneSongPerAlbum) {
        if (!this.library[songs[i].album_artist][songs[i].album]) {
          this.library[songs[i].album_artist][songs[i].album] = new ReplaySubject(1);
        }


        if (i === 0 || (i > 1 && (songs[i].album !== songs[i - 1].album) || songs[i].album_artist !== songs[i - 1].album_artist)) {
          if (i > 0) {
            this.library[songs[i - 1].album_artist][songs[i - 1].album].next(album);
            album = [];
          }
          const song: any = {};
          song.album_artist = songs[i].album_artist;
          song.album = songs[i].album;
          song.file = songs[i].file;
          this.albumArtSongs.push(song);
          if (this.albumArtSongs.length < 200) {
            this.preViewAlbumArtSongs.push(song);
          }
        }
        // add song
        album.push(songs[i]);
      }
    }
    this.albumArtSongsObservable.next(this.albumArtSongs);
    this.preViewAlbumArtSongsObservable.next(this.preViewAlbumArtSongs);
  }

  getAlbumsOfArtist(albumArtist: string) {
    if (!this.library) {
      this.library = {};
    }
    return this.library[albumArtist];
  }

  getAlbum(albumArtist: string, album: string): ReplaySubject<Song[]> {
    if (!this.library) {
      this.library = {};
    }
    // add artist if not already there
    if (!this.library[albumArtist]) {
      this.library[albumArtist] = {};
    }
    // add album
    if (!this.library[albumArtist][album]) {
      this.library[albumArtist][album] = new ReplaySubject(1);
    }
    return this.library[albumArtist][album];
  }

  setAlbum(songs: Song[]) {
    if (!this.library) {
      this.library = {};
    }
    // add artist if not already there
    if (!this.library[songs[0].album_artist]) {
      this.library[songs[0].album_artist] = {};
    }
    // add album
    if (!this.library[songs[0].album_artist][songs[0].album]) {
      this.library[songs[0].album_artist][songs[0].album] = new ReplaySubject(1);
    }
    this.library[songs[0].album_artist][songs[0].album].next(songs);
  }

  getAlbumArtSongs() {
    return this.albumArtSongsObservable;
  }

  getpreViewAlbumArtSongs() {
    return this.preViewAlbumArtSongsObservable;
  }

  getAlbumArtists() {
    return this.libraryObservable;
  }
}
