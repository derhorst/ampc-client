import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  imports: [CommonModule, FormsModule, SearchRoutingModule, SharedModule, DragulaModule],
  declarations: [SearchComponent],
  exports: [SearchComponent]
})
export class SearchModule { }
