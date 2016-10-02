import {
  Component,
  ViewEncapsulation
} from '@angular/core';


@Component({
  selector: 'mdl-layout-header-row',
  host: {
    '[class.mdl-layout__header-row]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutHeaderRowComponent {}
