import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {MdlSimpleTooltipComponent, MdlTooltipComponent} from './mdl-tooltip.component';

@Directive()
export abstract class AbstractMdlTooltipDirective implements OnInit, OnChanges {

  protected tooltip: string | MdlTooltipComponent;
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

      const cFactory = this.componentFactoryResolver.resolveComponentFactory(MdlSimpleTooltipComponent);
      const cRef: ComponentRef<MdlSimpleTooltipComponent> = this.vcRef.createComponent(cFactory);

      this.tooltipComponent = cRef.instance as MdlSimpleTooltipComponent;
      this.tooltipComponent.tooltipText = this.tooltip;
      this.configureTooltipComponent();

    } else {
      this.tooltipComponent = this.tooltip;
      this.configureTooltipComponent();
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tooltip && !changes.tooltip.isFirstChange()) {
      if (!(this.tooltip instanceof MdlTooltipComponent)) {
        this.tooltipComponent.tooltipText = this.tooltip;
      }
    }
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    this.tooltipComponent.mouseEnter(event);
  }

  @HostListener('window:touchstart')
  @HostListener('mouseleave')
  onMouseLeave() {
    this.tooltipComponent.mouseLeave();
  }

  private configureTooltipComponent() {
    this.tooltipComponent.large = this.large;
    this.tooltipComponent.position = this.position;
  }
}


@Directive({
  // tslint:disable-next-line
  selector: '[mdl-tooltip]'
})
export class MdlTooltipDirective extends AbstractMdlTooltipDirective {

  @Input('mdl-tooltip') public tooltip: string | MdlTooltipComponent;
  // tslint:disable-next-line:no-input-rename
  @Input('mdl-tooltip-position') public position: 'left' | 'right' | 'top' | 'bottom';

  constructor(
    vcRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver,
    renderer: Renderer2) {
    super(vcRef, false, componentFactoryResolver, renderer);
  }

}

@Directive({
  // tslint:disable-next-line
  selector: '[mdl-tooltip-large]'
})
export class MdlTooltipLargeDirective extends AbstractMdlTooltipDirective {

  @Input('mdl-tooltip-large') public tooltip: string | MdlTooltipComponent;
  // tslint:disable-next-line:no-input-rename
  @Input('mdl-tooltip-position') public position: 'left' | 'right' | 'top' | 'bottom';

  constructor(
    vcRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver,
    renderer: Renderer2) {
    super(vcRef, true, componentFactoryResolver, renderer);
  }

}
