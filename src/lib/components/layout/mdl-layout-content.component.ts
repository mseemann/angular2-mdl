import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ContentChildren,
  QueryList
} from '@angular/core';
import { MdlLayoutTabPanelComponent } from './mdl-layout-tab-panel.component';

@Component({
  selector: 'mdl-layout-content',
  host: {
    '[class.mdl-layout__content]': 'true',
  },
  template:
    `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
})
export class MdlLayoutContentComponent {

  @ContentChildren(MdlLayoutTabPanelComponent) public tabs: QueryList<MdlLayoutTabPanelComponent>;

  public el: HTMLElement;

  constructor(private elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }


}
