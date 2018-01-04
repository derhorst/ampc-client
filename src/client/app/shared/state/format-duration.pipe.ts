import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(duration: number): string {
    if (duration) {
      // const hours = Math.floor((duration / 60) / 60);
      // console.log(hours)
      // const minutes = Math.floor((duration - hours * 60) / 60);
      // const seconds = (duration - minutes * 60);
      const hours = Math.floor(duration / 3600);
      const totalSeconds = duration % 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      console.log(seconds)
      let finalTime = minutes + ':' + str_pad_left('' + seconds, '0', 2);

      if (hours !== 0) {
        finalTime = hours + ':' + str_pad_left('' + minutes, '0', 2) + ':' + str_pad_left('' + seconds, '0', 2);
      }
      return finalTime;
    } else {
      return '00:00';
    }
  }
}

function str_pad_left(string: string, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}
