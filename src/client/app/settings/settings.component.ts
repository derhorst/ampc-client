import { Component, OnInit } from '@angular/core';

/**
 * This class represents the lazy loaded BrowseComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent implements OnInit {
  albumView = false;

  ngOnInit() {
    if (localStorage.getItem('libraryView') === 'albums') {
      this.albumView = true;
    }
  }

  toggleAlbumView() {
    if (localStorage.getItem('libraryView') === 'albums') {
      localStorage.setItem('libraryView', 'artist');
    } else {
      localStorage.setItem('libraryView', 'albums');
    }
  }

}
