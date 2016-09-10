import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer,
} from '@angular/core';
import { MdlButtonComponent } from './../button/mdl-button.component';

const BOTTOM_LEFT   = 'bottom-left';
const BOTTOM_RIGHT  = 'bottom-right';
const TOP_LEFT      = 'top-left';
const TOP_RIGHT     = 'top-right';
const UNALIGNED     = 'unaligned';

const CSS_ALIGN_MAP = {};
CSS_ALIGN_MAP[BOTTOM_LEFT] = 'mdl-menu--bottom-left';
CSS_ALIGN_MAP[BOTTOM_RIGHT] = 'mdl-menu--bottom-right';
CSS_ALIGN_MAP[TOP_LEFT] = 'mdl-menu--top-left';
CSS_ALIGN_MAP[TOP_RIGHT] = 'mdl-menu--top-right';
CSS_ALIGN_MAP[UNALIGNED] = 'mdl-menu--unaligned';

@Component({
  selector: 'mdl-popover',
  host: {
  },
  exportAs: 'mdlPopover',
  template: `
   <div #container class="mdl-popover__container is-upgraded" [style.width]="width">
      <ng-content></ng-content>
   </div>
  `,
})
export class MdlPopoverComponent implements OnInit, AfterViewInit {
  @Input('mdl-menu-position') public position: string;
  @Input('hide-on-click') public hideOnClick: boolean = false;
  @Input('width') public width: string = '';

  @ViewChild('container') private containerChild: ElementRef;
  private container: HTMLElement;

  private cssPosition = 'mdl-menu--bottom-left';

  private isVisible   = false;

  constructor(private renderer: Renderer) {}

  public ngOnInit() {
    this.cssPosition = CSS_ALIGN_MAP[this.position] || BOTTOM_LEFT;
  }

  public ngAfterViewInit() {
    this.container    = this.containerChild.nativeElement;

    // Add a click listener to the document, to close the popover.
    var callback = (event) => {
      if (this.isVisible && (this.hideOnClick || !this.container.contains(event.target))) {
        this.hide();
      }
    };
    this.renderer.listenGlobal('window', 'click', callback);
    this.renderer.listenGlobal('window', 'touchstart', callback);
  }

  public toggle(event: Event , mdlButton: MdlButtonComponent) {
    if (!mdlButton) {
      throw `MdlButtonComponent is required`;
    }
    if (this.isVisible) {
      this.hide();
    } else {
      this.hideAllPopovers();
      this.show(event, mdlButton);
    }
  }

  public hide() {
    this.container.classList.remove('is-visible');
    this.isVisible = false;
  }

  public hideAllPopovers() {
    [].map.call(document.querySelectorAll('.mdl-popover__container.is-visible'), function(el) {
      el.classList.remove('is-visible');
    });
  }

  public show(event, mdlButton) {
    event.stopPropagation();
    this.container.classList.add('is-visible');
    this.isVisible = true;
  }
}

