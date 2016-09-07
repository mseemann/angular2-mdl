import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChange,
  Renderer,
  OnInit,
  NgModule
} from '@angular/core';
import { MaterialRipple } from './ripple.vendor';

// known bugs: https://github.com/google/material-design-lite/issues/4215
export class MdlRippleDirective implements OnChanges {

  private RIPPLE = 'mdl-ripple';

  private rippleContainer: HTMLElement;
  protected el: HTMLElement;
  private ripple: any;

  protected rippleActive: boolean | string = true;

  constructor(
    private elementRef: ElementRef,
    protected renderer: Renderer,
    private cssContainerClasses: [string]) {
    this.el = elementRef.nativeElement;
  }

  public ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {

      // remove any existing ripple container
      if (this.rippleContainer) {
        this.el.removeChild(this.rippleContainer);
        delete this.rippleContainer;
        delete this.ripple;
      }

      // if used as mdl-ripple without property binding it is an empty string
      // otherwise (e.g. [mdl-ripple] it is a boolean - may be with the default value true.
      if (this.rippleActive === '' || this.rippleActive) {

        this.rippleContainer = this.renderer.createElement(null, 'span');
        this.cssContainerClasses.forEach( ( cssClass ) => {
          this.rippleContainer.classList.add(cssClass);
        });
        var rippleElement = this.renderer.createElement(null, 'span');
        rippleElement.classList.add(this.RIPPLE);
        this.rippleContainer.appendChild(rippleElement);
        this.el.appendChild(this.rippleContainer);

        this.ripple = new MaterialRipple(this.el);

      }
  }

}

@Directive({
  selector: 'mdl-button[mdl-ripple], button[mdl-ripple]'
})
export class MdlButtonRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') protected rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-button__ripple-container']);
  }

}

@Directive({
  selector: 'mdl-checkbox[mdl-ripple]'
})
export class MdlCheckboxRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') protected rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-checkbox__ripple-container', 'mdl-ripple--center']);
  }

}

@Directive({
  selector: 'mdl-radio[mdl-ripple]'
})
export class MdlRadioRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') protected rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-radio__ripple-container', 'mdl-ripple--center']);
  }

}

@Directive({
  selector: 'mdl-icon-toggle[mdl-ripple]'
})
export class MdlIconToggleRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') protected rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-icon-toggle__ripple-container', 'mdl-ripple--center']);
  }

}

@Directive({
  selector: 'mdl-switch[mdl-ripple]'
})
export class MdlSwitchRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') protected rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-switch__ripple-container', 'mdl-ripple--center']);
  }

}

@Directive({
  selector: 'mdl-menu-item[mdl-ripple]'
})
export class MdlMenuItemRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') protected rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-menu__item--ripple-container']);
  }

}

@Directive({
  selector: 'a[mdl-ripple],div[mdl-ripple]'
})
export class MdlAnchorRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') protected rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-tabs__ripple-container', 'mdl-layout__tab-ripple-container']);
  }

}

@Directive({
  selector: 'mdl-list-item[mdl-ripple]',
})
export class MdlListItemRippleDirective extends MdlRippleDirective implements OnInit {

  @Input('mdl-ripple') protected rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-button__ripple-container']);
  }

  public ngOnInit() {
    // mdl-list-items has no position style - but position relative
    // is needed to restrict the ripplecontainer to the bounds of the item
    this.renderer.setElementStyle(this.el, 'position', 'relative');
  }

}

const MDL_COMMON_DIRECTIVES = [
  MdlCheckboxRippleDirective,
  MdlButtonRippleDirective,
  MdlRadioRippleDirective,
  MdlIconToggleRippleDirective,
  MdlSwitchRippleDirective,
  MdlMenuItemRippleDirective,
  MdlAnchorRippleDirective,
  MdlListItemRippleDirective
];

@NgModule({
  imports: [],
  exports: MDL_COMMON_DIRECTIVES,
  declarations: MDL_COMMON_DIRECTIVES,
})
export class MdlRippleModule {}
