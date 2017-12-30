import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../../shared/config/env.config';

import { StateService } from '../state/state.service';
import { MpdService } from '../websocket/mpd.service';
import { State } from '../models/state.model';


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
  @Input() showControls: boolean;
  percent = 0;
  state: ReplaySubject<State>;
  playing = false;

  constructor(private _state: StateService, private _mpd: MpdService) {
    this.state = this._state.getState();
    this.state.subscribe(
      (state: State) => {
        this.percent = (state.elapsedTime / state.totalTime) * 100;
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

  playPause() {
    this._mpd.sendCommand('playPause');
  }

  nextSong() {
    this._mpd.sendCommand('nextSong');
  }

  prevSong() {
    this._mpd.sendCommand('prevSong');
  }
}
