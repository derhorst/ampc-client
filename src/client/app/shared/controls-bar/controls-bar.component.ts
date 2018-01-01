import { Component, HostListener, Input, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../../shared/config/env.config';

import { StateService } from '../state/state.service';
import { MpdService } from '../websocket/mpd.service';
import { State } from '../models/state.model';
import { Song } from '../models/song.model';


/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-controls-bar',
  templateUrl: 'controls-bar.component.html',
  styleUrls: ['controls-bar.component.css'],
})

export class ControlsBarComponent {
  @Input() showControls = true;
  @Input() currentSong: Song;
  percent = 0;
  volume = 0;
  mute = false;
  state: State;
  playing = false;
  private initPointX: number;
  private initPointY: number;
  private eventOptions: boolean|{capture?: boolean, passive?: boolean};

  constructor(private ele: ElementRef, private _state: StateService, private _mpd: MpdService) {
    this._state.getState().subscribe(
      (state: State) => {
        this.state = state;
        this.percent = (state.elapsedTime / state.totalTime) * 100;
        if (!this.mute || state.volume > 0) {
          this.volume = state.volume;
        }
        if (state.state === 2) {
          this.playing = true;
        } else {
          this.playing = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  @HostListener('mousewheel', ['$event'])
  scroll($event: any) {
      if ($event.deltaY < 0) {
        /* volume up */
        if (this.volume + 5 > 100) {
          this.volume = 100;
        } else {
          this.volume += 5;
        }
        this._mpd.sendCommand('setVolume', [this.volume]);
      } else {
        /* volume down */
        if (this.volume - 5 < 0) {
          this.volume = 0;
        } else {
          this.volume -= 5;
        }
        this._mpd.sendCommand('setVolume', [this.volume]);
      }
  }

  playPause() {
    this._mpd.sendCommand('playPause');
    this.playing = !this.playing;
  }

  nextSong() {
    this._mpd.sendCommand('nextSong');
  }

  prevSong() {
    this._mpd.sendCommand('prevSong');
  }

  setVolume($event: MouseEvent) {
    if ($event.offsetX + 5 > 100) {
      this.volume = 100;
    } else {
      this.volume = $event.offsetX + 5;
    }
    this._mpd.sendCommand('setVolume', [this.volume]);
  }

  toggleMute() {
    if (!this.mute) {
      this._mpd.sendCommand('setVolume', [0]);
      this.mute = true;
    } else {
      this._mpd.sendCommand('setVolume', [this.volume]);
      this.mute = false;
    }
  }

  seek($event: MouseEvent) {
    const setSeek = Math.ceil($event.offsetX / $event.toElement.clientWidth * 100);
    if (this.currentSong && this.currentSong.pos >= 0) {
      const seekVal = Math.ceil(this.currentSong.duration * (setSeek / 100));
      this._mpd.sendCommand('setSeek', [this.currentSong.id, seekVal]);
    }
  }

  toggleConsume() {
    if (this.state.consume === 1) {
      this.state.consume = 0;
      this._mpd.sendCommand('toggleConsume', [0]);
    } else {
      this.state.consume = 1;
      this._mpd.sendCommand('toggleConsume', [1]);
    }
  }

  toggleRandom() {
    if (this.state.random === 1) {
      this.state.random = 0;
      this._mpd.sendCommand('toggleRandom', [0]);
    } else {
      this.state.random = 1;
      this._mpd.sendCommand('toggleRandom', [1]);
    }
  }

  toggleSingle() {
    if (this.state.single === 1) {
      this.state.single = 0;
      this._mpd.sendCommand('toggleSingle', [0]);
    } else {
      this.state.single = 1;
      this._mpd.sendCommand('toggleSingle', [1]);
    }
  }

  toggleRepeat() {
    if (this.state.repeat === 1) {
      this.state.repeat = 0;
      this._mpd.sendCommand('toggleRepeat', [0]);
    } else {
      this.state.repeat = 1;
      this._mpd.sendCommand('toggleRepeat', [1]);
    }
  }
}
