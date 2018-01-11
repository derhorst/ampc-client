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
  showRandomAlbums: number = +localStorage.getItem('showRandomAlbums');

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

  submit(albumViewCb: boolean) {
    if (!isNaN(+this.showRandomAlbums)) {
      localStorage.setItem('showRandomAlbums', '' + this.showRandomAlbums);
    }
    if (albumViewCb === true && localStorage.getItem('libraryView') !== 'albums') {
      localStorage.setItem('libraryView', 'albums');
    } else if (albumViewCb === false && localStorage.getItem('libraryView') === 'albums') {
      localStorage.setItem('libraryView', 'artists');
    }
  }

}
