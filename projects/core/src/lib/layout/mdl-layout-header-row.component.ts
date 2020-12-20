import { Component, HostBinding, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "mdl-layout-header-row",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlLayoutHeaderRowComponent {
  @HostBinding("class.mdl-layout__header-row")
  isHeaderRow = true;
}
