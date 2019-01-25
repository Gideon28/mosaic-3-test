import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private dom: DomSanitizer) {}

  transform(value: any, args?: any) {
    return this.dom.bypassSecurityTrustHtml(value);
  }

}
