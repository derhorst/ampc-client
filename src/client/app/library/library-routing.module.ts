import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryComponent } from './library.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'library', component: LibraryComponent },
      { path: 'library/:albumArtist', component: LibraryComponent },
      { path: 'library/:albumArtist/:album', component: LibraryComponent }
    ])
  ],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
