import { Directive } from '@angular/core';


@Directive({
  selector: '[mdl-table]',
  host: {
    '[class.mdl-data-table]': 'true'
  }
})
export class MdlTableDirective {}


