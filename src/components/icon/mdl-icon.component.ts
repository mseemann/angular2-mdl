import { Component } from '@angular/core';


@Component({
  selector: 'mdl-icon',
  host: {
    '[class.material-icons]': 'true'
  },
  template: '<ng-content></ng-content>'
})
export class MdlIconComponent {}



export const MDL_ICON_DIRECTIVES = [MdlIconComponent];
