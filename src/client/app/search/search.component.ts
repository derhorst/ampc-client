import { Component } from '@angular/core';
import { MpdService } from '../shared/websocket/mpd.service';
import { SearchService } from '../shared/library/search.service';

import { Song } from '../shared/models/song.model';

/**
 * This class represents the lazy loaded SearchComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent {
  searchTerm: string;
  subscriptions: any[] = [];

  songs: Song[];
  selected: {track: string, file: string} = {track: null, file: null};

  constructor(private _mpd: MpdService, private _search: SearchService) {
    this.subscriptions.push(this._search.getSearchResult().subscribe(
        (songs: Song[]) => {
          this.songs = songs;
        },
        err => {
          console.log(err);
        }
      ));
  }

  keyDown(event: any) {
    if (event.keyCode === 13 || event.key === 'Enter') { // enter pressed start search
      this._mpd.sendCommand('search', [this.searchTerm]);
    }
  }

  search() {
    this._mpd.sendCommand('search', [this.searchTerm]);
  }

  addTrack(song: Song) {
    this._mpd.sendCommand('addTrack', [song.file]);
  }

  selectTrack(song: Song) {
    if (this.selected.track && this.selected.file === song.file && this.selected.track === song.track) {
      this.selected.track = null;
      this.selected.file = null;
    } else {
      this.selected.track = song.track;
      this.selected.file = song.file;
    }
  }
}
