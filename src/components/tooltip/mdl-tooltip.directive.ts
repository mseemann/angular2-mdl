import {
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  Renderer,
  ComponentRef,
  ComponentFactoryResolver,
  HostListener
} from '@angular/core';
import { MdlSimpleTooltipComponent, MdlTooltipComponent } from './mdl-tooltip.component';

export class AbstractMdlTooltipDirective implements OnInit {

  protected tooltip: string|MdlTooltipComponent;
  protected position: string;

  protected tooltipComponent: MdlSimpleTooltipComponent;

  constructor(
    private vcRef: ViewContainerRef,
    private large: boolean,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer) {
  }


  public ngOnInit() {
    // if the tooltip is not an instance of MdlTooltipComponent
    // we create a simpleTooltipComponent on the fly.
    if (!(this.tooltip instanceof MdlTooltipComponent)) {

      let cFactory = this.componentFactoryResolver.resolveComponentFactory(MdlSimpleTooltipComponent);
      let cRef: ComponentRef<MdlSimpleTooltipComponent> = this.vcRef.createComponent(cFactory);

      this.tooltipComponent = <MdlSimpleTooltipComponent> cRef.instance;
      this.tooltipComponent.tooltipText = <string>this.tooltip;
      this.configureTooltipComponent();

    } else {
      this.tooltipComponent = <MdlTooltipComponent>this.tooltip;
      this.configureTooltipComponent();
    }

  }



  private configureTooltipComponent() {
    this.tooltipComponent.large = this.large;
    this.tooltipComponent.position = this.position;
  }

  protected onMouseEnter(event) {
    this.tooltipComponent.mouseEnter(event);
  }

  @HostListener('window:touchstart')
  protected onMouseLeave() {
    this.tooltipComponent.mouseLeave();
  }
}


const host: { [key: string]: string; } = {
  '(mouseenter)': 'onMouseEnter($event)',
  '(touchend)': 'onMouseEnter($event)',
  '(mouseleave)': 'onMouseLeave()'
};


@Directive({
  selector: '[mdl-tooltip]',
  host: host
})
export class MdlTooltipDirective extends AbstractMdlTooltipDirective {

  @Input('mdl-tooltip')           public tooltip: string|MdlTooltipComponent;
  @Input('mdl-tooltip-position')  public position: string;

  constructor(
    vcRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver,
    renderer: Renderer) {
    super(vcRef, false, componentFactoryResolver, renderer);
  }
}

@Directive({
  selector: '[mdl-tooltip-large]',
  host: host
})
export class MdlTooltipLargeDirective extends AbstractMdlTooltipDirective {

  @Input('mdl-tooltip-large')     public tooltip: string|MdlTooltipComponent;
  @Input('mdl-tooltip-position')  public position: string;

  constructor(
    vcRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver,
    renderer: Renderer) {
    super(vcRef, true, componentFactoryResolver, renderer);
  }
}
