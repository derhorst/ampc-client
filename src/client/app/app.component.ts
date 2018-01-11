import { Component, OnInit } from '@angular/core';
import { MpdService } from './shared/websocket/mpd.service';
import { CurrentSongService } from './shared/state/current-song.service';
import { LibraryService } from './shared/library/library.service';
import { StateService } from './shared/state/state.service';
import { Config } from './shared/config/env.config';
import './operators';

import { Song } from './shared/models/song.model';
import { State } from './shared/models/state.model';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  currentSong: Song;
  state: State;
  percent: number;
  volume: number;
  mute = false;
  playing = false;
  showControls = true;
  constructor(private _mpd: MpdService, private _currentSong: CurrentSongService, private _library: LibraryService,
    private _state: StateService) {
    console.log('Environment config', Config);
  }

  ngOnInit() {
    if (!localStorage.getItem('showRandomAlbums')) {
      localStorage.setItem('showRandomAlbums', '' + 4);
    }
    this._currentSong.getCurrentSong().subscribe(
        (song: Song) => {
          // if (localStorage.getItem('libraryView') !== 'albums') {
          //   this._mpd.sendCommand('getAlbumArtists');
          // }
          if (!this.currentSong || this.currentSong.album_artist !== song.album_artist) {
            this._mpd.sendCommand('getArtistAlbums', [song.album_artist]);
          }
          this.currentSong = song;
        },
        err => {
          console.log(err);
        }
      );
    this._state.getState().subscribe(
      (state: State) => {
        this.state = state;
        this.percent = (state.elapsedTime / state.totalTime) * 100;
        if (!this.mute || state.volume > 0) {
          this.volume = state.volume;
        }
        if (state.state === 2) {
          this.playing = true;
        } else {
          this.playing = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
