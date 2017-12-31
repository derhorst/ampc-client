import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Config } from './../../shared/config/env.config';

import { Song } from '../models/song.model';

import { MpdService } from '../websocket/mpd.service';

/**
 * This class represents the navigation bar component.
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

  constructor(private _mpd: MpdService) {
  }

  playAlbum() {
    this._mpd.sendCommand('addArtistAlbum', ['play', this.song.album_artist, this.song.album]);
  }

  queueAlbum() {
    this._mpd.sendCommand('addArtistAlbum', ['enqueue', this.song.album_artist, this.song.album]);
  }
}
