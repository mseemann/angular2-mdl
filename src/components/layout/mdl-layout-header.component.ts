import {
  Component,
  ElementRef,
  Renderer,
  ViewEncapsulation
} from '@angular/core';
@Component({
  selector: 'mdl-layout-header',
  host: {
    '[class.mdl-layout__header]': 'true',
    '[class.is-casting-shadow]': 'mode==="standard" || isCompact',
    '[class.mdl-layout__header--seamed]': 'isSeamed',
    '[class.mdl-layout__header--waterfall]': 'mode==="waterfall"',
    '[class.mdl-layout__header--scroll]': 'mode==="scroll"',
    '[class.is-compact]' : 'isCompact',
    '(transitionend)': 'onTransitionEnd()',
    '(click)': 'onClick()'
  },
  template:
    `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutHeaderComponent {

  // set from MdlLayoutComponent
  public mode: string;
  protected el: HTMLElement;
  public isCompact = false;
  public isAnimating = false;
  public isSeamed = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.el = elementRef.nativeElement;
  }

  protected onTransitionEnd() {
    this.isAnimating = false;
  }

  protected onClick() {
    if (this.isCompact) {
      this.isCompact = false;
      this.isAnimating = true;
    }
  }
}
