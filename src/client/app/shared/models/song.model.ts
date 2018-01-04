export class Song {
  title: string;
  track: string;
  artist: string;
  album: string;
  album_artist: string;
  date: string;
  file: string;
  duration: number;
  pos: number;
  id: number;

  constructor(
    title: string,
    track: string,
    artist: string,
    album: string,
    album_artist: string,
    date: string,
    file: string,
    duration: number,
    pos: number,
    id: number
  ) {

    this.title = title;
    this.track = track;
    this.artist = artist;
    this.album = album;
    this.album_artist = album_artist;
    this.date = date;
    this.file = file;
    this.duration = duration;
    this.pos = pos;
    this.id = id;
  }
}
