import { Component, Input } from "@angular/core";

@Component({
  selector: "mdl-fab-menu",
  templateUrl: "fab-menu.component.html",
  styleUrls: ["fab-menu.component.scss"],
})
export class MdlFabMenuComponent {
  @Input()
  alwaysShowTooltips = false;
}
