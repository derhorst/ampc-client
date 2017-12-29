import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Song } from './../models/song.model';

/**
 * This class is used to provide a caching mechanism for workspaces
*/

@Injectable()
export class QueueService {
  private queueObservable: ReplaySubject<Song[]> = new ReplaySubject(1);

  /**
  * constructor of the WorkspaceStore service
  */
  // constructor() { }


  setQueue(songs: Song[]): void {
    this.queueObservable.next(songs);
  }

  getQueue(): ReplaySubject<Song[]> {
    return this.queueObservable;
  }
}
