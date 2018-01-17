import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MpdService } from '../shared/websocket/mpd.service';
import { BrowseService } from '../shared/library/browse.service';

import { Song } from '../shared/models/song.model';

/**
 * This class represents the lazy loaded BrowseComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-browse',
  templateUrl: 'browse.component.html',
  styleUrls: ['browse.component.css']
})
export class BrowseComponent implements OnInit {
  subscriptions: any[] = [];
  path = '/';
  params: {[key: string]: string};

  browseData = {};
  directories: any[] = [];
  songs: Song[] = [];

  selected: {track: string, file: string} = {track: null, file: null};

  constructor(private _route: ActivatedRoute, private _mpd: MpdService, private _browse: BrowseService) {

  }
  ngOnInit() {
    this.subscriptions.push(this._route.params.subscribe((params: {[key: string]: string}) => {
      if (params.path) {
        this.params = params;
        this.path = params.path;
        if (params.path1 && params.path2 && params.path3) {
          this.path = params.path + '/' + params.path1 +  '/' + params.path2 +  '/' + params.path3;
        } else if (params.path1 && params.path2) {
          this.path = params.path + '/' + params.path1 +  '/' + params.path2;
        } else if (params.path1) {
          this.path = params.path + '/' + params.path1;
        }
        setTimeout(() => {
          this._mpd.sendCommand('getBrowse', [0, this.path]);
        }, 50);
      } else {
        this.path = '/';
        setTimeout(() => {
          this._mpd.sendCommand('getBrowse', [0, this.path]);
        }, 0);

      }
    }));


    //
    this.subscriptions.push(this._browse.getBrowseData().subscribe((data: any) => {
      if (data[this.path]) {
        this.directories = Object.keys(data[this.path].directories);
        this.songs = data[this.path].songs;
      }
    }));
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

  addTrack(song: Song) {
    this._mpd.sendCommand('addTrack', [song.file]);
  }

  addAll() {
    this._mpd.sendCommand('addTrack', [this.path]);
  }

  playAll() {
    this._mpd.sendCommand('addPlay', [this.path]);
  }
}
