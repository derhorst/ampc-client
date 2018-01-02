import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from './../models/song.model';

@Injectable()
export class QueueService {
  private queueObservable: ReplaySubject<Song[]> = new ReplaySubject(1);

  setQueue(songs: Song[]): void {
    this.queueObservable.next(songs);
  }

  getQueue(): ReplaySubject<Song[]> {
    return this.queueObservable;
  }
}
