import { Component, OnInit } from '@angular/core';
import { MpdService } from './shared/websocket/mpd.service';
import { CurrentSongService } from './shared/state/current-song.service';
import { Config } from './shared/config/env.config';
import './operators';

import { Song } from './shared/models/song.model';

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
  constructor(private _mpd: MpdService, private _currentSong: CurrentSongService) {
    console.log('Environment config', Config);
  }

  ngOnInit() {
    this._currentSong.getCurrentSong().subscribe(
        (song: Song) => {
          if (!this.currentSong || this.currentSong.album_artist !== song.album_artist) {
            this._mpd.sendCommand('getArtistAlbums', [song.album_artist]);
          }
          this.currentSong = song;
        },
        err => {
          console.log(err);
        }
      );
  }
}
