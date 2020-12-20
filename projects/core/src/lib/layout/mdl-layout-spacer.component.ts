import { Component, HostBinding, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "mdl-layout-spacer",
  template: "",
  encapsulation: ViewEncapsulation.None,
})
export class MdlLayoutSpacerComponent {
  @HostBinding("class.mdl-layout-spacer")
  isLayoutSpacer = true;
}
