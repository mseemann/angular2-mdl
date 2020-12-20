import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  ViewEncapsulation,
} from "@angular/core";
import { MdlMenuComponent } from "./mdl-menu.component";
import { toBoolean } from "../common/boolean-property";
import { callNative } from "../common/native-support";

@Component({
  selector: "mdl-menu-item",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlMenuItemComponent {
  @HostBinding("tabindex")
  tabindex = -1;
  @HostBinding("class.mdl-menu__item")
  isMenuItem = true;

  element: HTMLElement;

  private disabledIntern = false;

  // forwardRef is needed because of he circular dependency menu queries menuitems; menuitem needs the parent
  constructor(
    private elementRef: ElementRef,
    @Inject(forwardRef(() => MdlMenuComponent))
    private mdlMenu: MdlMenuComponent
  ) {
    this.element = elementRef.nativeElement;
  }

  @Input()
  get disabled(): boolean {
    return this.disabledIntern;
  }

  set disabled(value: boolean) {
    this.disabledIntern = toBoolean(value);
  }

  @HostListener("click", ["$event"])
  onClick($event: Event): void {
    $event.stopPropagation();
    if (this.disabled) {
      this.mdlMenu.hide();
      return;
    }
    this.mdlMenu.hideOnItemClicked();
  }

  // we need to register a touchstart at the window to get informed if the user taps outside the menu.
  // But if we register a touchstart event - safari will no longer convert touch events to click events.
  // So we need to convert touch to click and the user still needs to register a (click) listener to be
  // informed if the menu item has clicked.
  @HostListener("touchstart", ["$event"])
  onTouch($event: Event): void {
    // ensure that this event is totally consumed
    $event.stopPropagation();
    $event.preventDefault();

    const event = new MouseEvent("click", { bubbles: true });
    callNative(this.element, "dispatchEvent", event);
  }
}
