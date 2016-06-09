import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[mdl-ripple]'
})
export class MdlRippleDirective {

 // @Input('mdl-ripple') rippleActive: boolean = true;

}

export const MDL_COMMON_DIRECTIVES = [MdlRippleDirective];
