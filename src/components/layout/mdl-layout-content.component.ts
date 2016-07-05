import {
  Component
} from '@angular/core';

@Component({
  selector: 'mdl-layout-content',
  host: {
    '[class.mdl-layout__content]':'true'
  },
  template:
    `<ng-content></ng-content>`
})
export class MdlLayoutContentComponent {

}