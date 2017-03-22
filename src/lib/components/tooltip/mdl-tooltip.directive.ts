import {
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  Renderer2,
  ComponentRef,
  ComponentFactoryResolver,
  HostListener, OnChanges, SimpleChanges
} from '@angular/core';
import { MdlSimpleTooltipComponent, MdlTooltipComponent } from './mdl-tooltip.component';

export class AbstractMdlTooltipDirective implements OnInit, OnChanges {

  protected tooltip: string|MdlTooltipComponent;
  protected position: 'left' | 'right' | 'top' | 'bottom';

  protected tooltipComponent: MdlSimpleTooltipComponent;

  constructor(
    private vcRef: ViewContainerRef,
    private large: boolean,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2) {
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tooltip'] && !changes['tooltip'].isFirstChange()){
      if (!(this.tooltip instanceof MdlTooltipComponent)) {
        this.tooltipComponent.tooltipText = <string>this.tooltip;
      }
    }
  }


  private configureTooltipComponent() {
    this.tooltipComponent.large = this.large;
    this.tooltipComponent.position = this.position;
  }

  public onMouseEnter(event) {
    this.tooltipComponent.mouseEnter(event);
  }

  @HostListener('window:touchstart')
  public onMouseLeave() {
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
  @Input('mdl-tooltip-position')  public position: 'left' | 'right' | 'top' | 'bottom';

  constructor(
    vcRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver,
    renderer: Renderer2) {
    super(vcRef, false, componentFactoryResolver, renderer);
  }

  public ngOnInit() { super.ngOnInit(); }
  public ngOnChanges(changes: SimpleChanges) { super.ngOnChanges(changes)};
}

@Directive({
  selector: '[mdl-tooltip-large]',
  host: host
})
export class MdlTooltipLargeDirective extends AbstractMdlTooltipDirective {

  @Input('mdl-tooltip-large')     public tooltip: string|MdlTooltipComponent;
  @Input('mdl-tooltip-position')  public position: 'left' | 'right' | 'top' | 'bottom';

  constructor(
    vcRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver,
    renderer: Renderer2) {
    super(vcRef, true, componentFactoryResolver, renderer);
  }

  public ngOnInit() { super.ngOnInit(); }
  public ngOnChanges(changes: SimpleChanges) { super.ngOnChanges(changes)};
}
