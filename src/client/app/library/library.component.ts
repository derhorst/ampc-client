import { Component, OnInit } from '@angular/core';
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

export class LibraryComponent implements OnInit {
  song: ReplaySubject<Song>;
  artists: string[];
  currentSong: Song;
  showControls = true;
  library: any;
  open: any = {};

  constructor(private _currentSong: CurrentSongService, private _mpd: MpdService, private _library: LibraryService) {}

  ngOnInit() {
    this.song = this._currentSong.getCurrentSong();
    this.song.subscribe(
      (song: Song) => {
        if (!this.library) {
          this._mpd.sendCommand('getAlbumArtists');
        }
        if (!this.currentSong || this.currentSong.album_artist !== song.album_artist) {
          this._mpd.sendCommand('getArtistAlbums', [song.album_artist]);
        }
        this.currentSong = song;
      },
      err => {
        console.log(err);
      }
    );

    this._library.getAlbumArtists().subscribe(data => {
      this.library = data;
      this.artists = Object.keys(this.library);
    });
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
      this.getArtistAlbums(albumArtist);
      this.open[albumArtist] = true;
    }
  }
}
