import {
  Component,
  ViewEncapsulation,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'mdl-layout-content',
  host: {
    '[class.mdl-layout__content]': 'true',
  },
  template:
    `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
})
export class MdlLayoutContentComponent {

  protected el: HTMLElement;

  constructor(private elRef: ElementRef){
    this.el = elRef.nativeElement;
  }

}