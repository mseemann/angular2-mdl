import {
  Component,
  ContentChild,
  ViewChild,
  AfterViewInit,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';
import { MdlError } from './../common/mdl-error';
import { MdlLayoutHeaderComponent } from './mdl-layout-header.component';
import { MdlLayoutDrawerComponent } from './mdl-layout-drawer.component';
import { MdlLayoutContentComponent } from './mdl-layout-content.component';

const CONTAINER = 'mdl-layout__container';
const HEADER = 'mdl-layout__header';
const DRAWER = 'mdl-layout__drawer';
const CONTENT = 'mdl-layout__content';
const DRAWER_BTN = 'mdl-layout__drawer-button';

const ICON = 'material-icons';

const JS_RIPPLE_EFFECT = 'mdl-js-ripple-effect';
const RIPPLE_CONTAINER = 'mdl-layout__tab-ripple-container';
const RIPPLE = 'mdl-ripple';
const RIPPLE_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';

const HEADER_SEAMED = 'mdl-layout__header--seamed';
const HEADER_WATERFALL = 'mdl-layout__header--waterfall';
const HEADER_SCROLL = 'mdl-layout__header--scroll';

const FIXED_HEADER = 'mdl-layout--fixed-header';
const OBFUSCATOR = 'mdl-layout__obfuscator';

const TAB_BAR = 'mdl-layout__tab-bar';
const TAB_CONTAINER = 'mdl-layout__tab-bar-container';
const TAB = 'mdl-layout__tab';
const TAB_BAR_BUTTON = 'mdl-layout__tab-bar-button';
const TAB_BAR_LEFT_BUTTON = 'mdl-layout__tab-bar-left-button';
const TAB_BAR_RIGHT_BUTTON = 'mdl-layout__tab-bar-right-button';
const PANEL = 'mdl-layout__tab-panel';

const HAS_DRAWER = 'has-drawer';
const HAS_TABS = 'has-tabs';
const HAS_SCROLLING_HEADER = 'has-scrolling-header';
const CASTING_SHADOW = 'is-casting-shadow';
const IS_COMPACT = 'is-compact';
const IS_SMALL_SCREEN = 'is-small-screen';
const IS_DRAWER_OPEN = 'is-visible';
const IS_ACTIVE = 'is-active';
const IS_UPGRADED = 'is-upgraded';
const IS_ANIMATING = 'is-animating';

const ON_LARGE_SCREEN = 'mdl-layout--large-screen-only';
const ON_SMALL_SCREEN = 'mdl-layout--small-screen-only';

const ENTER =  13;
const ESCAPE = 27;
const SPACE = 32;

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
  selector: 'mdl-layout',
  host: {
  },
  template:
    `
      <div class="mdl-layout__container">
         <div class="mdl-layout">
            <ng-content></ng-content>
            <div #obfuscator class="mdl-layout__obfuscator" 
                  [ngClass]="{'is-visible':isDrawerVisible}" 
                  (click)="toggleDrawer()"
                  (keydown)="obfuscatorKeyDown($event)"></div>
         </div>
      </div>
   `
})
export class MdlLayoutComponent implements AfterViewInit{

  @ContentChild(MdlLayoutHeaderComponent) header;
  @ContentChild(MdlLayoutDrawerComponent) drawer;
  @ContentChild(MdlLayoutContentComponent) content;
  @ViewChild('obfuscator') obfuscator:ElementRef;

  @Input('mdl-layout-mode') private mode: string = STANDARD;

  private isDrawerVisible = false;

  ngAfterViewInit(){
    if(this.mode === ''){
      this.mode = STANDARD;
    }
    if ([STANDARD, SEAMED , WATERFALL, SCROLL].indexOf(this.mode) === -1){
      throw new MdLUnsupportedLayoutTypeError(this.mode);
    }
  }

  toggleDrawer(){
    this.isDrawerVisible = !this.isDrawerVisible;
  }

  obfuscatorKeyDown($event){
    if ($event.keyCode === ESCAPE && this.isDrawerVisible) {
      this.toggleDrawer();
    }
  }
}
