import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowseComponent } from './browse.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'browse', component: BrowseComponent },
      { path: 'browse/:path', component: BrowseComponent },
      { path: 'browse/:path/:path1', component: BrowseComponent },
      { path: 'browse/:path/:path1/:path2', component: BrowseComponent },
      { path: 'browse/:path/:path1/:path2/:path3', component: BrowseComponent }
    ])
  ],
  exports: [RouterModule]
})
export class BrowseRoutingModule { }
