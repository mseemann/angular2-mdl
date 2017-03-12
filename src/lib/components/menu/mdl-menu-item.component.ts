import {
  Component,
  Input,
  ElementRef,
  forwardRef,
  Renderer2,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { MdlMenuComponent } from './mdl-menu.component';
import { toBoolean } from '../common/boolean-property';
import { callNative } from '../common/native-support';


@Component({
  selector: 'mdl-menu-item',
  host: {
    '[class.mdl-menu__item]': 'true',
    'tabindex': '-1',
    '(click)': 'onClick($event)',
    '(touchstart)': 'onTouch($event)'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlMenuItemComponent {

  private _disabled: boolean = false;
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = toBoolean(value); }

  public element: HTMLElement;
  // forwardRef is needed because of he circular dependency menu queries menuitems; menuitem needs the parent
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
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
    callNative(this.element, 'dispatchEvent', event);
  }

}
