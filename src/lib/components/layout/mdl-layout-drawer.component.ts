import {
  Component,
  ViewEncapsulation,
  Inject,
  forwardRef,
  Optional
} from '@angular/core';
import {MdlLayoutComponent} from './mdl-layout.component';

@Component({
  selector: 'mdl-layout-drawer',
  host: {
    '[class.mdl-layout__drawer]': 'true',
    '[class.is-visible]': 'isDrawerVisible'
  },
  template:
    `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutDrawerComponent {

  public isDrawerVisible = false;

  constructor(@Optional() @Inject(forwardRef(() => MdlLayoutComponent)) private parentLayout: MdlLayoutComponent) {

  }

  public isDrawerDirectChildOf(layout: MdlLayoutComponent) {
    return this.parentLayout === layout;
  }

}
