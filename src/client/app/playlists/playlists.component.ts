import { Component, OnInit, OnDestroy } from '@angular/core';
import { MpdService } from '../shared/websocket/mpd.service';

import { PlaylistsService } from '../shared/library/playlists.service';
import { Song } from '../shared/models/song.model';

/**
 * This class represents the lazy loaded PlaylistComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-playlists',
  templateUrl: 'playlists.component.html',
  styleUrls: ['playlists.component.css']
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  subscriptions: any[] = [];
  playlists: string[];
  playlistSongs: {[name: string]: Song[]} = {};
  open: {[name: string]: boolean} = {};

  constructor(private _mpd: MpdService, private _playlists: PlaylistsService) {}

  ngOnInit() {
    setTimeout(() => {
      this._mpd.sendCommand('listPlaylists');
    }, 0);

    this.subscriptions.push(this._playlists.getPlaylists().subscribe((data: {[name: string]: Song[]}) => {
      console.log(data);
      this.playlists = Object.keys(data);
      for (let i = 0; i < this.playlists.length; i++) {
          if (data[this.playlists[i]]) {
            this.playlistSongs[this.playlists[i]] = data[this.playlists[i]];
          }
      }
    }));
  }

  togglePlaylist(name: string) {
    if (this.open[name]) {
      delete this.open[name];
    } else {
      this.open[name] = true;
      if (!this.playlistSongs[name]) {
        this._mpd.sendCommand('listPlaylistMeta', [name]);
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
