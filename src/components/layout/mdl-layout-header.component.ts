import {
  Component
} from '@angular/core';

@Component({
  selector: 'mdl-layout-header',
  host: {
    '[class.mdl-layout__header]':'true'
  },
  template:
    `<ng-content></ng-content>`
})
export class MdlLayoutHeaderComponent {

}