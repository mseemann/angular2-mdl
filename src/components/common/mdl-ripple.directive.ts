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

  RIPPLE = 'mdl-ripple';

  private rippleContainer:HTMLElement;
  private el:HTMLElement;
  private ripple:any;

  @Input('mdl-ripple') rippleActive: boolean | string = true;

  constructor(private elementRef: ElementRef, private cssContainerClass:string){
    this.el = elementRef.nativeElement;
  }


  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    let chng = changes['rippleActive'];
    if (chng){

      // remove any existing ripple container
      if(this.rippleContainer){
        this.el.removeChild(this.rippleContainer);
        delete this.rippleContainer;
        delete this.ripple;
      }

      // if used as mdl-ripple without property binding it is an empty string
      // otherwise (e.g. [mdl-ripple] it is a boolean may be with the default value true.
      if (this.rippleActive === '' || this.rippleActive){
        this.rippleContainer = document.createElement('span');
        this.rippleContainer.classList.add(this.cssContainerClass);
        var rippleElement = document.createElement('span');
        rippleElement.classList.add(this.RIPPLE);
        this.rippleContainer.appendChild(rippleElement);
        rippleElement.addEventListener('mouseup', ()=>{
          rippleElement.blur();
        });
        this.el.appendChild(this.rippleContainer);

        this.ripple = new MaterialRipple(this.rippleContainer);

      }
    }
  }

}

@Directive({
  selector: 'button[mdl-ripple]'
})
export class MdlButtonRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef){
    super(elementRef, 'mdl-button__ripple-container')
  }

}

@Directive({
  selector: 'mdl-checkbox[mdl-ripple]'
})
export class MdlCheckboxRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef){
    super(elementRef, 'mdl-checkbox__ripple-container')
  }

}

@Directive({
  selector: 'mdl-radio[mdl-ripple]'
})
export class MdlRadioRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef){
    super(elementRef, 'mdl-radio__ripple-container')
  }

}

export const MDL_COMMON_DIRECTIVES = [MdlCheckboxRippleDirective, MdlButtonRippleDirective, MdlRadioRippleDirective];
