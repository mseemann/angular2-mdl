import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'mdl-layout-drawer',
  host: {
    '[class.mdl-layout__drawer]':'true',
    '[class.is-visible]':'isDrawerVisible'
  },
  template:
    `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutDrawerComponent {

  isDrawerVisible = false;
}