import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any, key?: any, value?: any): any {
    if (arr && arr.length && key && value) {
      return arr.filter(item => item[key] === value);
    }
    return arr;
  }

}
