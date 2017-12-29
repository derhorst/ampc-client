import { Pipe, PipeTransform } from '@angular/core';
import { Song } from './../models/song.model';

@Pipe({
  name: 'filterDuplicate'
})
export class DuplicateAlbumFilterPipe implements PipeTransform {

  transform(songs: Song[], currentAlbum?: string, shuffle?: boolean): Song[] {
    if (songs) {
      const newSongs: Song[] = [];
      for (let i = 0; i < songs.length; i++) {
        if (songs[i].album !== currentAlbum) {
          if (i < 1 || songs[i].album !== songs[i - 1].album) {
            newSongs.push(songs[i]);
          }
        }
      }
      if (shuffle)  {
        return this.shuffle(newSongs);
      }
      return newSongs;
    } else {
      return [];
    }
  }

    /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */
  shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
