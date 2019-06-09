import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import {
  ActivatedRoute,
  Router, Routes
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { flyInOutTrigger } from './animations/flyInOutTrigger-animation';
import { hostConfig } from './animations/flyInOutTrigger-animation';

import { ButtonDemo } from './button/button.component';
import { BadgeDemo } from './badge/badge.component';
import { CardDemo } from './card/card.component';
import { ChipsDemo } from './chips/chips.component';
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
import { MdlLayoutComponent } from '../../lib/components';
import { ReactiveFormsDemo } from './reactiveforms/reactiveform.component';
import { AbstractDemoComponent } from './abstract-demo.component';
import { ThemeDemo } from './theme/theme.component';
import { DialogDemo } from './dialog/dialog.component';
import { DialogDeclarativeDemo } from './dialog-declarative/dialog-declarative.component';

@Component({
  selector: 'home',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'home.html'
})
export class Home extends AbstractDemoComponent {
  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'theme', component: ThemeDemo, data: {title: 'Themes'} },
  { path: 'badge', component: BadgeDemo, data: {title: 'Badges'} },
  { path: 'button', component: ButtonDemo, data: {title: 'Buttons'} },
  { path: 'card', component: CardDemo, data: {title: 'Cards'} },
  { path: 'chips', component: ChipsDemo, data: {title: 'Chips'} },
  { path: 'dialogs', component: DialogDemo, data: {title: 'Dialog (imperative)'} },
  { path: 'dialogs-declarative', component: DialogDeclarativeDemo, data: {title: 'Dialog (declarative)'} },
  { path: 'icon', component: IconDemo, data: {title: 'Icons'} },
  { path: 'layout', component: LayoutDemo, data: {title: 'Layouts'},
    children: [
      { path: '', component: Layout0Demo },
      { path: 'l1', component: Layout1Demo },
      { path: 'l2', component: Layout2Demo },
      { path: 'l3', component: Layout3Demo }
    ]
  },
  { path: 'loading', component: LoadingDemo, data: {title: 'Loading'} },
  { path: 'list', component: ListDemo, data: {title: 'Lists'} },
  { path: 'menu', component: MenuDemo, data: {title: 'Menus'} },
  { path: 'reactiveForms', component: ReactiveFormsDemo, data: {title: 'Ractive Forms'} },
  { path: 'shadow', component: ShadowDemo, data: {title: 'Shadows'} },
  { path: 'slider', component: SliderDemo, data: {title: 'Sliders'} },
  { path: 'snackbar', component: SnackbarDemo, data: {title: 'Snachbar'} },
  { path: 'table', component: TableDemo, data: {title: 'Tables'} },
  { path: 'tabs', component: TabsDemo, data: {title: 'Tabs'} },
  { path: 'textfield', component: TextFieldDemo, data: {title: 'Textfields'} },
  { path: 'toggle', component: ToggleDemo, data: {title: 'Toggles'} },
  { path: 'tooltip', component: TooltipDemo, data: {title: 'Tooltips'} },
  { path: '**', redirectTo: '' },
];

@Component({
  selector: 'root-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2MdlAppComponent {

  public title = 'Angular - Material Design Lite';

  public componentSelected(mainLayout: MdlLayoutComponent) {
    mainLayout.closeDrawerOnSmallScreens();
  }
}

