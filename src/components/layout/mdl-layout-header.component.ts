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
    '[class.is-casting-shadow]': 'mode==="standard"',
    '[class.mdl-layout__header--seamed]': 'mode==="seamed"',
    '[class.mdl-layout__header--waterfall]': 'mode==="waterfall"',
    '[class.mdl-layout__header--scroll]': 'mode==="scroll"',
    '(transitionend)': 'onTransitionEnd()',
    '(click)': 'onClick()'
  },
  template:
    `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutHeaderComponent {

  // set from MdlLayoutComponent
  protected mode: string;
  protected el: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer){
    this.el = elementRef.nativeElement;
  }

  // // tslint:disable-next-line - method is access from template
  // private onTransitionEnd(){
  //   this.renderer.setElementClass(this.el, 'is-animating', false);
  // }
  //
  // // tslint:disable-next-line - method is access from template
  // private onClick(){
  //   // TODO do not use css as a marker for the component state
  //   if (this.el.classList.contains('is-compact')) {
  //     this.el.classList.remove('is-compact');
  //     this.el.classList.add('is-animating');
  //   }
  // }
}
