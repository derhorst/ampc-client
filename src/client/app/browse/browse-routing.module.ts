import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowseComponent } from './browse.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'browse', component: BrowseComponent }
    ])
  ],
  exports: [RouterModule]
})
export class BrowseRoutingModule { }
