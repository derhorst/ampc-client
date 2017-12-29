export class Song {
  title: string;
  artist: string;
  album: string;
  album_artist: string;
  file: string;
  duration: number;
  pos: number;
  id: number;

  constructor(
    title: string,
    artist: string,
    album: string,
    album_artist: string,
    file: string,
    duration: number,
    pos: number,
    id: number
  ) {

    this.title = title;
    this.artist = artist;
    this.album = album;
    this.album_artist = album_artist;
    this.file = file;
    this.duration = duration;
    this.pos = pos;
    this.id = id;
  }
}
