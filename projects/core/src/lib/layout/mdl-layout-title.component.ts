import {Component, HostBinding, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'mdl-layout-title',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutTitleComponent {
  @HostBinding('class.mdl-layout-title') isLayoutTitle = true;
}
