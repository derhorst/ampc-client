import { Pipe, PipeTransform } from '@angular/core';
import { Song } from './../shared/models/song.model';

@Pipe({
  name: 'filterArtistAlbums'
})
export class FilterArtistAlbumsPipe implements PipeTransform {

  transform(songs: any) {
    const albumNames = Object.keys(songs);
    const albums: Song[] = [];
    for (let i = 0; i < albumNames.length; i++) {
      albums.push(songs[albumNames[i]][0]);
    }
    return albums;
  }
}
