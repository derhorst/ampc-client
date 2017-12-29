import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(duration: number): string {
    if (duration) {
      const hours = Math.floor((duration / 60) / 60);
      const minutes = Math.floor(duration / 60);
      const seconds = (duration - minutes * 60);

      let finalTime = minutes + ':' + str_pad_left('' + seconds, '0', 2);

      if (hours !== 0) {
        finalTime = hours + ':' + minutes + ':' + str_pad_left('' + seconds, '0', 2);
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
