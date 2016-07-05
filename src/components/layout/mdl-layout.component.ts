import {
  Component,
  ContentChild
} from '@angular/core';
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


@Component({
  selector: 'mdl-layout',
  host: {
  },
  template:
    `
      <div class="mdl-layout__container">
         <div class="mdl-layout">
            <ng-content></ng-content>
         </div>
      </div>
   `
})
export class MdlLayoutComponent {

  @ContentChild(MdlLayoutHeaderComponent) header;
  @ContentChild(MdlLayoutDrawerComponent) drawer;
  @ContentChild(MdlLayoutContentComponent) content;
  
}
