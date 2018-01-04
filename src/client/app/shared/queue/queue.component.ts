import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../../shared/config/env.config';

import { Song } from '../models/song.model';
import { State } from '../models/state.model';

import { QueueService } from '../state/queue.service';
import { CurrentSongService } from '../state/current-song.service';
import { MpdService } from '../websocket/mpd.service';
import { StateService } from '../state/state.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-queue',
  templateUrl: 'queue.component.html',
  styleUrls: ['queue.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QueueComponent {
  queue: Song[];
  currentSong: Song;
  queueChanged = false;
  selected: {id: number, pos: number} = {id: null, pos: null};
  consume = 0;

  private _song: ReplaySubject<Song>;

  constructor(private _cd: ChangeDetectorRef, private _queue: QueueService, private _state: StateService ,
    private _currentSong: CurrentSongService, private _mpd: MpdService) {
    this._queue.getQueue().subscribe((songs: Song[]) => {
        this.queue = songs;
        this.queueChanged = true;
        this._cd.markForCheck();
      }
    );
    this._song = this._currentSong.getCurrentSong();
    this._song.subscribe(
      (song: Song) => {
        this.currentSong = song;
        this.queueChanged = true;
        this._cd.markForCheck();
      },
      err => {
        console.log(err);
      }
    );

    this._state.getState().subscribe((state: State) => {
      this.consume = state.consume;
    });
  }

  playTrack(song: Song) {
    this._mpd.sendCommand('playTrack', [song.id]);
  }

  selectTrack(song: Song) {
    if (this.selected.pos && this.selected.id === song.id && this.selected.pos === song.pos) {
      this.selected.pos = null;
      this.selected.id = null;
    } else {
      this.selected.pos = song.pos;
      this.selected.id = song.id;
    }
  }

  scroll(el: any) {
    if (this.queueChanged && this.consume === 0) {
      this.queueChanged = false;
      el.scrollIntoView();
      this._cd.markForCheck();
    }
  }

  str_pad_left(string: string, pad: string, length: number) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
  }
}
