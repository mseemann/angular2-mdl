import {Directive} from '@angular/core';


@Directive({
  // tslint:disable-next-line
  selector: 'mdl-layout-header[mdl-layout-header-transparent]',
  host: {
    '[class.mdl-layout__header--transparent]': 'true'
  }
})
export class MdlLayoutHeaderTransparentDirective {
}
