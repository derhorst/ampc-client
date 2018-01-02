import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, LibraryRoutingModule, SharedModule],
  declarations: [LibraryComponent],
  exports: [LibraryComponent]
})
export class LibraryModule { }
