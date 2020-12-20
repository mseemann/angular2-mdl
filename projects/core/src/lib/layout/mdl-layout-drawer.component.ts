import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'mdl-layout-drawer',
  template:
    `
      <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutDrawerComponent {

  @HostBinding('class.mdl-layout__drawer')
  isDrawer = true;

  @HostBinding('class.is-visible')
  isDrawerVisible = false;

}
