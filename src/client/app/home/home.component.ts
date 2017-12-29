import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { State } from '../shared/models/state.model';
import { Song } from '../shared/models/song.model';

import { StateService } from '../shared/state/state.service';
import { CurrentSongService } from '../shared/state/current-song.service';
import { MpdService } from '../shared/websocket/mpd.service';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  percent = 0;
  state: ReplaySubject<State>;
  song: ReplaySubject<Song>;
  currentSong: Song;

  constructor(private _state: StateService, private _currentSong: CurrentSongService, private _mpd: MpdService) {}

  ngOnInit() {
    this.state = this._state.getState();
    this.state.subscribe(
      (state: State) => {
        this.percent = (state.elapsedTime / state.totalTime) * 100;
      },
      err => {
        console.log(err);
      }
    );

    this.song = this._currentSong.getCurrentSong();
    this.song.subscribe(
      (song: Song) => {
        if (!this.currentSong || this.currentSong.album_artist !== song.album_artist) {
          this._mpd.artistChanged(song.album_artist);
        }
        this.currentSong = song;
      },
      err => {
        console.log(err);
      }
    );
  }
}
