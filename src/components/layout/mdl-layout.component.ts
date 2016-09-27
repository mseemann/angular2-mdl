import {
  Component,
  ContentChild,
  AfterContentInit,
  OnDestroy,
  Input,
  Renderer,
  ViewEncapsulation,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  NgZone
} from '@angular/core';
import{ EventManager } from '@angular/platform-browser';
import { MdlError } from './../common/mdl-error';
import { BooleanProperty } from './../common/boolean-property';
import { NumberProperty } from './../common/number.property';
import { MdlLayoutHeaderComponent } from './mdl-layout-header.component';
import { MdlLayoutDrawerComponent } from './mdl-layout-drawer.component';
import { MdlLayoutContentComponent } from './mdl-layout-content.component';

const ESCAPE = 27;

const STANDARD = 'standard';
const WATERFALL = 'waterfall';
const SCROLL = 'scroll';

export class MdLUnsupportedLayoutTypeError extends MdlError {
  constructor(type: string) {
    super(`Layout type "${type}" isn't supported by mdl-layout (allowed: standard, waterfall, scroll).`);
  }
}


@Component({
  selector: 'mdl-layout',
  template: `
    <div class="mdl-layout__container" [ngClass]="{'has-scrolling-header': mode==='scroll'}">
     <div class="mdl-layout is-upgraded"
          [ngClass]="{
          'is-small-screen': isSmallScreen,
          'mdl-layout--fixed-drawer': isFixedDrawer,
          'mdl-layout--fixed-header': isFixedHeader,
          'mdl-layout--fixed-tabs': 'tabs.toArray().length > 0'
          }">
        <ng-content select="mdl-layout-header"></ng-content>
        <ng-content select="mdl-layout-drawer"></ng-content>
        <div *ngIf="drawer && isNoDrawer==false" class="mdl-layout__drawer-button" (click)="toggleDrawer()">
           <mdl-icon>&#xE5D2;</mdl-icon>
        </div>
        <ng-content select="mdl-layout-content"></ng-content>
        <div class="mdl-layout__obfuscator"
             [ngClass]="{'is-visible':isDrawerVisible}"
             (click)="toggleDrawer()"
             (keydown)="obfuscatorKeyDown($event)"></div>
     </div>
    </div>
  `,
  exportAs: 'mdlLayout',
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutComponent implements AfterContentInit, OnDestroy, OnChanges {

  @ContentChild(MdlLayoutHeaderComponent) private header;
  // will be set to undefined, if not a direct child or not present in 2.0.0 i
  // n 2.0.1 it is now the grand child drawer again :(
  @ContentChild(MdlLayoutDrawerComponent) private drawer;
  @ContentChild(MdlLayoutContentComponent) private content;

  @Input('mdl-layout-mode') public mode: string = STANDARD;
  @Input('mdl-layout-fixed-drawer') @BooleanProperty() public isFixedDrawer = false;
  @Input('mdl-layout-fixed-header') @BooleanProperty() public isFixedHeader = false;
  @Input('mdl-layout-header-seamed') @BooleanProperty() public isSeamed = false;
  @Input('mdl-layout-tab-active-index') @NumberProperty() public selectedIndex: number = 0;
  @Input('mdl-ripple') @BooleanProperty() protected isRipple = false;
  @Input('mdl-layout-no-drawer-button') @BooleanProperty() public isNoDrawer = false;
  @Output('mdl-layout-tab-active-changed') public selectedTabEmitter = new EventEmitter();
  @Output('mdl-layout-tab-mouseover') public mouseoverTabEmitter = new EventEmitter();
  @Output('mdl-layout-tab-mouseout') public mouseoutTabEmitter = new EventEmitter();

  public isDrawerVisible = false;
  public isSmallScreen = false;

  private scrollListener: Function;
  private windowMediaQueryListener: Function;

  constructor(
    private renderer: Renderer,
    private evm: EventManager,
    private el: ElementRef,
    private ngZone: NgZone) {
  }

  public ngAfterContentInit() {
    this.validateMode();

    if (this.header && this.content && this.content.tabs) {
      this.header.tabs = this.content.tabs;
      this.updateSelectedTabIndex();
    }

    // set this.drawer to null, if the drawer is not a direct child if this layout. It may be a drywer of a sub layout.
    if (this.drawer && !this.drawer.isDrawerDirectChildOf(this)) {
      this.drawer = null;
    }

  }

  public ngOnChanges(changes: SimpleChanges): any {
    if ( changes['selectedIndex'] ) {
      this.updateSelectedTabIndex();
    }
  }

  private updateSelectedTabIndex() {
    if (this.header && this.header.tabs) {
      this.header.tabs.forEach( tab => tab.isActive = false);
      if (this.header.tabs.toArray().length > 0 && this.selectedIndex < this.header.tabs.toArray().length) {
        this.header.tabs.toArray()[this.selectedIndex].isActive = true;
      }
    }
  }

  private validateMode() {
    if (this.mode === '') {
      this.mode = STANDARD;
    }
    if ([STANDARD , WATERFALL, SCROLL].indexOf(this.mode) === -1) {
      throw new MdLUnsupportedLayoutTypeError(this.mode);
    }

    if (this.header) {
      // inform the header about the mode
      this.header.mode = this.mode;
      this.header.isSeamed = this.isSeamed;
    }


    if (this.content) {
      this.scrollListener = this.renderer.listen(this.content.el, 'scroll', (e) => {
         this.onScroll(this.content.el.scrollTop);
      });

      // do not try to access the window object if rendered on the server
      if (typeof window === 'object' && 'matchMedia' in window) {

        let query: MediaQueryList = window.matchMedia('(max-width: 1024px)');

        let queryListener = () => {
          this.ngZone.run( () => {
            // looks like the query addListener runs not in NGZone - inform manually about changes
            this.onQueryChange(query.matches);
          });
        };
        query.addListener(queryListener);
        this.windowMediaQueryListener = function() {
          query.removeListener(queryListener);
        };
        // set the initial state
        setTimeout(() => {
          this.onQueryChange(query.matches);
        });

      }
    }

  }

  private onScroll(scrollTop) {
    if (this.mode !== WATERFALL) {
      return;
    }

    if (this.header.isAnimating) {
      return;
    }

    let headerVisible = !this.isSmallScreen || this.isFixedHeader;
    if (scrollTop > 0 && !this.header.isCompact) {
      this.header.isCompact = true;
      if (headerVisible) {
        this.header.isAnimating = true;
      }
    } else if (scrollTop <= 0 && this.header.isCompact) {
      this.header.isCompact = false;
      if (headerVisible) {
        this.header.isAnimating = true;
      }
    }
  }

  private onQueryChange(isSmall: boolean) {
      if (isSmall) {
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
        this.closeDrawer();
      }
  }

  public toggleDrawer() {
    this.isDrawerVisible = !this.isDrawerVisible;
    if (this.drawer) {
      this.drawer.isDrawerVisible = this.isDrawerVisible;
    }
  }

  public closeDrawer() {
    this.isDrawerVisible = false;
    if (this.drawer) {
      this.drawer.isDrawerVisible = false;
    }
  }

  public obfuscatorKeyDown($event) {
    if ($event.keyCode === ESCAPE) {
      this.toggleDrawer();
    }
  }

  public ngOnDestroy() {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = null;
    }
    if (this.windowMediaQueryListener) {
      this.windowMediaQueryListener();
      this.windowMediaQueryListener = null;
    }
  }

  // triggered from mdl-layout-header.component
  public tabSelected(tab) {
    let index = this.header.tabs.toArray().indexOf(tab);
    if (index != this.selectedIndex) {
      this.selectedIndex = index;
      this.updateSelectedTabIndex();
      this.selectedTabEmitter.emit({index: this.selectedIndex});
    }
  }

  // triggered from mdl-layout-header.component
  public onTabMouseover(tab) {
    let index = this.header.tabs.toArray().indexOf(tab);
    this.mouseoverTabEmitter.emit({index: index});
  }

  // triggered from mdl-layout-header.component
  public onTabMouseout(tab) {
    let index = this.header.tabs.toArray().indexOf(tab);
    this.mouseoutTabEmitter.emit({index: index});
  }

  public closeDrawerOnSmallScreens() {
    if (this.isSmallScreen && this.isDrawerVisible) {
      this.closeDrawer();
    }
  }

  public hasDrawer() {
    return !!this.drawer;
  }
}
