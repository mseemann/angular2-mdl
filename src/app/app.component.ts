import {
  Component,
  ViewEncapsulation } from '@angular/core';
import {
  RouterConfig
} from '@angular/router';

import { ButtonDemo } from './button/button.component';
import { BadgeDemo } from './badge/badge.component';
import { CardDemo } from './card/card.component';
import { IconDemo } from './icon/icon.component';
import { ShadowDemo } from './shadow/shadow.component';
import { LoadingDemo } from './loading/loading.component';
import { ListDemo } from './list/list.component';
import {
  LayoutDemo,
  Layout0Demo,
  Layout1Demo,
  Layout2Demo,
  Layout3Demo
} from './layout/layout.component';
import { MenuDemo } from './menus/menu.component';
import { ToggleDemo } from './toggle/toggle.component';
import { TooltipDemo } from './tooltip/tooltip.component';
import { SliderDemo } from './slider/slider.component';
import { SnackbarDemo } from './snackbar/snackbar.component';
import { TableDemo } from './tables/table.component';
import { TabsDemo } from './tabs/tabs.component';
import { TextFieldDemo } from './textfield/textfield.component';
import { MdlLayoutComponent } from '../components';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {
}

export const appRoutes: RouterConfig = [
  { path: '', component: Home },
  { path: 'badge', component: BadgeDemo },
  { path: 'button', component: ButtonDemo },
  { path: 'card', component: CardDemo },
  { path: 'icon', component: IconDemo },
  { path: 'layout', component: LayoutDemo,
    children: [
      { path: '', component: Layout0Demo },
      { path: 'l1', component: Layout1Demo },
      { path: 'l2', component: Layout2Demo },
      { path: 'l3', component: Layout3Demo }
    ]
  },
  { path: 'loading', component: LoadingDemo },
  { path: 'list', component: ListDemo },
  { path: 'menu', component: MenuDemo },
  { path: 'shadow', component: ShadowDemo },
  { path: 'slider', component: SliderDemo },
  { path: 'snackbar', component: SnackbarDemo },
  { path: 'table', component: TableDemo },
  { path: 'tabs', component: TabsDemo },
  { path: 'textfield', component: TextFieldDemo },
  { path: 'toggle', component: ToggleDemo },
  { path: 'tooltip', component: TooltipDemo },
  { path: '**', redirectTo: '' },
];

@Component({
  moduleId: module.id,
  selector: 'root-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2MdlAppComponent {

  public title = 'Angular 2 - Material Design Lite';

  public componentSelected(mainLayout: MdlLayoutComponent) {
    mainLayout.closeDrawerOnSmallScreens();
  }
}

