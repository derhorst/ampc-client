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

  showRandomAlbums: number = +localStorage.getItem('showRandomAlbums');

  albumSongs: Song[];
  randomAlbums: Song[] = [];

  constructor(private _currentSong: CurrentSongService, private _mpd: MpdService, private _library: LibraryService) {}

  ngOnInit() {
    this.song = this._currentSong.getCurrentSong();
    this.song.subscribe(
      (song: Song) => {
        this.currentSong = song;
        this._library.getAlbumArtSongs().subscribe(
          (songs: any) => {
              this.albumSongs = songs[this.currentSong.album_artist];
            }
          );
        if (this.showRandomAlbums > 0) {
          this.getRandomAlbums(this.showRandomAlbums);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getRandomAlbums(no: number) {
    this._library.getAlbumArtSongs().subscribe(
      (songs: any) => {
        this.randomAlbums = [];
        for (let i = 0; i < no; i++) {
          const artist =  Object.keys(songs)[Math.floor(Math.random() * Object.keys(songs).length)];
          this.randomAlbums = this.randomAlbums.concat(songs[artist][Math.floor(Math.random() * songs[artist].length)]);
        }
      }
    );
  }
}
