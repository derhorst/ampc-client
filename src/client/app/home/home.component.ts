import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from '../shared/models/song.model';

import { CurrentSongService } from '../shared/state/current-song.service';
import { MpdService } from '../shared/websocket/mpd.service';
import { LibraryService } from '../shared/library/library.service';
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

  song: ReplaySubject<Song>;
  currentSong: Song;
  showControls = true;

  albumSongs: Song[];

  constructor(private _currentSong: CurrentSongService, private _mpd: MpdService, private _library: LibraryService) {}

  ngOnInit() {
    this.song = this._currentSong.getCurrentSong();
    this.song.subscribe(
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

    this._currentSong.getArtistAlbums().subscribe((songs: Song[]) => {
        this.albumSongs = songs;
      }
    );
  }
}
