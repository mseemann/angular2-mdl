import {
  Directive,
  DirectiveMetadata,
  Input,
  OnInit,
  ViewContainerRef,
  ComponentResolver,
  ElementRef,
  Renderer,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MdlSimpleTooltipComponent, MdlTooltipComponent } from './mdl-tooltip.component';

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
    // if the tooltip is not an instance of MdlTooltipComponent
    // we create a simpleTooltipComponent on the fly.
    if (!(this.tooltip instanceof MdlTooltipComponent)){
      let c = this.componentResolver.resolveComponent(MdlSimpleTooltipComponent);
      c.then( (cFactory)=> {
        this.tooltipComponent = this.vcRef.createComponent(cFactory).instance;
        this.tooltipComponent.tooltipText = <string>this.tooltip;
        this.configureTooltipComponent();
      });
    } else {
      this.tooltipComponent = <MdlTooltipComponent>this.tooltip;
      this.configureTooltipComponent();
    }
    this.doc.addEventListener('touchstart', this.onMouseLeave);
  }

  private configureTooltipComponent(){
    this.tooltipComponent.large = this.large;
    this.tooltipComponent.position = this.position;
  }

  onMouseEnter(event){
    this.tooltipComponent.mouseEnter(event);
  }

  onMouseLeave(){
    this.tooltipComponent.mouseLeave();
  }
}


let tooltipMeta =  new DirectiveMetadata();
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
