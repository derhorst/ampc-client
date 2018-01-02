import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../../shared/config/env.config';

import { Song } from '../models/song.model';

import { QueueService } from '../state/queue.service';
import { CurrentSongService } from '../state/current-song.service';
import { MpdService } from '../websocket/mpd.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-queue',
  templateUrl: 'queue.component.html',
  styleUrls: ['queue.component.css']
})

export class QueueComponent implements OnInit {
  queue: Song[];
  currentSong: Song;
  queueChanged = false;
  selected: {id: number, pos: number} = {id: null, pos: null};

  private _song: ReplaySubject<Song>;

  constructor(private _queue: QueueService, private _currentSong: CurrentSongService, private _mpd: MpdService) {
    this._queue.getQueue().subscribe((songs: Song[]) => {
        this.queue = songs;
        this.queueChanged = true;
      }
    );
    this._song = this._currentSong.getCurrentSong();
    this._song.subscribe(
      (song: Song) => {
        this.currentSong = song;
        this.queueChanged = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.queueChanged = true;
    setTimeout(() => {
      this.queueChanged = true;
    }, 900);
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
    if (this.queueChanged) {
      el.scrollIntoView();

      setTimeout(() => {
        this.queueChanged = false;
      }, 900);
    }
  }

  str_pad_left(string: string, pad: string, length: number) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
  }
}
