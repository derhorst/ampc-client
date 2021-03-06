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
  @Input() state: State;
  @Input() volume = 0;
  @Input() mute = false;
  // state: State;
  @Input() playing = false;
  private eventOptions: boolean|{capture?: boolean, passive?: boolean};

  constructor(private ele: ElementRef, private _mpd: MpdService) {}

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

  toggleMute() {
    if (!this.mute) {
      this._mpd.sendCommand('setVolume', [0]);
      this.mute = true;
    } else {
      this._mpd.sendCommand('setVolume', [this.volume]);
      this.mute = false;
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
