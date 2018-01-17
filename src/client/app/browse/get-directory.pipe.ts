import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDirectory'
})
export class GetDirectoryPipe implements PipeTransform {

  transform(directory: string): string {
     return directory.substring(directory.lastIndexOf('/') + 1);
  }
}
