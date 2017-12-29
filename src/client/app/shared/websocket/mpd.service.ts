import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebsocketService } from './websocket.service';

import { StateService } from '../state/state.service';
import { QueueService } from '../state/queue.service';
import { CurrentSongService } from '../state/current-song.service';

import { Config } from './../../shared/config/env.config';

/**
 * Class used to handle the events emitted by the websocket
 */

@Injectable()
export class MpdService {

  ws: Subject<any>;
  /**
   * Constructor of the logging service
   */
  constructor(private _websocket: WebsocketService, private _state: StateService, private _currentSong: CurrentSongService,
    private _queue: QueueService) {
    this.listen();
  }

  listen() {
    let pcol;
    let u = document.URL;

    /*
    /* We open the websocket encrypted if this page came on an
    /* https:// url itself, otherwise unencrypted
    /*/

    if (u.substring(0, 5) === 'https') {
        pcol = 'wss://';
        u = u.substr(8);
    } else {
        pcol = 'ws://';
        if (u.substring(0, 4) === 'http') {
          u = u.substr(7);
        }
    }

    u = u.split('#')[0];

    if (Config.ENV === 'DEV') {
      this.ws = this._websocket
      .connect('ws://localhost:8080/ws');
    } else {
      this.ws = this._websocket
      .connect(pcol + u + '/ws');
    }

    this.ws.subscribe((response: MessageEvent) => {
      if (response) {
          try {
            const wsData = JSON.parse(response.data);
            if (wsData.type === 'state') {
              this._state.setState(wsData.data);
            }
            if (wsData.type === 'song_change') {
              this._currentSong.setCurrentSong(wsData.data);
            }
            if (wsData.type === 'queue') {
              this._queue.setQueue(wsData.data);
            }
            if (wsData.type === 'artist_albums') {
              this._currentSong.setArtistAlbums(wsData.data);
            }
            if (wsData.type === 'update_queue') {
              this.ws.next('MPD_API_GET_QUEUE,0');
            }

            console.log('WS:', wsData);
          } catch (e) {
            console.log('WS error:', e); // error in the above string (in this case, yes)!
          }
        }
      }, err => {
        console.log('WS Error:', err);
        if (!this.ws.closed) {
          this.ws.unsubscribe();
        }
        this.ws = null;
        this.listen();
      }
    );
  }

  artistChanged(artist: string) {
    if (!this.ws.closed) {
      this.ws.next('MPD_API_GET_ARTIST_ALBUMS,' + artist);
    }
  }
}
