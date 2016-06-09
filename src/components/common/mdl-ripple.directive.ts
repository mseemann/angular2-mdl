import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[mdl-ripple]'
})
export class MdlRippleDirective {
  
}

export const MDL_COMMON_DIRECTIVES = [MdlRippleDirective];
