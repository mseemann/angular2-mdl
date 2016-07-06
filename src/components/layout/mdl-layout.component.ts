import {
  Component,
  ContentChild,
  AfterContentInit,
  OnDestroy,
  Input,
  Renderer,
  ViewEncapsulation
} from '@angular/core';
import { MdlError } from './../common/mdl-error';
import { BooleanProperty } from './../common/boolean-property';
import { MdlIconComponent } from './../icon/mdl-icon.component';
import { MdlLayoutHeaderComponent } from './mdl-layout-header.component';
import { MdlLayoutDrawerComponent } from './mdl-layout-drawer.component';
import { MdlLayoutContentComponent } from './mdl-layout-content.component';

const ESCAPE = 27;

const STANDARD = 'standard';
const SEAMED = 'seamed';
const WATERFALL = 'waterfall';
const SCROLL = 'scroll';

export class MdLUnsupportedLayoutTypeError extends MdlError {
  constructor(type: string) {
    super(`Layout type "${type}" isn't supported by mdl-layout (allowed: standard, seamed, waterfall, scroll).`);
  }
}


@Component({
  moduleId: module.id,
  selector: 'mdl-layout',
  templateUrl: 'mdl-layout.html',
  exportAs: 'mdlLayout',
  directives: [MdlIconComponent],
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutComponent implements AfterContentInit, OnDestroy {

  @ContentChild(MdlLayoutHeaderComponent) private header;
  @ContentChild(MdlLayoutDrawerComponent) private drawer;
  @ContentChild(MdlLayoutContentComponent) private content;

  @Input('mdl-layout-mode') public mode: string = STANDARD;
  @Input('mdl-layout-fixed-drawer') @BooleanProperty() public isFixedDrawer = false;

  private isDrawerVisible = false;
  private isSmallScreen = false;

  private scrollListener: Function;
  private windowMediaQueryListener: Function;

  constructor(private renderer: Renderer) {
  }

  public ngAfterContentInit() {
    this.validateMode();
  }

  private validateMode() {
    if (this.mode === '') {
      this.mode = STANDARD;
    }
    if ([STANDARD, SEAMED , WATERFALL, SCROLL].indexOf(this.mode) === -1) {
      throw new MdLUnsupportedLayoutTypeError(this.mode);
    }

    if (this.header) {
      // inform the header about the mode
      this.header.mode = this.mode;
    }

    if (this.content) {
      this.scrollListener = this.renderer.listen(this.content.el, 'scroll', (event) => {
        if (this.mode !== SCROLL) {
          return;
        }
        // TODO
        // if (this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)) {
        //   return;
        // }
        //
        // var headerVisible =
        //   !this.element_.classList.contains(this.CssClasses_.IS_SMALL_SCREEN) ||
        //   this.element_.classList.contains(this.CssClasses_.FIXED_HEADER);
        //
        // if (this.content_.scrollTop > 0 &&
        //   !this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
        //   this.header_.classList.add(this.CssClasses_.CASTING_SHADOW);
        //   this.header_.classList.add(this.CssClasses_.IS_COMPACT);
        //   if (headerVisible) {
        //     this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
        //   }
        // } else if (this.content_.scrollTop <= 0 &&
        //   this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
        //   this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW);
        //   this.header_.classList.remove(this.CssClasses_.IS_COMPACT);
        //   if (headerVisible) {
        //     this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
        //   }
        // }
      });
      let query: MediaQueryList = window.matchMedia('(max-width: 1024px)');

      let queryListener = () => {
        this.onQueryChange(query.matches);
      };
      query.addListener(queryListener);
      this.windowMediaQueryListener = function() {
        query.removeListener(queryListener);
      };
      // set the initial state
      queryListener();
    }

    if (this.drawer) {

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

  // tslint:disable-next-line - method is access from template
  private obfuscatorKeyDown($event){
    if ($event.keyCode === ESCAPE && this.isDrawerVisible) {
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
}
