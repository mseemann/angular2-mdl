import {
  Component,
  ContentChild,
  AfterContentInit,
  OnDestroy,
  Input,
  Renderer2,
  ViewEncapsulation,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OpaqueToken,
  Optional,
  Inject,
  Injectable
} from '@angular/core';
import{ EventManager } from '@angular/platform-browser';
import { MdlError } from '../common/mdl-error';
import { toBoolean } from '../common/boolean-property';
import { toNumber } from '../common/number.property';
import { MdlLayoutHeaderComponent } from './mdl-layout-header.component';
import { MdlLayoutDrawerComponent } from './mdl-layout-drawer.component';
import { MdlLayoutContentComponent } from './mdl-layout-content.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const ESCAPE = 27;

const STANDARD = 'standard';
const WATERFALL = 'waterfall';
const SCROLL = 'scroll';

/**
 * The LAYOUT_SCREEN_SIZE_THRESHOLD can be changed at the root module. Just provide a value for this OpaqueToken:
 *
 * providers: [
 *  {provide:LAYOUT_SCREEN_SIZE_THRESHOLD, useValue: 768 }
 * ]
 *
 * you also need to change the scss variable to the same value: $layout-screen-size-threshold: 768px.
 *
 * It should be clear that this can only be used if you are using the scss and not the pre compiled css from getmdl.io.
 *
 * @type {OpaqueToken}
 */
export const LAYOUT_SCREEN_SIZE_THRESHOLD = new OpaqueToken('layoutScreenSizeThreshold');

export class MdLUnsupportedLayoutTypeError extends MdlError {
  constructor(type: string) {
      /* istanbul ignore next */
    super(`Layout type "${type}" isn't supported by mdl-layout (allowed: standard, waterfall, scroll).`);
  }
}

@Injectable()
export class MdlScreenSizeService {

  private sizesSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private windowMediaQueryListener: Function;

  constructor(
    @Optional() @Inject(LAYOUT_SCREEN_SIZE_THRESHOLD) private layoutScreenSizeThreshold: number) {

    // if no value is injected the default size wil be used. same as $layout-screen-size-threshold in scss
    if (!this.layoutScreenSizeThreshold) {
      this.layoutScreenSizeThreshold = 1024;
    }

    // do not try to access the window object if rendered on the server
    if (typeof window === 'object' && 'matchMedia' in window) {

      let query: MediaQueryList = window.matchMedia(`(max-width: ${this.layoutScreenSizeThreshold}px)`);

      let queryListener = () => {
          this.sizesSubject.next(query.matches);
      };
      query.addListener(queryListener);
      this.windowMediaQueryListener = function() {
        query.removeListener(queryListener);
      };
      // set the initial state
      this.sizesSubject.next(query.matches);

    }
  }

  public sizes(): Observable<boolean> {
    return this.sizesSubject.asObservable();
  }

  destroy(){
    if (this.windowMediaQueryListener) {
      this.windowMediaQueryListener();
      this.windowMediaQueryListener = null;
    }
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

  @ContentChild(MdlLayoutHeaderComponent) public header;
  // will be set to undefined, if not a direct child or not present in 2.0.0 i
  // n 2.0.1 it is now the grand child drawer again :(
  @ContentChild(MdlLayoutDrawerComponent) public drawer;
  @ContentChild(MdlLayoutContentComponent) public content;

  @Input('mdl-layout-mode') public mode: string = STANDARD;

  private _isFixedDrawer: boolean = false;
  @Input('mdl-layout-fixed-drawer')
  get isFixedDrawer() { return this._isFixedDrawer; }
  set isFixedDrawer(value) { this._isFixedDrawer = toBoolean(value); }

  private _isFixedHeader: boolean = false;
  @Input('mdl-layout-fixed-header')
  get isFixedHeader() { return this._isFixedHeader; }
  set isFixedHeader(value) { this._isFixedHeader = toBoolean(value); }

  private _isSeamed: boolean = false;
  @Input('mdl-layout-header-seamed')
  get isSeamed() { return this._isSeamed; }
  set isSeamed(value) { this._isSeamed = toBoolean(value); }

  private _selectedIndex: number = 0;
  @Input('mdl-layout-tab-active-index')
  get selectedIndex() { return this._selectedIndex; }
  set selectedIndex(value) { this._selectedIndex = toNumber(value); }

  private _isNoDrawer: boolean = false;
  @Input('mdl-layout-no-drawer-button')
  get isNoDrawer() { return this._isNoDrawer; }
  set isNoDrawer(value) { this._isNoDrawer = toBoolean(value); }

  @Output('mdl-layout-tab-active-changed') public selectedTabEmitter = new EventEmitter();
  @Output('mdl-layout-tab-mouseover') public mouseoverTabEmitter = new EventEmitter();
  @Output('mdl-layout-tab-mouseout') public mouseoutTabEmitter = new EventEmitter();

  @Output('open') public onOpen = new EventEmitter<void>();
  @Output('close') public onClose = new EventEmitter<void>();

  public isDrawerVisible = false;
  public isSmallScreen = false;

  private scrollListener: Function;

  constructor(
    private renderer: Renderer2,
    private evm: EventManager,
    private el: ElementRef,
    private screenSizeService: MdlScreenSizeService) {
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
         return true;
      });

      this.screenSizeService.sizes().subscribe( (isSmall: boolean) => {
        this.onQueryChange(isSmall);
      });
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
      this.setDrawerVisible(this.isDrawerVisible);
    }
  }

  public closeDrawer() {
    this.isDrawerVisible = false;
    if (this.drawer) {
      this.setDrawerVisible(false);
    }
  }

  private setDrawerVisible(visible: boolean){
    this.drawer.isDrawerVisible = visible;
    this.drawer.isDrawerVisible ? this.onOpen.emit() : this.onClose.emit();
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
    this.screenSizeService.destroy();
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
