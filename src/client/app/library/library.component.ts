import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from '../shared/models/song.model';

import { LibraryService } from '../shared/library/library.service';
import { MpdService } from '../shared/websocket/mpd.service';
import { CurrentSongService } from '../shared/state/current-song.service';

/**
 * This class represents the lazy loaded SearchComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-library',
  templateUrl: 'library.component.html',
  styleUrls: ['library.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LibraryComponent implements OnInit, OnDestroy {
  song: ReplaySubject<Song>;
  artists: string[];
  currentSong: Song;
  showControls = true;
  library: {[key: string]: Song[]};
  albumArtSongs: {[album_artist: string]: Song[]};
  open: {[key: string]: boolean} = {};
  libraryView: string = localStorage.getItem('libraryView');
  filter = '';
  selectedAlbumArtist: string;
  selectedAlbum: string;
  album: Song[];
  showAlbum: any;

  subscriptions: any[] = [];

  constructor(private _cd: ChangeDetectorRef, private _route: ActivatedRoute, private _currentSong: CurrentSongService,
    private _mpd: MpdService, private _library: LibraryService) {}

  ngOnInit() {
    this.subscriptions.push(this._route.params.subscribe((params: {[key: string]: string}) => {
      if (params.albumArtist && !params.album) {
        this.filter = params.albumArtist;
      }
      if (params.albumArtist && params.album) {
        this.selectedAlbumArtist = params.albumArtist;
        this.selectedAlbum = params.album;
        this.showAlbum = {'album_artist': this.selectedAlbumArtist, album: this.selectedAlbum};
        this._cd.markForCheck();
      }
    }));

    if (this.libraryView === 'albums') {
      this.subscriptions.push(this._library.getpreViewAlbumArtSongs().subscribe(data => {
        this.albumArtSongs = data;
        this.artists = Object.keys(this.albumArtSongs);
        this._cd.markForCheck();
        setTimeout(() => {
          this.subscriptions.push(this._library.getAlbumArtSongs().subscribe(data => {
            this.albumArtSongs = data;
            this.artists = Object.keys(this.albumArtSongs);
            this._cd.markForCheck();
          }));
        }, 50);
      }));
    } else {
      this.subscriptions.push(this._library.getAlbumArtSongs().subscribe(data => {
        this.albumArtSongs = data;
        this.artists = Object.keys(this.albumArtSongs);
        this._cd.markForCheck();
      }));
    }
  }

  getSongs() {
    if (this.artists) {
      let songs: Song[] = [];
      for (let i = 0; i < this.artists.length; i++) {
          songs = songs.concat(this.albumArtSongs[this.artists[i]]);
      }
      return songs;
    }
    return [];
  }

  getArtists() {
    if (this.library) {
      return Object.keys(this.library);
    } else {
      return [];
    }
  }

  getArtistAlbums(albumArtist: string) {
    if (this.library && !this.library[albumArtist]) {
      this._mpd.sendCommand('getArtistAlbums', [albumArtist]);
    }
  }

  toggleAlbumView(albumArtist: string) {
    if (this.open[albumArtist]) {
      delete this.open[albumArtist];
    } else {
      this.open[albumArtist] = true;
      if (this.libraryView !== 'albums') {
        this.getArtistAlbums(albumArtist);
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
