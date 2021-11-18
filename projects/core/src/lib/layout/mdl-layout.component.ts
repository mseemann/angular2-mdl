import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { MdlLayoutHeaderComponent } from "./mdl-layout-header.component";
import { MdlLayoutDrawerComponent } from "./mdl-layout-drawer.component";
import { MdlLayoutContentComponent } from "./mdl-layout-content.component";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { toBoolean } from "../common/boolean-property";
import { toNumber } from "../common/number.property";
import { MdlError } from "../common/mdl-error";
import { MdlLayoutMediatorService } from "./mdl-layout-mediator.service";
import { MdlLayoutTabPanelComponent } from "./mdl-layout-tab-panel.component";

const ESCAPE = 27;

const STANDARD = "standard";
const WATERFALL = "waterfall";
const SCROLL = "scroll";

/**
 * The LAYOUT_SCREEN_SIZE_THRESHOLD can be changed at the root module. Just provide a value for this InjectionToken:
 *
 * providers: [
 *  {provide:LAYOUT_SCREEN_SIZE_THRESHOLD, useValue: 768 }
 * ]
 *
 * you also need to change the scss variable to the same value: $layout-screen-size-threshold: 768px.
 *
 * It should be clear that this can only be used if you are using the scss and not the pre compiled css from getmdl.io.
 *
 */
export const LAYOUT_SCREEN_SIZE_THRESHOLD = new InjectionToken<number>(
  "layoutScreenSizeThreshold"
);

export class MdLUnsupportedLayoutTypeError extends MdlError {
  constructor(type: string) {
    /* istanbul ignore next */
    super(
      `Layout type "${type}" isn't supported by mdl-layout (allowed: standard, waterfall, scroll).`
    );
  }
}

@Injectable({
  providedIn: "root",
})
export class MdlScreenSizeService {
  private sizesSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private windowMediaQueryListener: () => void;

  constructor(
    ngZone: NgZone,
    @Optional()
    @Inject(LAYOUT_SCREEN_SIZE_THRESHOLD)
    public layoutScreenSizeThreshold: number
  ) {
    // if no value is injected the default size wil be used. same as $layout-screen-size-threshold in scss
    if (!this.layoutScreenSizeThreshold) {
      this.layoutScreenSizeThreshold = 1024;
    }

    // do not try to access the window object if rendered on the server
    if (typeof window === "object" && "matchMedia" in window) {
      const query: MediaQueryList = window.matchMedia(
        `(max-width: ${this.layoutScreenSizeThreshold}px)`
      );

      const queryListener = () => {
        ngZone.run(() => {
          this.sizesSubject.next(query.matches);
        });
      };
      // - addEventListener not working in Safari
      // eslint-disable-next-line
      query.addListener(queryListener);
      this.windowMediaQueryListener = () => {
        // eslint-disable-next-line
        query.removeListener(queryListener);
      };
      // set the initial state
      this.sizesSubject.next(query.matches);
    }
  }

  public isSmallScreen(): boolean {
    return this.sizesSubject.value;
  }

  public sizes(): Observable<boolean> {
    return this.sizesSubject.asObservable();
  }

  destroy(): void {
    if (this.windowMediaQueryListener) {
      this.windowMediaQueryListener();
      this.windowMediaQueryListener = null;
    }
  }
}

