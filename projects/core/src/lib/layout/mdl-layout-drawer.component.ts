import {Component, forwardRef, HostBinding, Inject, Optional, ViewEncapsulation} from '@angular/core';
import {MdlLayoutComponent} from './mdl-layout.component';

@Component({
  selector: 'mdl-layout-drawer',
  template:
      `
    <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutDrawerComponent {

  @HostBinding('class.mdl-layout__drawer') isDrawer = true;

  @HostBinding('class.is-visible') isDrawerVisible = false;

  constructor(@Optional() @Inject(forwardRef(() => MdlLayoutComponent)) private parentLayout) {
    this.parentLayout = parentLayout as MdlLayoutComponent;
  }

  public isDrawerDirectChildOf(layout: MdlLayoutComponent) {
    return this.parentLayout === layout;
  }

}
