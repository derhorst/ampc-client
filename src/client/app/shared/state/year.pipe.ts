import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'year'
})
export class YearPipe implements PipeTransform {

  transform(date: string): string {
    if (date) {
      if (!isNaN(+date.substr(0, 4))) {
        return '(' + date.substr(0, 4) + ')';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}
