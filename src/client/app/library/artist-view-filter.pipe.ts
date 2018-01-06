import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../shared/models/song.model';

@Pipe({
  name: 'artistViewFilter'
})
export class ArtistViewFilterPipe implements PipeTransform {

  transform(artists: any, albumArtSongs: any, filter: string): string[] {
    if (!filter) {
      return artists;
    } else {
      const filteredArray = artists.filter(function (element: any) {
        let found = true;
        if (element) {
          found = (element.toLowerCase().indexOf(filter.toLowerCase()) > -1);
          if (found) {
            return true;
          }
          for (let i = 0; i < albumArtSongs[element].length; i++) {
            if (albumArtSongs[element][i].album) {
              found = (albumArtSongs[element][i].album.toLowerCase().indexOf(filter.toLowerCase()) > -1);
              if (found) {
                return true;
              }
            }
          }
        }
        return false;
      });
      return filteredArray;
    }
  }
}
