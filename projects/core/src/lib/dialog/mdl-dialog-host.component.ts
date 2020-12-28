import {
  Component,
  ComponentRef,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from "@angular/core";

import { MDL_CONFIGUARTION, MIN_DIALOG_Z_INDEX } from "./config";
import {
  IMdlDialogConfiguration,
  IOpenCloseRect,
} from "./mdl-dialog-configuration";
import { MdlButtonComponent } from "../button/mdl-button.component";
import { InternalMdlDialogReference } from "./internal-dialog-reference";
import { Animations } from "../common/animations";

const enterTransitionDuration = 300;
const leaveTransitionDuration = 250;

const enterTransitionEasingCurve = "cubic-bezier(0.0, 0.0, 0.2, 1)";
const leaveTransitionEasingCurve = "cubic-bezier(0.0, 0.0, 0.2, 1)";

const createOpenCloseRect = (rect: ClientRect): IOpenCloseRect => ({
  height: rect.top - rect.bottom,
  left: rect.left,
  top: rect.top,
  width: rect.right - rect.left,
});

const getCenterInScreen = (rect: IOpenCloseRect) => ({
  cx: Math.round(rect.left + rect.width / 2),
  cy: Math.round(rect.top + rect.height / 2),
});

const getClientRect = (
  input: MdlButtonComponent | MouseEvent | IOpenCloseRect
): IOpenCloseRect => {
  if (input instanceof MdlButtonComponent) {
    const elRef = (input as MdlButtonComponent).elementRef;
    const rect: ClientRect = elRef.nativeElement.getBoundingClientRect();
    return createOpenCloseRect(rect);
  } else if (input instanceof MouseEvent) {
    const evt: MouseEvent = input as MouseEvent;
    // just to make it possible to test this code with a fake event - target is
    // readonly and con not be mutated.
    // eslint-disable-next-line
    const htmlElement = (evt.target || (evt as any).testtarget) as HTMLElement;
    const rect: ClientRect = htmlElement.getBoundingClientRect();
    return createOpenCloseRect(rect);
  }
  return input as IOpenCloseRect;
};

// @experimental
@Component({
  selector: "mdl-dialog-host-component",
  template: ` <div #dialogTarget></div>`,
  styles: [
    `
      mdl-dialog-host-component {
        width: fit-content;
        height: fit-content;
        padding: 1em;
        background: white;
        color: black;
        opacity: 1;
        visibility: hidden;
        display: block;
        position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        transition: all;
        top: 50%;
        transform: translate(0, -50%);
      }

      mdl-dialog-host-component.open {
        visibility: visible;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MdlDialogHostComponent implements OnInit {
  @ViewChild("dialogTarget", { read: ViewContainerRef, static: true })
  dialogTarget: ViewContainerRef;

  @HostBinding("class.mdl-dialog")
  isDialog = true;

  @HostBinding("class.open")
  visible = false;

  @HostBinding("style.zIndex")
  zIndex: number = MIN_DIALOG_Z_INDEX + 1;

  private showAnimationStartStyle: { [key: string]: string } = {
    top: "38%",
    opacity: "0",
  };
  private showStyle: { [key: string]: string } = {
    top: "50%",
    opacity: "1",
  };
  private hideAnimationEndStyle: { [key: string]: string } = {
    top: "63%",
    opacity: "0",
  };

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private animations: Animations,
    private elementRef: ElementRef,
    @Inject(forwardRef(() => MDL_CONFIGUARTION))
    private config: IMdlDialogConfiguration,
    private internalDialogRef: InternalMdlDialogReference
  ) {}

  show(): void {
    this.visible = true;
    // give the dialogs time to draw so that a focus can be set
    setTimeout(() => {
      this.internalDialogRef.visible();
    });

    if (this.isAnimateEnabled()) {
      if (this.config.openFrom || this.config.closeTo) {
        // transform is modified during anmiation and must be part of each animation keyframe.
        this.showStyle.transform = "translate(0, -50%) scale(1.0)";

        const targetClientRect = this.elementRef.nativeElement.getBoundingClientRect();

        const openFromRect = getClientRect(this.config.openFrom);
        const closeToRect = this.config.closeTo
          ? getClientRect(this.config.closeTo)
          : openFromRect;

        const centerTarget = getCenterInScreen(targetClientRect);
        const centerFrom = getCenterInScreen(openFromRect);
        const centerTo = getCenterInScreen(closeToRect);

        const translationFrom = {
          x: Math.round(centerFrom.cx - centerTarget.cx),
          y: Math.round(centerFrom.cy - centerTarget.cy),
          scaleX:
            Math.round(
              100 * Math.min(0.25, openFromRect.width / targetClientRect.width)
            ) / 100,
          scaleY:
            Math.round(
              100 *
                Math.min(0.25, openFromRect.height / targetClientRect.height)
            ) / 100,
        };

        this.showAnimationStartStyle = {
          top: `${targetClientRect.top}px`,
          opacity: "0",
          transform: `translate(${translationFrom.x}px, ${translationFrom.y}px) scale(${translationFrom.scaleX}, ${translationFrom.scaleY})`,
        };

        const translationTo = {
          x: Math.round(centerTo.cx - centerTarget.cx),
          y: Math.round(centerTo.cy - centerTarget.cy),
          scaleX:
            Math.round(
              100 * Math.min(0.25, closeToRect.width / targetClientRect.width)
            ) / 100,
          scaleY:
            Math.round(
              100 * Math.min(0.25, closeToRect.height / targetClientRect.height)
            ) / 100,
        };

        this.hideAnimationEndStyle = {
          top: `${targetClientRect.top}px`,
          opacity: "0",
          transform: `translate(${translationTo.x}px, ${translationTo.y}px) scale(${translationTo.scaleX}, ${translationTo.scaleY})`,
        };
      }

      const animation = this.animations.animate(
        this.elementRef.nativeElement,
        [this.showAnimationStartStyle, this.showStyle],
        this.config.enterTransitionDuration || enterTransitionDuration,
        this.config.enterTransitionEasingCurve || enterTransitionEasingCurve
      );

      animation.play();
    }
  }

  hide(selfComponentRef: ComponentRef<MdlDialogHostComponent>): void {
    if (this.isAnimateEnabled()) {
      const animation = this.animations.animate(
        this.elementRef.nativeElement,
        [this.showStyle, this.hideAnimationEndStyle],
        this.config.leaveTransitionDuration || leaveTransitionDuration,
        this.config.leaveTransitionEasingCurve || leaveTransitionEasingCurve
      );

      animation.onDone(() => {
        selfComponentRef.destroy();
      });

      animation.play();
    } else {
      selfComponentRef.destroy();
    }
  }

  ngOnInit(): void {
    this.applyStyle(this.config.styles);
    this.applyClasses(this.config.classes ? this.config.classes : "");
  }

  private applyStyle(styles: { [key: string]: string }) {
    if (styles) {
      for (const style of Object.keys(styles)) {
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          style,
          styles[style]
        );
      }
    }
  }

  private applyClasses(classes: string) {
    classes
      .split(" ")
      .filter((cssClass) => !!cssClass)
      .forEach((cssClass) => {
        this.renderer.addClass(this.elementRef.nativeElement, cssClass);
      });
  }

  private isAnimateEnabled() {
    // not present?  assume it is true.
    if (typeof this.config.animate === "undefined") {
      return true;
    }
    return this.config.animate;
  }
}
