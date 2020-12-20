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
  ViewEncapsulation
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {MdlButtonComponent} from '@angular-mdl/core';

@Injectable({
  providedIn: 'root'
})
export class MdlPopoverRegistry {
  private popoverComponents: any[] = [];

  constructor(@Inject(DOCUMENT) private doc: any) {
    this.doc.addEventListener('click', () => {
      this.popoverComponents
        .filter((component: MdlPopoverComponent) => component.isVisible)
        .forEach((component: MdlPopoverComponent) => component.hide());
    });
  }

  public add(popoverComponent: MdlPopoverComponent) {
    this.popoverComponents.push(popoverComponent);
  }

  public remove(popoverComponent: MdlPopoverComponent) {
    this.popoverComponents.slice(this.popoverComponents.indexOf(popoverComponent), 1);
  }

  public hideAllExcept(popoverComponent: MdlPopoverComponent) {
    this.popoverComponents.forEach((component) => {
      if (component !== popoverComponent) {
        component.hide();
      }
    });
  }
}

const BOTTOM_LEFT = 'bottom-left'; // Below the element, aligned to its left.
const BOTTOM_RIGHT = 'bottom-right'; // Below the element, aligned to its right.
const TOP_LEFT = 'top-left'; // Above the element, aligned to its left.
const TOP_RIGHT = 'top-right'; // Above the element, aligned to its right.

export interface IPositionCoordinates {
  left: number;
  top: number;
}

@Injectable({
  providedIn: 'root'
})
export class PopupPositionService {
  public updatePosition(forElement: HTMLElement, popoverElement: HTMLElement, position: string): void {
    const coordinates = this.calculateCoordinates(forElement, popoverElement, position);
    this.applyCoordinates(coordinates, popoverElement.style);
  }

  private applyCoordinates(coordinates: IPositionCoordinates, elementStyle: CSSStyleDeclaration) {
    if (!coordinates) {
      return;
    }

    elementStyle.right =
      elementStyle.bottom = '';

    elementStyle.left = coordinates.left + 'px';
    elementStyle.top = coordinates.top + 'px';
  }

  private calculateCoordinates(forElement: HTMLElement, popoverElement: HTMLElement, position: string): IPositionCoordinates {
    if (!forElement || !position) {
      return null;
    }

    switch (position) {
      case BOTTOM_RIGHT:
        return {
          top: forElement.offsetTop + forElement.offsetHeight,
          left: forElement.offsetLeft + forElement.offsetWidth - popoverElement.offsetWidth
        };
      case BOTTOM_LEFT:
        return {
          top: forElement.offsetTop + forElement.offsetHeight,
          left: forElement.offsetLeft
        };
      case TOP_LEFT:
        return {
          top: forElement.offsetTop - popoverElement.offsetHeight,
          left: forElement.offsetLeft
        };
      case TOP_RIGHT:
        return {
          top: forElement.offsetTop - popoverElement.offsetHeight,
          left: forElement.offsetLeft + forElement.offsetWidth - popoverElement.offsetWidth
        };
    }
  }
}

@Component({
  selector: 'mdl-popover',
  templateUrl: 'popover.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MdlPopoverComponent implements OnDestroy {

  // eslint-disable-next-line
  @Input('hide-on-click') public hideOnClick = false;
  // eslint-disable-next-line
  @Input('mdl-popover-position') public position: string;
  // eslint-disable-next-line
  @Output() onShow: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line
  @Output() onHide: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.mdl-popover') isMdlPopover = true;
  @HostBinding('class.is-visible') public isVisible = false;

  constructor(private changeDetectionRef: ChangeDetectorRef,
              public elementRef: ElementRef,
              private popoverRegistry: MdlPopoverRegistry,
              private popupPositionService: PopupPositionService) {
    this.popoverRegistry.add(this);
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    if (!this.hideOnClick) {
      event.stopPropagation();
    }
  }

  public ngOnDestroy() {
    this.popoverRegistry.remove(this);
  }

  public toggle(event: Event, forElement: any = null) {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show(event, forElement);
    }
  }

  public hide() {
    if (this.isVisible) {
      this.onHide.emit(null);
      this.isVisible = false;
      this.changeDetectionRef.markForCheck();
    }
  }

  public show(event: Event, forElement: any = null) {
    this.hideAllPopovers();
    event.stopPropagation();
    if (!this.isVisible) {
      this.onShow.emit(null);
      this.isVisible = true;
      this.updateDirection(event, forElement);
    }
  }

  private hideAllPopovers() {
    this.popoverRegistry.hideAllExcept(this);
  }

  private updateDirection(event: Event, forElement: any) {
    if (forElement && this.position) {
      const popoverElement = this.elementRef.nativeElement;

      const forHtmlElement = this.getHtmlElement(forElement);
      this.popupPositionService.updatePosition(forHtmlElement, popoverElement, this.position);
      this.changeDetectionRef.markForCheck();
      return;
    }
  }

  private getHtmlElement(forElement: any): HTMLElement {
    if (forElement instanceof MdlButtonComponent) {
      const buttonComponent: MdlButtonComponent = forElement;
      return buttonComponent.elementRef.nativeElement;
    }

    if (forElement instanceof ElementRef) {
      const elementRef: ElementRef = forElement;
      return elementRef.nativeElement;
    }

    return forElement;
  }
}
