import {
  Component,
  Input,
  ElementRef,
  forwardRef,
  Renderer,
  Inject
} from '@angular/core';
import { MdlMenuComponent } from './mdl-menu.component';
import { BooleanProperty } from './../common/boolean-property';


@Component({
  selector: 'mdl-menu-item',
  host: {
    '[class.mdl-menu__item]': 'true',
    'tabindex': '-1',
    '(click)': 'onClick($event)',
    '(touchstart)': 'onTouch($event)'
  },
  template: '<ng-content></ng-content>'
})
export class MdlMenuItemComponent {

  @Input('disabled') @BooleanProperty() public disabled: boolean;

  public element: HTMLElement;
  // forwardRef is needed because of he circular dependency menu queries menuitems; menuitem needs the parent
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    @Inject(forwardRef(() => MdlMenuComponent)) private mdlMenu: MdlMenuComponent) {
    this.element = elementRef.nativeElement;
  }

  public onClick($event) {
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
  public onTouch($event) {
    // ensure that this event is totally consumed
    $event.stopPropagation();
    $event.preventDefault();

    let event = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(this.element, 'dispatchEvent', [event]);
  }

}
