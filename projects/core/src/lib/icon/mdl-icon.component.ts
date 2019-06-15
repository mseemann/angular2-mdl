import {Component, HostBinding, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'mdl-icon',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlIconComponent {
  @HostBinding('class.material-icons') isMatIcon = true;
}


