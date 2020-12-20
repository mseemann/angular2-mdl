import {Component, ElementRef, HostBinding, Input, Renderer2, ViewEncapsulation} from '@angular/core';
import {MdlTooltipPositionService} from './mdl-tooltip-position.service';

const IS_ACTIVE = 'is-active';

@Component({
  selector: 'mdl-simple-tooltip',
  template: '<div>{{tooltipText}}</div>',
  providers: [MdlTooltipPositionService],
  encapsulation: ViewEncapsulation.None
})
export class MdlSimpleTooltipComponent {

  @HostBinding('class.mdl-tooltip--large')
  large = false;

  @Input()
  position: 'left' | 'right' | 'top' | 'bottom';

  @Input()
  delay: number;

  @HostBinding('class.mdl-tooltip')
  isTooltip = true;

  tooltipText: string;
  element: HTMLElement;

  active = false;
  delayTimeout: unknown;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private mdlTooltipPositionService: MdlTooltipPositionService) {

    this.element = elRef.nativeElement;
  }

  @HostBinding('class.mdl-tooltip--bottom') get isBottom(): boolean {
    return this.position === 'bottom';
  }

  @HostBinding('class.mdl-tooltip--right') get isRight(): boolean {
    return this.position === 'right';
  }

  @HostBinding('class.mdl-tooltip--left') get isLeft(): boolean {
    return this.position === 'left';
  }

  @HostBinding('class.mdl-tooltip--top') isTop(): boolean {
    return this.position === 'top';
  }

  mouseLeave(): void {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout as number);
    }
    this.setActive(false);
  }

  mouseEnter(event: Event): void {
    if (this.delay) {
      this.delayTimeout = setTimeout(() => {
        this.show(event.target as HTMLElement);
      }, this.delay);
    } else {
      this.show(event.target as HTMLElement);
    }
  }

  isActive(): boolean {
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
  providers: [MdlTooltipPositionService],
  encapsulation: ViewEncapsulation.None
})
export class MdlTooltipComponent extends MdlSimpleTooltipComponent {
  constructor(elRef: ElementRef, renderer: Renderer2, mdlTooltipPositionService: MdlTooltipPositionService) {
    super(elRef, renderer, mdlTooltipPositionService);
  }
}
