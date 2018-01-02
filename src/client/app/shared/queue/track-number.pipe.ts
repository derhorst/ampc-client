import { Pipe, PipeTransform } from '@angular/core';

import { Config } from './../../shared/config/env.config';

@Pipe({
  name: 'trackNumber'
})
export class TrackNumberPipe implements PipeTransform {

  transform(number: string) {
    if (number) {
      if (number.indexOf('/') !== -1) {
        number = number.substring(0, number.indexOf('/'));
      }
      if (+number > 99) {
        return number;
      }
      return this.str_pad_left(number, '0', 2);
    } else {
      return '00';
    }
  }

  str_pad_left(string: string, pad: string, length: number) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
  }
}
