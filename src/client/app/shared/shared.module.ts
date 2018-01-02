import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InlineSVGModule } from 'ng-inline-svg';

import { WebsocketService } from './websocket/websocket.service';
import { MpdService } from './websocket/mpd.service';
import { StateService } from './state/state.service';
import { CurrentSongService } from './state/current-song.service';
import { QueueService } from './state/queue.service';
import { LibraryService } from './library/library.service';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QueueComponent } from './queue/queue.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { ControlsBarComponent } from './controls-bar/controls-bar.component';
import { CoverComponent } from './cover/cover.component';

import { YearPipe } from './state/year.pipe';
import { FormatDurationPipe } from './state/format-duration.pipe';
import { GetCoverUrlPipe } from './state/get-cover-url.pipe';
import { DuplicateAlbumFilterPipe } from './state/duplicate-album-filter.pipe';
import { TrackNumberPipe } from './queue/track-number.pipe';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, InlineSVGModule],
  declarations: [ToolbarComponent, NavbarComponent, QueueComponent, YearPipe, FormatDurationPipe,
     GetCoverUrlPipe, AlbumListComponent, DuplicateAlbumFilterPipe, ControlsBarComponent, CoverComponent, TrackNumberPipe],
  exports: [ToolbarComponent, NavbarComponent, QueueComponent, YearPipe, FormatDurationPipe, GetCoverUrlPipe,
    CommonModule, FormsModule, RouterModule, AlbumListComponent, DuplicateAlbumFilterPipe, ControlsBarComponent, CoverComponent,
     TrackNumberPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [WebsocketService, MpdService, StateService, CurrentSongService, QueueService, LibraryService]
    };
  }
}
