import {Component, ElementRef, Input, Renderer2, ViewEncapsulation} from '@angular/core';
import {MdlTooltipPositionService} from './mdl-tooltip-position.service';

const IS_ACTIVE = 'is-active';

const host: { [key: string]: string; } = {
  '[class.mdl-tooltip]': 'true',
  '[class.mdl-tooltip--large]': 'large',
  '[class.mdl-tooltip--left]': 'position=="left"',
  '[class.mdl-tooltip--right]': 'position=="right"',
  '[class.mdl-tooltip--top]': 'position=="top"',
  '[class.mdl-tooltip--bottom]': 'position=="bottom"'
};

@Component({
  selector: 'mdl-simple-tooltip',
  host: host,
  template: '<div>{{tooltipText}}</div>',
  providers: [MdlTooltipPositionService],
  encapsulation: ViewEncapsulation.None
})
export class MdlSimpleTooltipComponent {
  public tooltipText: string;
  public element: HTMLElement;
  public large = false;
  public position: 'left' | 'right' | 'top' | 'bottom';
  @Input() delay: number;
  private active = false;
  private delayTimeout: any;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private mdlTooltipPositionService: MdlTooltipPositionService) {

    this.element = elRef.nativeElement;
  }

  public mouseLeave() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
    this.setActive(false);
  }

  public mouseEnter(event: any) {
    if (this.delay) {
      this.delayTimeout = setTimeout(() => {
        this.show(event.target);
      }, this.delay);
    } else {
      this.show(event.target);
    }
  }

  public isActive() {
    return this.active;
  }

  private show(element: HTMLElement) {
    const props = element.getBoundingClientRect();
    const offsetWidth = this.element.offsetWidth;
    const offsetHeight = this.element.offsetHeight;

    const style = this.mdlTooltipPositionService.calcStyle(offsetWidth, offsetHeight, props, this.position);

    for (const key of Object.keys(style)) {
      this.renderer.setStyle(this.elRef.nativeElement, key, style[key]);
    }

    this.setActive(true);
  }

  private setActive(active: boolean) {
    this.active = active;
    if (active) {
      this.renderer.addClass(this.elRef.nativeElement, IS_ACTIVE);
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, IS_ACTIVE);
    }
  }
}

@Component({
  selector: 'mdl-tooltip',
  template: '<div><ng-content></ng-content></div>',
  exportAs: 'mdlTooltip',
  host: host,
  providers: [MdlTooltipPositionService],
  encapsulation: ViewEncapsulation.None
})
export class MdlTooltipComponent extends MdlSimpleTooltipComponent {
  constructor(elRef: ElementRef, renderer: Renderer2, mdlTooltipPositionService: MdlTooltipPositionService) {
    super(elRef, renderer, mdlTooltipPositionService);
  }
}
