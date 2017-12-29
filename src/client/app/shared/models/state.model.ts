export class State {
  consume: number;
  crossfade: number;
  currentsongid: number;
  elapsedTime: number;
  random: number;
  repeat: number;
  single: number;
  songpos: number;
  state: number;
  totalTime: number;
  volume: number;

  constructor(
    consume: number,
    crossfade: number,
    currentsongid: number,
    elapsedTime: number,
    random: number,
    repeat: number,
    single: number,
    songpos: number,
    state: number,
    totalTime: number,
    volume: number
  ) {

    this.consume = consume;
    this.crossfade = crossfade;
    this.currentsongid = currentsongid;
    this.elapsedTime = elapsedTime;
    this.random = random;
    this.repeat = repeat;
    this.single = single;
    this.songpos = songpos;
    this.state = state;
    this.totalTime = totalTime;
    this.volume = volume;
  }
}
