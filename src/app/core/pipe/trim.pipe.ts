import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: any, num?: any): any {
    if (value) {
      if (num) {
        return value.substring(0, num) + '…';
      } else {
        return value.substring(0, 10) + '…';
      }
    }
  }

}