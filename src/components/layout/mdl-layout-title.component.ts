import { Component } from '@angular/core';


@Component({
  selector: 'mdl-layout-title',
  host: {
    '[class.mdl-layout-title]': 'true'
  },
  template: '<ng-content></ng-content>'
})
export class MdlLayoutTitleComponent {}
