import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { DragulaService } from 'ng2-dragula';

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

export class QueueComponent implements OnInit {
  queue: Song[];
  currentSong: Song;
  queueChanged = false;
  selected: {id: number, pos: number} = {id: null, pos: null};
  consume = 0;

  private _song: ReplaySubject<Song>;

  constructor(private _dragulaService: DragulaService, private _cd: ChangeDetectorRef, private _queue: QueueService,
    private _state: StateService, private _currentSong: CurrentSongService, private _mpd: MpdService) {}

  ngOnInit() {
    if (!this._dragulaService.find('queue-container')) {
      this._dragulaService.setOptions('queue-container', {
          removeOnSpill: true,
          accepts: (el: Element, target: Element, source: Element, sibling: Element): boolean => {
            if (target.classList.contains('album-list')) {
              return false;
            } else {
              return true;
            }
          },
          copy: (el: Element, target: Element, source: Element, sibling: Element): boolean => {
            return !el.classList.contains('song-queue');
          }
      });
    }

    this._dragulaService.remove.subscribe((value: any) => {
      this.onRemove(value.slice(1));
    });

    this._dragulaService.drop.subscribe((value: any) => {
      this.onDrop(value.slice(1));
    });

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

  private onRemove(args: any) {
    const [el, source] = args;
    this._mpd.sendCommand('rmTrack', [el.attributes['data-pos'].value]);
  }

  private onDrop(args: any) {
    const [el, target, source, sibling] = args;
    // element moved in queue
    if (el.attributes['data-pos']) {
      const from: number = +el.attributes['data-pos'].value;
      let to;
      for (let i = 0; i < target.children.length; i++) {
        // console.log(target.children[i].attributes['data-pos'].value);
        if (i === 0 && +target.children[i].attributes['data-pos'].value === from) {
          to = 0;
          break;
        }
        if (+target.children[i].attributes['data-pos'].value === from) {
          to = +target.children[i - 1].attributes['data-pos'].value + 1;
        }
      }
      if (from > to) {
        this._mpd.sendCommand('moveTrack', [from, to]);
      } else if (from < to) {
        this._mpd.sendCommand('moveTrack', [from, to - 1]);
      }
    } else {
      // element inserted into queue
      // inserted at the end
      if (!sibling) {
        this._mpd.sendCommand('addTrack', [el.attributes['data-file'].value]);
        el.remove();
      } else {
        this._mpd.sendCommand('addTrackTo', [el.attributes['data-file'].value, +sibling.attributes['data-pos'].value]);
        el.remove();
      }
    }
  }
}
