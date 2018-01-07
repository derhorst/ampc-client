import { Component, HostListener, Input, ElementRef } from '@angular/core';

import { Config } from './../../shared/config/env.config';
import { Song } from '../models/song.model';
import { MpdService } from '../websocket/mpd.service';

/**
 * This class represents the progress bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.css'],
})

export class ProgressBarComponent {
  @Input() currentSong: Song;
  @Input() percent: number;

  constructor(private _mpd: MpdService) {
  }

  seek($event: MouseEvent) {
    const setSeek = Math.ceil($event.offsetX / $event.toElement.clientWidth * 100);
    if (this.currentSong && this.currentSong.pos >= 0) {
      const seekVal = Math.ceil(this.currentSong.duration * (setSeek / 100));
      this._mpd.sendCommand('setSeek', [this.currentSong.id, seekVal]);
    }
  }

}
