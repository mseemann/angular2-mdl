import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from "@angular/core";
import { MdlError } from "../common/mdl-error";
import { toNumber } from "../common/number.property";

export class MdlUnsupportedShadowValueError extends MdlError {
  constructor(value: number | string) {
    /* istanbul ignore next */
    super(
      `Shadow value "${value}" isn't supported (allowed: 2,3,4,6,8,16,24).`
    );
  }
}

const MDL_SHADOW_VALUES = [0, 2, 3, 4, 6, 8, 16, 24];

@Directive({
  // eslint-disable-next-line
  selector: '[mdl-shadow]'
})
export class MdlShadowDirective implements OnChanges {
  private readonly el: HTMLElement;
  private mdlShadowIntern = 2;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = elementRef.nativeElement;
  }

  @Input("mdl-shadow")
  get mdlShadow(): number {
    return this.mdlShadowIntern;
  }

  set mdlShadow(value: number) {
    this.mdlShadowIntern = toNumber(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (MDL_SHADOW_VALUES.indexOf(Number(this.mdlShadow)) === -1) {
      throw new MdlUnsupportedShadowValueError(this.mdlShadow);
    }

    const change = changes.mdlShadow;

    if (!change.isFirstChange()) {
      this.renderer.removeClass(
        this.el,
        `mdl-shadow--${change.previousValue}dp`
      );
    }

    this.renderer.addClass(this.el, `mdl-shadow--${change.currentValue}dp`);
  }
}
