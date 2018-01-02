import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'libraryFilter'
})
export class LibraryFilterPipe implements PipeTransform {

  transform(artists: string[], filter: string): string[] {
    if (!filter) {
      return artists;
    } else {
      const filteredArray = artists.filter(function (element) {
        return element.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
      return filteredArray;
    }
  }
}
