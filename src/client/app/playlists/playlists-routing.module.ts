import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlaylistsComponent } from './playlists.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'playlists', component: PlaylistsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
