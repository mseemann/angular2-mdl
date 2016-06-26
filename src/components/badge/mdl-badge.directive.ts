import {
  Directive,
  Input,
  OnChanges,
  SimpleChange,
  ElementRef,
  Renderer } from '@angular/core';
import { MdlError } from './../common/mdl-error';


@Directive({
  selector: '[mdl-badge]',
  host: {
    '[class.mdl-badge]': 'true'
  }
})
export class MdlBadgeDirective implements OnChanges {

  private el:HTMLElement;

  @Input('mdl-badge') mdlBadgeContent: string;

  constructor(private elementRef: ElementRef, private renderer:Renderer){
    this.el = elementRef.nativeElement;
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    this.renderer.setElementAttribute(this.el, 'data-badge', this.mdlBadgeContent);
  }

}

@Directive({
  selector: '[mdl-badge-overlap]',
  host: {
    '[class.mdl-badge--overlap]': 'true'
  }
})
export class MdlBadgeOverlapDirective {}

@Directive({
  selector: '[mdl-badge-no-background]',
  host: {
    '[class.mdl-badge--no-background]': 'true'
  }
})
export class MdlBadgeNoBackgroundDirective {}


export const MDL_BADGE_DIRECTIVES = [MdlBadgeDirective, MdlBadgeOverlapDirective, MdlBadgeNoBackgroundDirective];
