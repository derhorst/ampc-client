import { Component } from '@angular/core';
import { MpdService } from './shared/websocket/mpd.service';
import { Config } from './shared/config/env.config';
import './operators';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  constructor(private _mpd: MpdService) {
    console.log('Environment config', Config);
  }
}
