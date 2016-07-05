import { Component } from '@angular/core';


@Component({
  selector: 'mdl-layout',
  host: {
    '[class.mdl-layout]': 'true'
  },
  template: '<ng-content></ng-content>'
})
export class MdlLayoutComponent {
  
}
