import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  Renderer2,
  NgModule,
  ModuleWithProviders,
  SimpleChanges
} from '@angular/core';
import { MaterialRipple } from './ripple.vendor';

// known bugs: https://github.com/google/material-design-lite/issues/4215
export class MdlRippleDirective implements OnChanges {

  private RIPPLE = 'mdl-ripple';

  private rippleContainer: HTMLElement;
  public el: HTMLElement;
  private ripple: any;

  public rippleActive: boolean | string = true;

  constructor(
    private elementRef: ElementRef,
    public renderer: Renderer2,
    private cssContainerClasses: [string]) {
    this.el = elementRef.nativeElement;
  }


  public ngOnChanges(changes: SimpleChanges) {

      // remove any existing ripple container
      if (this.rippleContainer) {
        this.el.removeChild(this.rippleContainer);
        delete this.rippleContainer;
        delete this.ripple;
      }

      // if used as mdl-ripple without property binding it is an empty string
      // otherwise (e.g. [mdl-ripple] it is a boolean - may be with the default value true.
      if (this.rippleActive === '' || this.rippleActive) {

        this.rippleContainer = this.renderer.createElement('span');
        this.cssContainerClasses.forEach( ( cssClass ) => {
          this.renderer.addClass(this.rippleContainer, cssClass);
        });
        const rippleElement = this.renderer.createElement('span');
        this.renderer.addClass(rippleElement, this.RIPPLE);
        this.rippleContainer.appendChild(rippleElement);
        this.el.appendChild(this.rippleContainer);

        this.ripple = new MaterialRipple(this.renderer, this.el);

      }
  }

}

@Directive({
  selector: 'mdl-button[mdl-ripple], button[mdl-ripple]'
})
export class MdlButtonRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, ['mdl-button__ripple-container']);
  }

  // AOT is not able to call lifecycle hooks if a base class :(
  public ngOnChanges(changes: SimpleChanges) {super.ngOnChanges(changes);}
}

@Directive({
  selector: 'mdl-checkbox[mdl-ripple]'
})
export class MdlCheckboxRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, ['mdl-checkbox__ripple-container', 'mdl-ripple--center']);
  }

  // AOT is not able to call lifecycle hooks if a base class :(
  public ngOnChanges(changes: SimpleChanges) {super.ngOnChanges(changes);}
}

@Directive({
  selector: 'mdl-radio[mdl-ripple]'
})
export class MdlRadioRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, ['mdl-radio__ripple-container', 'mdl-ripple--center']);
  }

  // AOT is not able to call lifecycle hooks if a base class :(
  public ngOnChanges(changes: SimpleChanges) {super.ngOnChanges(changes);}
}

@Directive({
  selector: 'mdl-icon-toggle[mdl-ripple]'
})
export class MdlIconToggleRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, ['mdl-icon-toggle__ripple-container', 'mdl-ripple--center']);
  }

  // AOT is not able to call lifecycle hooks if a base class :(
  public ngOnChanges(changes: SimpleChanges) {super.ngOnChanges(changes);}

}

@Directive({
  selector: 'mdl-switch[mdl-ripple]'
})
export class MdlSwitchRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, ['mdl-switch__ripple-container', 'mdl-ripple--center']);
  }

  // AOT is not able to call lifecycle hooks if a base class :(
  public ngOnChanges(changes: SimpleChanges) {super.ngOnChanges(changes);}
}

@Directive({
  selector: 'mdl-menu-item[mdl-ripple]'
})
export class MdlMenuItemRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, ['mdl-menu__item--ripple-container']);
  }

  // AOT is not able to call lifecycle hooks if a base class :(
  public ngOnChanges(changes: SimpleChanges) {super.ngOnChanges(changes);}
}

@Directive({
  selector: 'a[mdl-ripple],div[mdl-ripple]'
})
export class MdlAnchorRippleDirective extends MdlRippleDirective {

  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, ['mdl-tabs__ripple-container', 'mdl-layout__tab-ripple-container']);
  }

  // AOT is not able to call lifecycle hooks if a base class :(
  public ngOnChanges(changes: SimpleChanges) {super.ngOnChanges(changes);}
}

const MDL_COMMON_DIRECTIVES = [
  MdlCheckboxRippleDirective,
  MdlButtonRippleDirective,
  MdlRadioRippleDirective,
  MdlIconToggleRippleDirective,
  MdlSwitchRippleDirective,
  MdlMenuItemRippleDirective,
  MdlAnchorRippleDirective
];

@NgModule({
  imports: [],
  exports: MDL_COMMON_DIRECTIVES,
  declarations: MDL_COMMON_DIRECTIVES,
})
export class MdlRippleModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlRippleModule,
      providers: []
    };
  }
}
