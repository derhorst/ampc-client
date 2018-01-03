import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, SettingsRoutingModule],
  declarations: [SettingsComponent],
  exports: [SettingsComponent]
})
export class SettingsModule { }
