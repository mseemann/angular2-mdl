import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChange
} from '@angular/core';
import { MaterialRipple } from './ripple.vendor';

// TODO change to @Component with a template to create the dom structure for ripple effects

export class MdlRippleDirective implements OnChanges {

  private RIPPLE = 'mdl-ripple';

  private rippleContainer: HTMLElement;
  private el: HTMLElement;
  private ripple: any;

  @Input('mdl-ripple') private rippleActive: boolean | string = true;

  constructor(private elementRef: ElementRef, private cssContainerClass: string) {
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
        this.rippleContainer = document.createElement('span');
        this.rippleContainer.classList.add(this.cssContainerClass);
        var rippleElement = document.createElement('span');
        rippleElement.classList.add(this.RIPPLE);
        this.rippleContainer.appendChild(rippleElement);
        // ?? rippleElement.addEventListener('mouseup', ()=>rippleElement.blur());
        this.el.appendChild(this.rippleContainer);

        this.ripple = new MaterialRipple(this.rippleContainer);

      }
  }

}

@Directive({
  selector: 'mdl-button[mdl-ripple]'
})
export class MdlButtonRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef) {
    super(elementRef, 'mdl-button__ripple-container');
  }

}

@Directive({
  selector: 'mdl-checkbox[mdl-ripple]'
})
export class MdlCheckboxRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef) {
    super(elementRef, 'mdl-checkbox__ripple-container');
  }

}

@Directive({
  selector: 'mdl-radio[mdl-ripple]'
})
export class MdlRadioRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef) {
    super(elementRef, 'mdl-radio__ripple-container');
  }

}

@Directive({
  selector: 'mdl-icon-toggle[mdl-ripple]'
})
export class MdlIconToggleRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef) {
    super(elementRef, 'mdl-icon-toggle__ripple-container');
  }

}

@Directive({
  selector: 'mdl-switch[mdl-ripple]'
})
export class MdlSwitchRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef) {
    super(elementRef, 'mdl-switch__ripple-container');
  }

}

@Directive({
  selector: 'mdl-menu-item[mdl-ripple]'
})
export class MdlMenuItemRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef) {
    super(elementRef, 'mdl-menu__item--ripple-container');
  }

}




export const MDL_COMMON_DIRECTIVES = [
  MdlCheckboxRippleDirective,
  MdlButtonRippleDirective,
  MdlRadioRippleDirective,
  MdlIconToggleRippleDirective,
  MdlSwitchRippleDirective,
  MdlMenuItemRippleDirective
];
