import { Component, OnInit, OnDestroy } from '@angular/core';
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
  library: any;
  open: any = {};
  libraryView: string = localStorage.getItem('libraryView');

  subscriptions: any[] = [];

  constructor(private _currentSong: CurrentSongService, private _mpd: MpdService, private _library: LibraryService) {}

  ngOnInit() {
    this.subscriptions.push(this._currentSong.getCurrentSong().subscribe(
      (song: Song) => {
        this.currentSong = song;
      },
      err => {
        console.log(err);
      }
    ));

    if (this.libraryView !== 'albums') {
      this.subscriptions.push(this._library.getAlbumArtists().subscribe(data => {
        this.library = data;
        this.artists = Object.keys(this.library);
      }));
    } else {
      this.subscriptions.push(this._library.getAlbumArtSongs().subscribe(data => {
        this.library = data;
      }));
    }
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
