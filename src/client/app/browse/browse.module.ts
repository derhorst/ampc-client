import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { BrowseRoutingModule } from './browse-routing.module';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from '../shared/shared.module';
import { GetDirectoryPipe } from './get-directory.pipe';

@NgModule({
  imports: [CommonModule, BrowseRoutingModule, SharedModule, DragulaModule],
  declarations: [BrowseComponent, GetDirectoryPipe],
  exports: [BrowseComponent, GetDirectoryPipe]
})
export class BrowseModule { }
