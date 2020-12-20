import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from "@angular/core";
import { MaterialRipple } from "./ripple.vendor";

const RIPPLE = "mdl-ripple";

// known bugs: https://github.com/google/material-design-lite/issues/4215
@Directive()
export class MdlRippleDirective implements OnChanges {
  public el: HTMLElement;
  rippleActive: boolean | string = true;

  private rippleContainer: HTMLElement;
  private ripple: () => void;

  constructor(
    private elementRef: ElementRef,
    public renderer: Renderer2,
    private cssContainerClasses: string[]
  ) {
    this.el = elementRef.nativeElement;
  }

  ngOnChanges(): void {
    // remove any existing ripple container
    if (this.rippleContainer) {
      this.el.removeChild(this.rippleContainer);
      delete this.rippleContainer;
      delete this.ripple;
    }

    // if used as mdl-ripple without property binding it is an empty string
    // otherwise (e.g. [mdl-ripple] it is a boolean - may be with the default value true.
    if (this.rippleActive === "" || this.rippleActive) {
      this.rippleContainer = this.renderer.createElement("span");
      this.cssContainerClasses.forEach((cssClass) => {
        this.renderer.addClass(this.rippleContainer, cssClass);
      });
      const rippleElement = this.renderer.createElement("span");
      this.renderer.addClass(rippleElement, RIPPLE);
      this.rippleContainer.appendChild(rippleElement);
      this.el.appendChild(this.rippleContainer);

      this.ripple = new MaterialRipple(this.renderer, this.el);
    }
  }
}

@Directive({
  // eslint-disable-next-line
  selector: 'mdl-button[mdl-ripple], button[mdl-ripple]'
})
export class MdlButtonRippleDirective extends MdlRippleDirective {
  // eslint-disable-next-line
  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, ["mdl-button__ripple-container"]);
  }
}

@Directive({
  // eslint-disable-next-line
  selector: 'mdl-checkbox[mdl-ripple]'
})
export class MdlCheckboxRippleDirective extends MdlRippleDirective {
  // eslint-disable-next-line
  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, [
      "mdl-checkbox__ripple-container",
      "mdl-ripple--center",
    ]);
  }
}

@Directive({
  // eslint-disable-next-line
  selector: 'mdl-radio[mdl-ripple]'
})
export class MdlRadioRippleDirective extends MdlRippleDirective {
  // eslint-disable-next-line
  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, [
      "mdl-radio__ripple-container",
      "mdl-ripple--center",
    ]);
  }
}

@Directive({
  // eslint-disable-next-line
  selector: 'mdl-icon-toggle[mdl-ripple]'
})
export class MdlIconToggleRippleDirective extends MdlRippleDirective {
  // eslint-disable-next-line
  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, [
      "mdl-icon-toggle__ripple-container",
      "mdl-ripple--center",
    ]);
  }
}

@Directive({
  // eslint-disable-next-line
  selector: 'mdl-switch[mdl-ripple]'
})
export class MdlSwitchRippleDirective extends MdlRippleDirective {
  // eslint-disable-next-line
  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, [
      "mdl-switch__ripple-container",
      "mdl-ripple--center",
    ]);
  }
}

@Directive({
  // eslint-disable-next-line
  selector: 'mdl-menu-item[mdl-ripple]'
})
export class MdlMenuItemRippleDirective extends MdlRippleDirective {
  // eslint-disable-next-line
  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, ["mdl-menu__item--ripple-container"]);
  }
}

@Directive({
  // eslint-disable-next-line
  selector: 'a[mdl-ripple],div[mdl-ripple]'
})
export class MdlAnchorRippleDirective extends MdlRippleDirective {
  // eslint-disable-next-line
  @Input('mdl-ripple') public rippleActive: boolean | string = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer, [
      "mdl-tabs__ripple-container",
      "mdl-layout__tab-ripple-container",
    ]);
  }
}
