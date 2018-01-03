import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../../shared/config/env.config';

import { Song } from '../models/song.model';



/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-album-list',
  templateUrl: 'album-list.component.html',
  styleUrls: ['album-list.component.css'],
})

export class AlbumListComponent {
  @Input() songs: Song[];
  @Input() currentSong: Song;
  @Input() library = true;

  libraryView: string = localStorage.getItem('libraryView');
}
