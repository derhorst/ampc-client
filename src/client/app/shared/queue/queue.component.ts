import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../../shared/config/env.config';

import { Song } from '../models/song.model';

import { QueueService } from '../state/queue.service';
import { CurrentSongService } from '../state/current-song.service';

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

  private _song: ReplaySubject<Song>;

  constructor(private _queue: QueueService, private _currentSong: CurrentSongService) {
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
