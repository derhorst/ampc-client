import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { BrowseRoutingModule } from './browse-routing.module';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, BrowseRoutingModule, SharedModule, DragulaModule],
  declarations: [BrowseComponent],
  exports: [BrowseComponent]
})
export class BrowseModule { }
