import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Config } from './../../shared/config/env.config';

@Pipe({
  name: 'getCoverUrl'
})
export class GetCoverUrlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(filename: string) {
    if (filename) {
      if (Config.ENV === 'DEV') {
        return encodeURI('http://localhost:8080/cover/' + filename).replace('#', '%23');
      } else {
        return encodeURI('./cover/' + filename).replace('#', '%23');
      }
    } else {
      return '';
    }
  }
}
