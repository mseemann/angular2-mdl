import {
  Directive,
  DirectiveMetadata,
  Input,
  OnInit,
  ViewContainerRef,
  ComponentResolver,
  Renderer
} from '@angular/core';
import { MdlSimpleTooltipComponent, MdlTooltipComponent } from './mdl-tooltip.component';

export class AbstractMdlTooltipDirective implements OnInit {

  protected tooltip: string|MdlTooltipComponent;
  protected position: string;

  protected tooltipComponent: MdlSimpleTooltipComponent;

  constructor(
    private vcRef: ViewContainerRef,
    private large: boolean,
    private componentResolver: ComponentResolver,
    private renderer: Renderer) {
  }


  public ngOnInit() {
    // if the tooltip is not an instance of MdlTooltipComponent
    // we create a simpleTooltipComponent on the fly.
    if (!(this.tooltip instanceof MdlTooltipComponent)) {
      let c = this.componentResolver.resolveComponent(MdlSimpleTooltipComponent);
      c.then( (cFactory) => {
        this.tooltipComponent = this.vcRef.createComponent(cFactory).instance;
        this.tooltipComponent.tooltipText = <string>this.tooltip;
        this.configureTooltipComponent();
      });
    } else {
      this.tooltipComponent = <MdlTooltipComponent>this.tooltip;
      this.configureTooltipComponent();
    }

    this.renderer.listenGlobal('window', 'touchstart', () => {
      this.onMouseLeave();
    });

  }

  private configureTooltipComponent() {
    this.tooltipComponent.large = this.large;
    this.tooltipComponent.position = this.position;
  }

  protected onMouseEnter(event) {
    this.tooltipComponent.mouseEnter(event);
  }

  protected onMouseLeave() {
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

  @Input('mdl-tooltip')           public tooltip: string|MdlTooltipComponent;
  @Input('mdl-tooltip-position')  public position: string;

  constructor(vcRef: ViewContainerRef, componentResolver: ComponentResolver, renderer: Renderer) {
    super(vcRef, false, componentResolver, renderer);
  }
}

tooltipMeta.selector = '[mdl-tooltip-large]';

@Directive(tooltipMeta)
export class MdlTooltipLargeDirective extends AbstractMdlTooltipDirective {

  @Input('mdl-tooltip-large')     public tooltip: string|MdlTooltipComponent;
  @Input('mdl-tooltip-position')  public position: string;

  constructor(vcRef: ViewContainerRef, componentResolver: ComponentResolver,  renderer: Renderer) {
    super(vcRef, true, componentResolver, renderer);
  }
}
