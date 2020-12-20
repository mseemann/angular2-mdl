import {Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2} from '@angular/core';


const DATA_BADE_ATTR = 'data-badge';

@Directive({
  // eslint-disable-next-line
  selector: '[mdl-badge]'
})
export class MdlBadgeDirective implements OnChanges {

  @Input('mdl-badge') public mdlBadgeContent: string;

  @HostBinding('class.mdl-badge') isBadge = true;

  private readonly el: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = elementRef.nativeElement;
  }

  public ngOnChanges(): void {
    if (this.mdlBadgeContent === null || typeof this.mdlBadgeContent === 'undefined') {
      this.renderer.removeAttribute(this.el, DATA_BADE_ATTR);
      return;
    }
    this.renderer.setAttribute(this.el, DATA_BADE_ATTR, this.mdlBadgeContent);
  }

}

@Directive({
  // eslint-disable-next-line
  selector: '[mdl-badge-overlap]'
})
export class MdlBadgeOverlapDirective {

  @HostBinding('class.mdl-badge--overlap') isOverlapping = true;
}

@Directive({
  // eslint-disable-next-line
  selector: '[mdl-badge-no-background]'
})
export class MdlBadgeNoBackgroundDirective {

  @HostBinding('class.mdl-badge--no-background') isNoBackground = true;
}



