import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { BrowseRoutingModule } from './browse-routing.module';

@NgModule({
  imports: [CommonModule, BrowseRoutingModule],
  declarations: [BrowseComponent],
  exports: [BrowseComponent]
})
export class BrowseModule { }
