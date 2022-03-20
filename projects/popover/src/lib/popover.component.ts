import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { MdlButtonComponent } from "@angular-mdl/core";

@Injectable({
  providedIn: "root",
})
export class MdlPopoverRegistry {
  private popoverComponents: MdlPopoverComponent[] = [];

  // eslint-disable-next-line
  constructor(@Inject(DOCUMENT) private doc: any) {
    this.doc.addEventListener("click", () => {
      this.popoverComponents
        .filter((component: MdlPopoverComponent) => component.isVisible)
        .forEach((component: MdlPopoverComponent) => component.hide());
    });
  }

  add(popoverComponent: MdlPopoverComponent): void {
    this.popoverComponents.push(popoverComponent);
  }

  remove(popoverComponent: MdlPopoverComponent): void {
    this.popoverComponents.slice(
      this.popoverComponents.indexOf(popoverComponent),
      1
    );
  }

  hideAllExcept(popoverComponent: MdlPopoverComponent): void {
    this.popoverComponents.forEach((component) => {
      if (component !== popoverComponent) {
        component.hide();
      }
    });
  }
}

const BOTTOM_LEFT = "bottom-left"; // Below the element, aligned to its left.
const BOTTOM_RIGHT = "bottom-right"; // Below the element, aligned to its right.
const TOP_LEFT = "top-left"; // Above the element, aligned to its left.
const TOP_RIGHT = "top-right"; // Above the element, aligned to its right.

export interface IPositionCoordinates {
  left: number;
  top: number;
}

@Injectable({
  providedIn: "root",
})
export class PopupPositionService {
  public updatePosition(
    forElement: HTMLElement,
    popoverElement: HTMLElement,
    position: string
  ): void {
    const coordinates = this.calculateCoordinates(
      forElement,
      popoverElement,
      position
    );
    this.applyCoordinates(coordinates, popoverElement.style);
  }

  private applyCoordinates(
    coordinates: IPositionCoordinates | null,
    elementStyle: CSSStyleDeclaration
  ) {
    if (!coordinates) {
      return;
    }

    elementStyle.right = elementStyle.bottom = "";

    elementStyle.left = coordinates.left + "px";
    elementStyle.top = coordinates.top + "px";
  }

  private calculateCoordinates(
    forElement: HTMLElement,
    popoverElement: HTMLElement,
    position: string
  ): IPositionCoordinates | null {
    if (!forElement || !position) {
      return null;
    }

    switch (position) {
      case BOTTOM_RIGHT:
        return {
          top: forElement.offsetTop + forElement.offsetHeight,
          left:
            forElement.offsetLeft +
            forElement.offsetWidth -
            popoverElement.offsetWidth,
        };
      case BOTTOM_LEFT:
        return {
          top: forElement.offsetTop + forElement.offsetHeight,
          left: forElement.offsetLeft,
        };
      case TOP_LEFT:
        return {
          top: forElement.offsetTop - popoverElement.offsetHeight,
          left: forElement.offsetLeft,
        };
      case TOP_RIGHT:
        return {
          top: forElement.offsetTop - popoverElement.offsetHeight,
          left:
            forElement.offsetLeft +
            forElement.offsetWidth -
            popoverElement.offsetWidth,
        };
    }
    return null;
  }
}

@Component({
  selector: "mdl-popover",
  templateUrl: "popover.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class MdlPopoverComponent implements OnDestroy {
  // eslint-disable-next-line
  @Input("hide-on-click")
  hideOnClick = false;
  // eslint-disable-next-line
  @Input("mdl-popover-position")
  position: string | undefined;

  @Output()
  // eslint-disable-next-line  @angular-eslint/no-output-on-prefix
  onShow: EventEmitter<void> = new EventEmitter();

  @Output()
  // eslint-disable-next-line  @angular-eslint/no-output-on-prefix
  onHide: EventEmitter<void> = new EventEmitter();
  @HostBinding("class.mdl-popover")
  isMdlPopover = true;
  @HostBinding("class.is-visible")
  isVisible = false;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    private popoverRegistry: MdlPopoverRegistry,
    private popupPositionService: PopupPositionService
  ) {
    this.popoverRegistry.add(this);
  }

  @HostListener("click", ["$event"]) onClick(event: Event): void {
    if (!this.hideOnClick) {
      event.stopPropagation();
    }
  }

  ngOnDestroy(): void {
    this.popoverRegistry.remove(this);
  }

  toggle(
    event: Event,
    forElement: MdlButtonComponent | ElementRef | null = null
  ): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show(event, forElement);
    }
  }

  hide(): void {
    if (this.isVisible) {
      this.onHide.emit();
      this.isVisible = false;
      this.changeDetectionRef.markForCheck();
    }
  }

  show(
    event: Event,
    forElement: MdlButtonComponent | ElementRef | null = null
  ): void {
    this.hideAllPopovers();
    event.stopPropagation();
    if (!this.isVisible) {
      this.onShow.emit();
      this.isVisible = true;
      this.updateDirection(forElement);
    }
  }

  private hideAllPopovers() {
    this.popoverRegistry.hideAllExcept(this);
  }

  private updateDirection(forElement: MdlButtonComponent | ElementRef | null) {
    if (forElement && this.position) {
      const popoverElement = this.elementRef.nativeElement;

      const forHtmlElement = this.getHtmlElement(forElement);
      this.popupPositionService.updatePosition(
        forHtmlElement,
        popoverElement,
        this.position
      );
      this.changeDetectionRef.markForCheck();
      return;
    }
  }

  private getHtmlElement(
    forElement: MdlButtonComponent | ElementRef
  ): HTMLElement {
    if (forElement instanceof MdlButtonComponent) {
      return forElement.elementRef.nativeElement;
    }

    if (forElement instanceof ElementRef) {
      return forElement.nativeElement;
    }

    return forElement;
  }
}
