import {
  Directive,
  Input,
  OnChanges,
  SimpleChange,
  ElementRef,
  Renderer } from '@angular/core';
import { MdlError } from './../common/mdl-error';

export class MdlUnsupportedShadowValueError extends MdlError {
  constructor(value: number | string ) {
    super(`Shadow value "${value}" isn't supported (allowed: 2,3,4,6,8,16,24).`);
  }
}

const MDL_SHADOW_VALUES = [2,3,4,6,8,16,24];

@Directive({
  selector: '[mdl-shadow]'
})
export class MdlShadowDirective implements OnChanges {

  private el:HTMLElement;

  @Input('mdl-shadow') mdlShadow: number | string;

  constructor(private elementRef: ElementRef, private renderer:Renderer){
    this.el = elementRef.nativeElement;
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}) {

    if (MDL_SHADOW_VALUES.indexOf(Number(this.mdlShadow)) === -1) {
      throw new MdlUnsupportedShadowValueError(this.mdlShadow);
    }

    let change = changes['mdlShadow'];

    if (!change.isFirstChange()){
      this.renderer.setElementClass(this.el, `mdl-shadow--${change.previousValue}dp`, false);
    }

    this.renderer.setElementClass(this.el, `mdl-shadow--${change.currentValue}dp`, true);

  }

}



export const MDL_SHADOW_DIRECTIVES = [MdlShadowDirective];
