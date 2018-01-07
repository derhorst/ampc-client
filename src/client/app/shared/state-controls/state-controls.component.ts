import { Component, HostListener, Input, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../../shared/config/env.config';

import { StateService } from '../state/state.service';
import { MpdService } from '../websocket/mpd.service';
import { State } from '../models/state.model';
import { Song } from '../models/song.model';


/**
 * This class represents the state controls bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-state-controls',
  templateUrl: 'state-controls.component.html',
  styleUrls: ['state-controls.component.css'],
})

export class StateControlsComponent {
  @Input() state: State;
  @Input() volume: number;

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

  constructor(private _mpd: MpdService) {}

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

  setVolume($event: MouseEvent) {
    if ($event.offsetX + 5 > 100) {
      this.volume = 100;
    } else {
      this.volume = $event.offsetX + 5;
    }
    this._mpd.sendCommand('setVolume', [this.volume]);
  }
}
