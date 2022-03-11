import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MdlFabMenuComponent } from "./fab-menu.component";

@Component({
  selector: "mdl-fab-menu-item",
  templateUrl: "fab-menu-item.html",
  styleUrls: ["fab-menu-item.scss"],
})
export class MdlFabMenuItemComponent implements OnInit {
  @Input()
  label: string | undefined;
  @Input()
  icon: string | undefined;
  @Input()
  fabMenu: MdlFabMenuComponent | undefined;

  // eslint-disable-next-line
  @Output("menu-clicked")
  menuClick: EventEmitter<void> = new EventEmitter();

  isHoovering = false;

  ngOnInit(): void {
    this.isHoovering = false;
  }
}
