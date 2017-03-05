import {
  Component,
  ElementRef,
  Renderer,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { MdlTooltipPositionService } from './mdl-tooltip-position.service';

const IS_ACTIVE = 'is-active';

const host:  { [key: string]: string; } = {
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
  private active = false;

  @Input() delay: Number;
  private delayTimeout: any;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer,
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

  private show(element: HTMLElement){
    let props = element.getBoundingClientRect();
    let offsetWidth = this.element.offsetWidth;
    let offsetHeight = this.element.offsetHeight;

    let style = this.mdlTooltipPositionService.calcStyle(offsetWidth, offsetHeight, props, this.position);

    for (var key in style) {
      this.renderer.setElementStyle(this.elRef.nativeElement, key, style[key]);
    }

    this.setActive(true);
  }

  private hide() {
    this.mouseLeave();
  }

  private setActive(active: boolean){
    this.active = active;
    this.renderer.setElementClass(this.elRef.nativeElement, IS_ACTIVE, active);

  }

  public isActive() {
    return this.active;
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
  constructor(elRef: ElementRef, renderer: Renderer, mdlTooltipPositionService: MdlTooltipPositionService) {
    super(elRef, renderer, mdlTooltipPositionService);
  }
}
