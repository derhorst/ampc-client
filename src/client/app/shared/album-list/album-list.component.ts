import { Component, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../../shared/config/env.config';

import { Song } from '../models/song.model';

import { CurrentSongService } from '../state/current-song.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-album-list',
  templateUrl: 'album-list.component.html',
  styleUrls: ['album-list.component.css'],
})

export class AlbumListComponent {
  songs: Song[];
  currentSong: Song;

  private _song: ReplaySubject<Song>;

  constructor(private _currentSong: CurrentSongService) {
    this._currentSong.getArtistAlbums().subscribe((songs: Song[]) => {
        this.songs = songs;
      }
    );

    this._currentSong.getCurrentSong().subscribe(
      (song: Song) => {
        this.currentSong = song;
      },
      err => {
        console.log(err);
      }
    );
  }
}
