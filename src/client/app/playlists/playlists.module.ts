import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, PlaylistsRoutingModule, FormsModule, SharedModule],
  declarations: [PlaylistsComponent],
  exports: [PlaylistsComponent]
})
export class PlaylistsModule { }
