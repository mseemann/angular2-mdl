import {
  Component,
  ComponentMetadata,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  ComponentResolver,
  ElementRef,
  Renderer,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

const LEFT      = 'mdl-tooltip--left';
const RIGHT     = 'mdl-tooltip--right';
const TOP       = 'mdl-tooltip--top';
const IS_ACTIVE = 'is-active';


let tooltipComponentMeta = new ComponentMetadata();
tooltipComponentMeta.selector = 'mdl-simple-tooltip';
tooltipComponentMeta.host = {
  '[class.mdl-tooltip]': 'true',
  '[class.mdl-tooltip--large]': 'large',
  '[class.mdl-tooltip--left]': 'position=="left"',
  '[class.mdl-tooltip--right]': 'position=="right"',
  '[class.mdl-tooltip--top]': 'position=="top"',
  '[class.mdl-tooltip--bottom]': 'position=="bottom"'
};
tooltipComponentMeta.template = '<div>{{tooltipText}}</div>';

@Component(tooltipComponentMeta)
export class MdlSimpleTooltipComponent {
  tooltipText:string;
  element:HTMLElement;
  large = false;
  position:string;

  constructor(private elRef:ElementRef, private renderer:Renderer){
    this.element = elRef.nativeElement;
  }

  mouseLeave(){
    this.renderer.setElementClass(this.elRef.nativeElement, IS_ACTIVE, false);
  }

  mouseEnter(event){
    //TODO should be a service to improve testability
    var props = event.target.getBoundingClientRect();
    var left = props.left + (props.width / 2);
    var top = props.top + (props.height / 2);
    var marginLeft = -1 * (this.element.offsetWidth / 2);
    var marginTop = -1 * (this.element.offsetHeight / 2);
    if (this.element.classList.contains(LEFT) || this.element.classList.contains(RIGHT)) {
      left = (props.width / 2);
      if (top + marginTop < 0) {
        this.element.style.top = '0';
        this.element.style.marginTop = '0';
      } else {
        this.element.style.top = top + 'px';
        this.element.style.marginTop = marginTop + 'px';
      }
    } else {
      if (left + marginLeft < 0) {
        this.element.style.left = '0';
        this.element.style.marginLeft = '0';
      } else {
        this.element.style.left = left + 'px';
        this.element.style.marginLeft = marginLeft + 'px';
      }
    }

    if (this.element.classList.contains(TOP)) {
      this.element.style.top = props.top - this.element.offsetHeight - 10 + 'px';
    } else if (this.element.classList.contains(RIGHT)) {
      this.element.style.left = props.left + props.width + 10 + 'px';
    } else if (this.element.classList.contains(LEFT)) {
      this.element.style.left = props.left - this.element.offsetWidth - 10 + 'px';
    } else {
      this.element.style.top = props.top + props.height + 10 + 'px';
    }

    this.renderer.setElementClass(this.elRef.nativeElement, IS_ACTIVE, true);
  }
}


tooltipComponentMeta.selector = 'mdl-tooltip';
tooltipComponentMeta.template = '<ng-content></ng-content>';
tooltipComponentMeta.exportAs = 'mdlTooltip';

@Component(tooltipComponentMeta)
export class MdlTooltipComponent extends MdlSimpleTooltipComponent {
  constructor(elRef:ElementRef, renderer:Renderer){
    super(elRef, renderer);
  }
}


export class AbstractMdlTooltipDirective implements OnInit {

  tooltip:string|MdlTooltipComponent;
  position:string;

  tooltipComponent:MdlSimpleTooltipComponent;

  constructor(
    private vcRef: ViewContainerRef,
    private large:boolean,
    private componentResolver: ComponentResolver,
    private doc:HTMLDocument){
  }

  ngOnInit(){
    if (!(this.tooltip instanceof MdlTooltipComponent)){
      let c = this.componentResolver.resolveComponent(MdlSimpleTooltipComponent);
      c.then( (cFactory)=> {
        this.tooltipComponent = this.vcRef.createComponent(cFactory).instance;
        this.tooltipComponent.tooltipText = <string>this.tooltip;
        this.tooltipComponent.large = this.large;
        this.tooltipComponent.position = this.position;
      });
    } else {

      this.tooltipComponent = <MdlTooltipComponent>this.tooltip;
      this.tooltipComponent.large = this.large;
      this.tooltipComponent.position = this.position;

    }

    this.doc.addEventListener('touchstart', this.onMouseLeave);

  }

  onMouseEnter(event){
    this.tooltipComponent.mouseEnter(event);
  }

  onMouseLeave(){
    this.tooltipComponent.mouseLeave();
  }
}


let tooltipMeta =  new ComponentMetadata();
tooltipMeta.host = {
  '(mouseenter)': 'onMouseEnter($event)',
  '(touchend)': 'onMouseEnter($event)',
  '(mouseleave)': 'onMouseLeave()'
};
tooltipMeta.selector = '[mdl-tooltip]';

@Directive(tooltipMeta)
export class MdlTooltipDirective extends AbstractMdlTooltipDirective {

  @Input('mdl-tooltip')           tooltip:string|MdlTooltipComponent;
  @Input('mdl-tooltip-position')  position:string;

  constructor(vcRef: ViewContainerRef, componentResolver: ComponentResolver, @Inject(DOCUMENT) doc){
    super(vcRef, false, componentResolver, doc);
  }
}

tooltipMeta.selector = '[mdl-tooltip-large]';

@Directive(tooltipMeta)
export class MdlTooltipLargeDirective extends AbstractMdlTooltipDirective {

  @Input('mdl-tooltip-large')     tooltip:string|MdlTooltipComponent;
  @Input('mdl-tooltip-position')  position:string;

  constructor(vcRef: ViewContainerRef, componentResolver: ComponentResolver, @Inject(DOCUMENT) doc){
    super(vcRef, true, componentResolver, doc);
  }
}


export const MDL_TOOLTIP_DIRECTIVES = [
  MdlTooltipComponent,
  MdlSimpleTooltipComponent,
  MdlTooltipLargeDirective,
  MdlTooltipDirective
];
