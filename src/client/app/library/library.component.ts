import { Component, OnInit, OnDestroy } from '@angular/core';
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
  styleUrls: ['library.component.css']
})

export class LibraryComponent implements OnInit, OnDestroy {
  song: ReplaySubject<Song>;
  artists: string[];
  currentSong: Song;
  showControls = true;
  library: {[key: string]: Song[]};
  albumArtSongs: Song[];
  open: {[key: string]: boolean} = {};
  libraryView: string = localStorage.getItem('libraryView');
  filter = '';
  selectedAlbumArtist: string;
  selectedAlbum: string;
  album: Song[];

  subscriptions: any[] = [];

  constructor(private _route: ActivatedRoute, private _currentSong: CurrentSongService, private _mpd: MpdService,
    private _library: LibraryService) {}

  ngOnInit() {
    this.subscriptions.push(this._route.params.subscribe((params: {[key: string]: string}) => {
      if (params.albumArtist && !params.album) {
        this.filter = params.albumArtist;
      }
      if (params.albumArtist && params.album) {
        this.selectedAlbumArtist = params.albumArtist;
        this.selectedAlbum = params.album;
        this.getAlbum(this.selectedAlbumArtist, this.selectedAlbum);
      }
    }));

    this.subscriptions.push(this._currentSong.getCurrentSong().subscribe(
      (song: Song) => {
        this.currentSong = song;
      },
      err => {
        console.log(err);
      }
    ));

    this.subscriptions.push(this._library.getAlbumArtists().subscribe(data => {
      this.library = data;
      this.artists = Object.keys(this.library);
    }));

    this.subscriptions.push(this._library.getAlbumArtSongs().subscribe(data => {
      this.albumArtSongs = data;
    }));

  }

  getArtists() {
    if (this.library) {
      return Object.keys(this.library);
    } else {
      return [];
    }
  }

  getArtistAlbums(albumArtist: string) {
    if (!this.library[albumArtist]) {
      this._mpd.sendCommand('getArtistAlbums', [albumArtist]);
    }
  }

  getAlbum(albumArtist: string, album: string) {
//
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
