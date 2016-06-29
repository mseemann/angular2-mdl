import { Directive } from '@angular/core';


@Directive({
  selector: '[mdl-table]',
  host: {
    '[class.mdl-data-table]': 'true'
  }
})
export class MdlTableDirective {}




@Directive({
  selector: '[mdl-table-selectable]',
  host: {
    '[class.mdl-data-table]': 'true',
    '[class.mdl-data-table--selectable]': 'true'
  }
})
export class MdlTableSelectableDirective {}