@Component({
  selector: "mdl-layout",
  template: `
    <div
      class="mdl-layout__container"
      [ngClass]="{ 'has-scrolling-header': mode === 'scroll' }"
    >
      <div
        class="mdl-layout is-upgraded"
        [ngClass]="{
          'is-small-screen': isSmallScreen,
          'mdl-layout--fixed-drawer': isFixedDrawer,
          'mdl-layout--fixed-header': isFixedHeader,
          'mdl-layout--fixed-tabs': 'tabs.toArray().length > 0'
        }"
      >
        <ng-content select="mdl-layout-header"></ng-content>
        <ng-content select="mdl-layout-drawer"></ng-content>
        <div
          *ngIf="drawers.length > 0 && isNoDrawer === false"
          class="mdl-layout__drawer-button"
          (click)="toggleDrawer()"
        >
          <mdl-icon>&#xE5D2;</mdl-icon>
        </div>
        <ng-content select="mdl-layout-content"></ng-content>
        <div
          class="mdl-layout__obfuscator"
          [ngClass]="{ 'is-visible': isDrawerVisible }"
          (click)="toggleDrawer()"
          (keydown)="obfuscatorKeyDown($event)"
        ></div>
      </div>
    </div>
  `,
  exportAs: "mdlLayout",
  encapsulation: ViewEncapsulation.None,
})
export class MdlLayoutComponent
  implements AfterContentInit, OnDestroy, OnChanges {
  @ContentChild(MdlLayoutHeaderComponent)
  header;
  // will be set to undefined, if not a direct child or not present in 2.0.0 i
  // n 2.0.1 it is now the grand child drawer again :(
  @ContentChildren(MdlLayoutDrawerComponent, { descendants: false })
  drawers: QueryList<MdlLayoutDrawerComponent>;
  @ContentChild(MdlLayoutContentComponent, { static: true })
  content;

  // eslint-disable-next-line
  @Input("mdl-layout-mode")
  mode: string = STANDARD;
  // eslint-disable-next-line
  @Output("mdl-layout-tab-active-changed")
  selectedTabEmitter = new EventEmitter();
  // eslint-disable-next-line
  @Output("mdl-layout-tab-mouseover")
  mouseoverTabEmitter = new EventEmitter();
  // eslint-disable-next-line
  @Output("mdl-layout-tab-mouseout")
  mouseoutTabEmitter = new EventEmitter();
  // eslint-disable-next-line
  @Output("open")
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onOpen = new EventEmitter<void>();
  // eslint-disable-next-line
  @Output("close")
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onClose = new EventEmitter<void>();
  isDrawerVisible = false;
  isSmallScreen = false;
  private scrollListener: (
    target?: "window" | "document" | "body" | unknown,
    eventName?: string,
    callback?: (event: Event) => boolean | void
  ) => void;
  private isFixedDrawerIntern = false;
  private isFixedHeaderIntern = false;
  private isSeamedIntern = false;
  private selectedIndexIntern = 0;
  private isNoDrawerIntern = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private renderer: Renderer2,
    private evm: EventManager,
    private el: ElementRef,
    private screenSizeService: MdlScreenSizeService,
    private layoutMediatorService: MdlLayoutMediatorService
  ) {}

  @Input("mdl-layout-fixed-drawer")
  get isFixedDrawer(): boolean {
    return this.isFixedDrawerIntern;
  }

  set isFixedDrawer(value: boolean) {
    this.isFixedDrawerIntern = toBoolean(value);
  }

  @Input("mdl-layout-fixed-header")
  get isFixedHeader(): boolean {
    return this.isFixedHeaderIntern;
  }

  set isFixedHeader(value: boolean) {
    this.isFixedHeaderIntern = toBoolean(value);
  }

  @Input("mdl-layout-header-seamed")
  get isSeamed(): boolean {
    return this.isSeamedIntern;
  }

  set isSeamed(value: boolean) {
    this.isSeamedIntern = toBoolean(value);
  }

  @Input("mdl-layout-tab-active-index")
  get selectedIndex(): number {
    return this.selectedIndexIntern;
  }

  set selectedIndex(value: number) {
    this.selectedIndexIntern = toNumber(value);
  }

  @Input("mdl-layout-no-drawer-button")
  get isNoDrawer(): boolean {
    return this.isNoDrawerIntern;
  }

  set isNoDrawer(value: boolean) {
    this.isNoDrawerIntern = toBoolean(value);
  }

  ngAfterContentInit(): void {
    this.validateMode();

    if (this.header && this.content && this.content.tabs) {
      this.header.tabs = this.content.tabs;
      this.updateSelectedTabIndex();
    }

    if (this.header && this.header.tabs) {
      this.subscriptions.push(
        this.layoutMediatorService
          .onTabMouseOut()
          .subscribe((tab: MdlLayoutTabPanelComponent) => {
            this.onTabMouseout(tab);
          })
      );

      this.subscriptions.push(
        this.layoutMediatorService
          .onTabMouseover()
          .subscribe((tab: MdlLayoutTabPanelComponent) => {
            this.onTabMouseover(tab);
          })
      );

      this.subscriptions.push(
        this.layoutMediatorService
          .onTabSelected()
          .subscribe((tab: MdlLayoutTabPanelComponent) => {
            this.tabSelected(tab);
          })
      );
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedIndex) {
      this.updateSelectedTabIndex();
    }
  }

  toggleDrawer(): void {
    this.isDrawerVisible = !this.isDrawerVisible;
    if (this.drawers.length > 0) {
      this.setDrawerVisible(this.isDrawerVisible);
    }
  }

  closeDrawer(): void {
    this.isDrawerVisible = false;
    if (this.drawers.length > 0) {
      this.setDrawerVisible(false);
    }
  }

  openDrawer(): void {
    this.isDrawerVisible = true;
    if (this.drawers.length > 0) {
      this.setDrawerVisible(true);
    }
  }

  obfuscatorKeyDown($event: KeyboardEvent): void {
    if ($event.keyCode === ESCAPE) {
      this.toggleDrawer();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = null;
    }
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  closeDrawerOnSmallScreens(): void {
    if (this.isSmallScreen && this.isDrawerVisible) {
      this.closeDrawer();
    }
  }

  openDrawerOnSmallScreens(): void {
    if (this.isSmallScreen && !this.isDrawerVisible) {
      this.openDrawer();
    }
  }

  hasDrawer(): boolean {
    return this.drawers.length > 0;
  }

  private tabSelected(tab: MdlLayoutTabPanelComponent) {
    const index = this.header.tabs.toArray().indexOf(tab);
    if (index !== this.selectedIndex) {
      this.selectedIndex = index;
      this.updateSelectedTabIndex();
      this.selectedTabEmitter.emit({ index: this.selectedIndex });
    }
  }

  private onTabMouseover(tab: MdlLayoutTabPanelComponent) {
    const index = this.header.tabs.toArray().indexOf(tab);
    this.mouseoverTabEmitter.emit({ index });
  }

  private onTabMouseout(tab: MdlLayoutTabPanelComponent) {
    const index = this.header.tabs.toArray().indexOf(tab);
    this.mouseoutTabEmitter.emit({ index });
  }

  private updateSelectedTabIndex() {
    if (this.header && this.header.tabs) {
      this.header.tabs.forEach((tab) => (tab.isActive = false));
      if (
        this.header.tabs.toArray().length > 0 &&
        this.selectedIndex < this.header.tabs.toArray().length
      ) {
        this.header.tabs.toArray()[this.selectedIndex].isActive = true;
      }
    }
  }

  private validateMode() {
    if (this.mode === "") {
      this.mode = STANDARD;
    }
    if ([STANDARD, WATERFALL, SCROLL].indexOf(this.mode) === -1) {
      throw new MdLUnsupportedLayoutTypeError(this.mode);
    }

    if (this.header) {
      // inform the header about the mode
      this.header.mode = this.mode;
      this.header.isSeamed = this.isSeamed;
    }

    if (this.content) {
      this.scrollListener = this.renderer.listen(
        this.content.el,
        "scroll",
        () => {
          this.onScroll(this.content.el.scrollTop);
          return true;
        }
      );

      this.screenSizeService.sizes().subscribe((isSmall: boolean) => {
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

    const headerVisible = !this.isSmallScreen || this.isFixedHeader;
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

  private setDrawerVisible(visible: boolean) {
    this.drawers.first.isDrawerVisible = visible;
    if (this.drawers.first.isDrawerVisible) {
      this.onOpen.emit();
    } else {
      this.onClose.emit();
    }
  }
}
