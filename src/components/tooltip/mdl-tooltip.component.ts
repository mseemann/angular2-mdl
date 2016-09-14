import {
  Component,
  ElementRef,
  Renderer
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
  providers: [MdlTooltipPositionService]
})
export class MdlSimpleTooltipComponent {
  public tooltipText: string;
  public element: HTMLElement;
  public large = false;
  public position: string;


  constructor(
    private elRef: ElementRef,
    private renderer: Renderer,
    private mdlTooltipPositionService: MdlTooltipPositionService) {

    this.element = elRef.nativeElement;
  }

  public mouseLeave() {
    this.renderer.setElementClass(this.elRef.nativeElement, IS_ACTIVE, false);
  }

  public mouseEnter(event) {
    let props = event.target.getBoundingClientRect();
    let offsetWidth = this.element.offsetWidth;
    let offsetHeight = this.element.offsetHeight;

    let style = this.mdlTooltipPositionService.calcStyle(offsetWidth, offsetHeight, props, this.position);

    for (var key in style) {
      this.renderer.setElementStyle(this.elRef.nativeElement, key, style[key]);
    }

    this.renderer.setElementClass(this.elRef.nativeElement, IS_ACTIVE, true);
  }
}

@Component({
  selector: 'mdl-tooltip',
  template: '<div><ng-content></ng-content></div>',
  exportAs: 'mdlTooltip',
  host: host,
  providers: [MdlTooltipPositionService]
})
export class MdlTooltipComponent extends MdlSimpleTooltipComponent {
  constructor(elRef: ElementRef, renderer: Renderer, mdlTooltipPositionService: MdlTooltipPositionService) {
    super(elRef, renderer, mdlTooltipPositionService);
  }
}
