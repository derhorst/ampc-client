import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LibraryFilterPipe } from './library-filter.pipe';
import { AlbumViewFilterPipe } from './album-view-filter.pipe';
import { ArtistViewFilterPipe } from './artist-view-filter.pipe';
import { FilterArtistAlbumsPipe } from './filter-artist-albums.pipe';

@NgModule({
  imports: [CommonModule, LibraryRoutingModule, FormsModule, SharedModule],
  declarations: [LibraryComponent, LibraryFilterPipe, AlbumViewFilterPipe, ArtistViewFilterPipe, FilterArtistAlbumsPipe],
  exports: [LibraryComponent, LibraryFilterPipe, AlbumViewFilterPipe, ArtistViewFilterPipe, FilterArtistAlbumsPipe]
})
export class LibraryModule { }
