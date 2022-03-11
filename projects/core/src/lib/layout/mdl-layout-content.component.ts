import {
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  QueryList,
  ViewEncapsulation,
} from "@angular/core";
import { MdlLayoutTabPanelComponent } from "./mdl-layout-tab-panel.component";

@Component({
  selector: "mdl-layout-content",
  template: ` <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
})
export class MdlLayoutContentComponent {
  @HostBinding("class.mdl-layout__content")
  isContent = true;
  @ContentChildren(MdlLayoutTabPanelComponent)
  tabs: QueryList<MdlLayoutTabPanelComponent> = new QueryList<MdlLayoutTabPanelComponent>();

  el: HTMLElement;

  constructor(private elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }
}
