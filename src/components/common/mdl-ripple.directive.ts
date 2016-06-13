import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChange
} from '@angular/core';
import { MaterialRipple } from './ripple.vendor';
@Directive({
  selector: '[mdl-ripple]'
})
export class MdlRippleDirective implements OnChanges {

  RIPPLE_CONTAINER = 'mdl-button__ripple-container';
  RIPPLE = 'mdl-ripple';

  private rippleContainer:HTMLElement;
  private el:HTMLElement;
  private ripple:any;

  @Input('mdl-ripple') rippleActive: boolean = true;

  constructor(private elementRef: ElementRef){
    this.el = elementRef.nativeElement;
  }


  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    let chng = changes['rippleActive'];
    if (chng){

      // remove any existing ripple container
      if(this.rippleContainer){
        this.el.removeChild(this.rippleContainer);
        delete this.ripple;
      }

      // if used as mdl-ripple without property binding it is an empty string
      // otherwise (e.g. [mdl-ripple] it is a boolean may be with the default value true.
      if (this.rippleActive === '' || this.rippleActive){
        this.rippleContainer = document.createElement('span');
        this.rippleContainer.classList.add(this.RIPPLE_CONTAINER);
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

export const MDL_COMMON_DIRECTIVES = [MdlRippleDirective];
