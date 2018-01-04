import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Config } from './../../shared/config/env.config';

import { Song } from '../models/song.model';

import { MpdService } from '../websocket/mpd.service';

/**
 * This class represents the cover component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-cover',
  templateUrl: 'cover.component.html',
  styleUrls: ['cover.component.css'],
})


export class CoverComponent {
  @Input() song: Song;
  @Input() contrast: 'normal' | 'low' | 'high' = 'normal';
  @Input() showControls = true;
  @Input() inLibraryView = false;
  @Output() showSongs = new EventEmitter();

  mouseover: boolean;

  @HostListener('mouseover')
  onMouseOver() {
    this.mouseover = true;
  }

  constructor(private _mpd: MpdService, private _router: Router) {
  }

  playAlbum() {
    this._mpd.sendCommand('addArtistAlbum', ['play', this.song.album_artist, this.song.album]);
  }

  queueAlbum() {
    this._mpd.sendCommand('addArtistAlbum', ['enqueue', this.song.album_artist, this.song.album]);
  }

  toggleShowSongs() {
    this.showSongs.emit(this.song);
    if (!this.inLibraryView) {
      this._router.navigateByUrl('/library/' + this.song.album_artist + '/' + this.song.album);
    }
  }
}
