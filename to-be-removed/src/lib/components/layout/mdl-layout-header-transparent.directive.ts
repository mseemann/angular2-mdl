import { Directive } from '@angular/core';


@Directive({
  selector: 'mdl-layout-header[mdl-layout-header-transparent]',
  host: {
    '[class.mdl-layout__header--transparent]': 'true'
  }
})
export class MdlLayoutHeaderTransparentDirective {}
