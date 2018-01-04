import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../../shared/config/env.config';

import { LibraryService } from '../library/library.service';
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
  @Input()
  set showAlbum(song: Song) {
    if (song && song.album_artist && song.album) {
      this.getAlbum(song);
    }
  }

  libraryView: string = localStorage.getItem('libraryView');
  contrast = 'normal';
  open = 0;
  albumViewOpen = false;
  album: Song[];
  albumDuration = 0;
  subscriptions: any[] = [];

  constructor(private _library: LibraryService) {}

  albumOpen(song: Song) {
    this.getAlbum(song);
  }

  getAlbum(song: Song) {
    this.subscriptions.push(this._library.getAlbum(song.album_artist, song.album).subscribe((songs: Song[]) => {
      this.album = songs;
      this.albumDuration = 0;
      for (let i = 0; i < songs.length; i++) {
          this.albumDuration += songs[i].duration;
      }
      this.albumViewOpen = true;
    }));
  }
}
