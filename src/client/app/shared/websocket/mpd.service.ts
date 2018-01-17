import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebsocketService } from './websocket.service';

import { StateService } from '../state/state.service';
import { QueueService } from '../state/queue.service';
import { CurrentSongService } from '../state/current-song.service';
import { LibraryService } from '../library/library.service';
import { PlaylistsService } from '../library/playlists.service';
import { BrowseService } from '../library/browse.service';

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
    private _queue: QueueService, private _library: LibraryService, private _playlists: PlaylistsService, private _browse: BrowseService) {
    this.listen();
  }

  listen() {
    let pcol;
    let u = document.URL;
    let connected = false;

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
            if (!connected) {
              connected = true;
              this.sendCommand('sendListAllMeta');
            }
            const wsData = JSON.parse(response.data);
            switch (wsData.type) {
              case 'state':
                this._state.setState(wsData.data);
                break;
              case 'song_change':
                this._currentSong.setCurrentSong(wsData.data);
                break;
              case 'queue':
                this._queue.setQueue(wsData.data);
                break;
              case 'song_change':
                this._currentSong.setCurrentSong(wsData.data);
                break;
              case 'artist_albums':
                this._currentSong.setArtistAlbums(wsData.data);
                this._library.setAlbumsOfAlbumArtist(wsData.data, true);
                break;
              case 'update_queue':
                this.sendCommand('updateQueue');
                break;
              case 'album_artists':
                this._library.setAlbumArtists(wsData.data);
                break;
              case 'all_meta':
                this._library.setAlbumsOfAlbumArtist(wsData.data, false);
                break;
              case 'playlists':
                this._playlists.setPlaylists(wsData.data);
                break;
              case 'playlist':
                this._playlists.setPlaylist(wsData.name, wsData.data);
                break;
              case 'browse':
                this._browse.setBrowseData(wsData.path, wsData.data);
                break;
              default:
            }
            // console.log('WS:', wsData);
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

  sendCommand(
    command:
    'getArtistAlbums'
    | 'playPause'
    | 'nextSong'
    | 'prevSong'
    | 'addTrack'
    | 'addPlayTrack'
    | 'addArtistAlbum'
    | 'setVolume'
    | 'setSeek'
    | 'toggleConsume'
    | 'toggleRandom'
    | 'toggleSingle'
    | 'toggleRepeat'
    | 'playTrack'
    | 'addPlay'
    | 'getAlbumArtists'
    | 'updateQueue'
    | 'rmTrack'
    | 'moveTrack'
    | 'sendListAllMeta'
    | 'getBrowse'
    | 'listPlaylists'
    | 'listPlaylistMeta'
    | 'addTrackTo'
    | 'addPlaylist'
    | 'playPlaylist'
    ,
    args?: any[]) {
    if (!this.ws.closed) {
      switch (command) {
        case 'getArtistAlbums':
          this.ws.next('MPD_API_GET_ARTIST_ALBUMS,' + args[0]);
          break;
        case 'playPause':
          this.ws.next('MPD_API_SET_PAUSE');
          break;
        case 'nextSong':
          this.ws.next('MPD_API_SET_NEXT');
          break;
        case 'prevSong':
          this.ws.next('MPD_API_SET_PREV');
          break;
        case 'addTrack':
          this.ws.next('MPD_API_ADD_TRACK,' + args[0]);
          break;
        case 'addPlayTrack':
          this.ws.next('MPD_API_ADD_PLAY_TRACK,' + args[0]);
          break;
        case 'addArtistAlbum':
          this.ws.next('MPD_API_ADD_ARTIST_ALBUM,' + args[0] + ',' + args[1].replace(/,/g, '^,') + ',' + args[2].replace(/,/g, '^,'));
          break;
        case 'setVolume':
          this.ws.next('MPD_API_SET_VOLUME,' + args[0]);
          break;
        case 'setSeek':
          this.ws.next('MPD_API_SET_SEEK,' + args[0] + ',' + args[1]);
          break;
        case 'toggleConsume':
          this.ws.next('MPD_API_TOGGLE_CONSUME,' + args[0]);
          break;
        case 'toggleRandom':
          this.ws.next('MPD_API_TOGGLE_RANDOM,' + args[0]);
          break;
        case 'toggleSingle':
          this.ws.next('MPD_API_TOGGLE_SINGLE,' + args[0]);
          break;
        case 'toggleRepeat':
          this.ws.next('MPD_API_TOGGLE_REPEAT,' + args[0]);
          break;
        case 'playTrack':
          this.ws.next('MPD_API_PLAY_TRACK,' + args[0]);
          break;
        case 'addPlay':
          this.ws.next('MPD_API_ADD_PLAY,' + args[0]);
          break;
        case 'getAlbumArtists':
          this.ws.next('MPD_API_GET_ALBUM_ARTISTS');
          break;
        case 'updateQueue':
          this.ws.next('MPD_API_GET_QUEUE,0');
          break;
        case 'rmTrack':
          this.ws.next('MPD_API_RM_TRACK_POS,' + args[0]);
          break;
        case 'moveTrack':
          this.ws.next('MPD_API_MOVE_TRACK_POS,' + args[0] + ',' + args[1]);
          break;
        case 'sendListAllMeta':
          this.ws.next('MPD_API_SEND_LIST_ALL_META');
          break;
        case 'listPlaylists':
          this.ws.next('MPD_SEND_LIST_PLAYLISTS');
          break;
        case 'getBrowse':
          this.ws.next('MPD_API_GET_BROWSE,' + args[0] + ',' + args[1]);
          break;
        case 'listPlaylistMeta':
          this.ws.next('MPD_SEND_LIST_PLAYLIST_META,' + args[0]);
          break;
        case 'addTrackTo':
          this.ws.next('MPD_API_ADD_TRACK_TO,' + args[1] + ',' + args[0]);
          break;
        case 'addPlaylist':
          this.ws.next('MPD_API_ADD_PLAYLIST,' + args[0]);
          break;
        case 'playPlaylist':
          this.ws.next('MPD_API_PLAY_PLAYLIST,' + args[0]);
          break;
        default:
          console.log('command not found:', command);
      }
    }
  }
}
