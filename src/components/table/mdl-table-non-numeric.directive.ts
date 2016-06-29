import { Directive } from '@angular/core';


@Directive({
  selector: 'th[mdl-table-non-numeric], td[mdl-table-non-numeric]',
  host: {
    '[class.mdl-data-table__cell--non-numeric]': 'true'
  }
})
export class MdlTableNonNumericDirective {}



