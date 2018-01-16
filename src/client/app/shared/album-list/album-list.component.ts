import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { DragulaService } from 'ng2-dragula';

import { Config } from './../../shared/config/env.config';

import { LibraryService } from '../library/library.service';
import { MpdService } from '../websocket/mpd.service';
import { Song } from '../models/song.model';

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
  @Input() songs: Song[];
  @Input() currentSong: Song;
  @Input() inLibraryView: boolean;
  @Input() libraryGrouping: string;
  @Input() caption: string;
  @Input()
  set showAlbum(song: Song) {
    if (song && song.album_artist && song.album) {
      this.getAlbum(song);
    }
  }

  libraryView: string = localStorage.getItem('libraryView');
  contrast = 'normal';
  open = 0;
  albumViewOpen: Song;
  album: Song[];
  albumDuration = 0;
  selected: {track: string, file: string} = {track: null, file: null};
  subscriptions: any[] = [];

  constructor(private _library: LibraryService, private _mpd: MpdService, private _location: Location) {}

  albumOpen(song: Song) {
    this.albumViewOpen = song;
    this.getAlbum(song);
  }

  getAlbum(song: Song) {
    this.subscriptions.push(this._library.getAlbum(song.album_artist, song.album).subscribe((songs: Song[]) => {
      this.album = songs;
      this.albumDuration = 0;
      for (let i = 0; i < songs.length; i++) {
          this.albumDuration += songs[i].duration;
      }
      this.albumViewOpen = songs[0];
    }));
  }

  playTrack(song: Song) {
    this._mpd.sendCommand('addPlayTrack', [song.file]);
  }

  selectTrack(song: Song) {
    if (this.selected.track && this.selected.file === song.file && this.selected.track === song.track) {
      this.selected.track = null;
      this.selected.file = null;
    } else {
      this.selected.track = song.track;
      this.selected.file = song.file;
    }
  }

  closeAlbumView() {
    this.albumViewOpen = null;
    this._location.replaceState('library');
  }
}
