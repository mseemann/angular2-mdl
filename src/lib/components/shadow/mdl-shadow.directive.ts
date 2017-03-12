import {
  Directive,
  Input,
  OnChanges,
  SimpleChange,
  ElementRef,
  Renderer2,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { MdlError } from '../common/mdl-error';
import { toNumber } from '../common/number.property';

export class MdlUnsupportedShadowValueError extends MdlError {
  constructor(value: number | string ) {
    /* istanbul ignore next */
    super(`Shadow value "${value}" isn't supported (allowed: 2,3,4,6,8,16,24).`);
  }
}

const MDL_SHADOW_VALUES = [0, 2, 3, 4, 6, 8, 16, 24];

@Directive({
  selector: '[mdl-shadow]'
})
export class MdlShadowDirective implements OnChanges {

  private el: HTMLElement;

  private _mdlShadow: number = 2;
  @Input('mdl-shadow')
  get mdlShadow() { return this._mdlShadow; }
  set mdlShadow(value) { this._mdlShadow = toNumber(value); }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = elementRef.nativeElement;
  }

  public ngOnChanges(changes: {[key: string]: SimpleChange}) {


    if (MDL_SHADOW_VALUES.indexOf(Number(this.mdlShadow)) === -1) {
      throw new MdlUnsupportedShadowValueError(this.mdlShadow);
    }

    let change = changes['mdlShadow'];

    if (!change.isFirstChange()) {
      this.renderer.removeClass(this.el, `mdl-shadow--${change.previousValue}dp`);
    }

    this.renderer.addClass(this.el, `mdl-shadow--${change.currentValue}dp`);

  }

}


const MDL_SHADOW_DIRECTIVES = [MdlShadowDirective];

@NgModule({
  imports: [],
  exports: MDL_SHADOW_DIRECTIVES,
  declarations: MDL_SHADOW_DIRECTIVES,
})
export class MdlShadowModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlShadowModule,
      providers: []
    };
  }
}
