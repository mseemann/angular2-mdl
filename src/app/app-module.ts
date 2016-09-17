import {
  NgModule,
  ApplicationRef, ApplicationInitStatus
} from '@angular/core';
import { BrowserModule,
  Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdlModule } from './../components/index';
import { RouterModule } from '@angular/router';
import { Angular2MdlAppComponent, Home, appRoutes } from './app.component';
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
import { PopoverDemo } from './popover/popover.component';
import { ToggleDemo } from './toggle/toggle.component';
import { TooltipDemo } from './tooltip/tooltip.component';
import { SliderDemo } from './slider/slider.component';
import { SnackbarDemo } from './snackbar/snackbar.component';
import { TableDemo } from './tables/table.component';
import { TabsDemo } from './tabs/tabs.component';
import { TextFieldDemo } from './textfield/textfield.component';
import { PrismDirective } from './prism/prism.component';
import { ReactiveFormsDemo } from './reactiveforms/reactiveform.component';
import { ThemeDemo } from './theme/theme.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    Angular2MdlAppComponent,
    Home,
    ButtonDemo,
    BadgeDemo,
    CardDemo,
    ChipsDemo,
    IconDemo,
    ShadowDemo,
    LoadingDemo,
    ListDemo,
    LayoutDemo,
    Layout0Demo,
    Layout1Demo,
    Layout2Demo,
    Layout3Demo,
    MenuDemo,
    PopoverDemo,
    ToggleDemo,
    TooltipDemo,
    SliderDemo,
    SnackbarDemo,
    TableDemo,
    TabsDemo,
    TextFieldDemo,
    ThemeDemo,
    PrismDirective,
    ReactiveFormsDemo
  ],
  providers: [
    Title
  ],
  entryComponents: [Angular2MdlAppComponent],
  bootstrap: [],
})
export class Angular2MdlAppModule {

  constructor(private appRef: ApplicationRef, private appStatus: ApplicationInitStatus) { }

  public ngDoBootstrap() {
    this.appStatus.donePromise.then( () => {
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = 'https://buttons.github.io/buttons.js';
      let anyScriptTag = document.getElementsByTagName('script')[0];
      anyScriptTag.parentNode.insertBefore(script, anyScriptTag);
    });
    this.appRef.bootstrap(Angular2MdlAppComponent);
  }
}
