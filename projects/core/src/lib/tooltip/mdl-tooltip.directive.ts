import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from "@angular/core";
import {
  MdlSimpleTooltipComponent,
  MdlTooltipComponent,
} from "./mdl-tooltip.component";

@Directive()
export abstract class AbstractMdlTooltipDirective implements OnInit, OnChanges {
  protected tooltip: string | MdlTooltipComponent | undefined;
  protected position: "left" | "right" | "top" | "bottom" = "top";

  protected tooltipComponent: MdlSimpleTooltipComponent | undefined;

  protected constructor(
    private vcRef: ViewContainerRef,
    private large: boolean,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener("touchend", ["$event"])
  @HostListener("mouseenter", ["$event"])
  onMouseEnter(event: MouseEvent): void {
    this.tooltipComponent?.mouseEnter(event);
  }

  @HostListener("window:touchstart")
  @HostListener("mouseleave")
  onMouseLeave(): void {
    this.tooltipComponent?.mouseLeave();
  }

  ngOnInit(): void {
    // if the tooltip is not an instance of MdlTooltipComponent
    // we create a simpleTooltipComponent on the fly.
    if (!(this.tooltip instanceof MdlTooltipComponent)) {
      const cFactory = this.componentFactoryResolver.resolveComponentFactory(
        MdlSimpleTooltipComponent
      );
      const cRef: ComponentRef<MdlSimpleTooltipComponent> =
        this.vcRef.createComponent(cFactory);

      this.tooltipComponent = cRef.instance as MdlSimpleTooltipComponent;
      if (this.tooltipComponent) {
        this.tooltipComponent.tooltipText = this.tooltip;
      }
      this.configureTooltipComponent();
    } else {
      this.tooltipComponent = this.tooltip;
      this.configureTooltipComponent();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["tooltip"] && !changes["tooltip"].isFirstChange()) {
      if (!(this.tooltip instanceof MdlTooltipComponent)) {
        if (this.tooltipComponent) {
          this.tooltipComponent.tooltipText = this.tooltip;
        }
      }
    }
  }

  private configureTooltipComponent() {
    if (this.tooltipComponent) {
      this.tooltipComponent.large = this.large;
      this.tooltipComponent.position = this.position;
    }
  }
}

@Directive({
  // eslint-disable-next-line
  selector: "[mdl-tooltip]",
})
export class MdlTooltipDirective extends AbstractMdlTooltipDirective {
  @Input("mdl-tooltip") public override tooltip:
    | string
    | MdlTooltipComponent
    | undefined;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("mdl-tooltip-position") public override position:
    | "left"
    | "right"
    | "top"
    | "bottom" = "top";

  constructor(
    vcRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(vcRef, false, componentFactoryResolver);
  }
}

@Directive({
  // eslint-disable-next-line
  selector: "[mdl-tooltip-large]",
})
export class MdlTooltipLargeDirective extends AbstractMdlTooltipDirective {
  @Input("mdl-tooltip-large") public override tooltip:
    | string
    | MdlTooltipComponent
    | undefined;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("mdl-tooltip-position") public override position:
    | "left"
    | "right"
    | "top"
    | "bottom" = "top";

  constructor(
    vcRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(vcRef, true, componentFactoryResolver);
  }
}
