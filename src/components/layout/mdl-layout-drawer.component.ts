import {
  Component
} from '@angular/core';

@Component({
  selector: 'mdl-layout-drawer',
  host: {
    '[class.mdl-layout__drawer]':'true'
  },
  template:
    `<ng-content></ng-content>`
})
export class MdlLayoutDrawerComponent {

}