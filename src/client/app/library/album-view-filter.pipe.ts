import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'albumViewFilter'
})
export class AlbumViewFilterPipe implements PipeTransform {

  transform(artists: any, filter: string): string[] {
    if (!filter) {
      return artists;
    } else {
      const filteredArray = artists.filter(function (element: any) {
        let found = true;
        if (element.album_artist) {
          found = (element.album_artist.toLowerCase().indexOf(filter.toLowerCase()) > -1);
          if (found) {
            return true;
          }
        }
        if (element.album) {
          return (element.album.toLowerCase().indexOf(filter.toLowerCase()) > -1);
        }
        return false;
      });
      return filteredArray;
    }
  }
}
