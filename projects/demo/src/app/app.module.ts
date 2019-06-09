import {BrowserModule, Title} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MdlModule} from '@angular-mdl/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PrismDirective} from './prism';
import {take} from 'rxjs/operators';
import {ButtonDemo} from './button/button.component';
import {BadgeDemo} from './badge/badge.component';
import {CardDemo} from './card/card.component';
import {ChipsDemo} from './chips/chips.component';
import {DialogDemo} from './dialog/dialog.component';
import {DialogDeclarativeDemo} from './dialog-declarative/dialog-declarative.component';
import {IconDemo} from './icon/icon.component';
import {ShadowDemo} from './shadow/shadow.component';
import {LoadingDemo} from './loading/loading.component';
import {ListDemo} from './list/list.component';
import {Layout0Demo, Layout1Demo, Layout2Demo, Layout3Demo, LayoutDemo} from './layout/layout.component';
import {MenuDemo} from './menus/menu.component';
import {ToggleDemo} from './toggle/toggle.component';
import {TooltipDemo} from './tooltip/tooltip.component';
import {SliderDemo} from './slider/slider.component';
import {SnackbarDemo} from './snackbar/snackbar.component';
import {TableDemo} from './tables/table.component';
import {TabsDemo} from './tabs/tabs.component';
import {TextFieldDemo} from './textfield/textfield.component';
import {ThemeDemo} from './theme/theme.component';
import {ReactiveFormsDemo} from './reactiveforms/reactiveform.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginModule} from './dialog/login.module';


export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'theme', component: ThemeDemo, data: {title: 'Themes'}},
  {path: 'badge', component: BadgeDemo, data: {title: 'Badges'}},
  {path: 'button', component: ButtonDemo, data: {title: 'Buttons'}},
  {path: 'card', component: CardDemo, data: {title: 'Cards'}},
  {path: 'chips', component: ChipsDemo, data: {title: 'Chips'}},
  {path: 'dialogs', component: DialogDemo, data: {title: 'Dialog (imperative)'}},
  {path: 'dialogs-declarative', component: DialogDeclarativeDemo, data: {title: 'Dialog (declarative)'}},
  {path: 'icon', component: IconDemo, data: {title: 'Icons'}},
  {
    path: 'layout', component: LayoutDemo, data: {title: 'Layouts'},
    children: [
      {path: '', component: Layout0Demo},
      {path: 'l1', component: Layout1Demo},
      {path: 'l2', component: Layout2Demo},
      {path: 'l3', component: Layout3Demo}
    ]
  },
  {path: 'loading', component: LoadingDemo, data: {title: 'Loading'}},
  {path: 'list', component: ListDemo, data: {title: 'Lists'}},
  {path: 'menu', component: MenuDemo, data: {title: 'Menus'}},
  {path: 'reactiveForms', component: ReactiveFormsDemo, data: {title: 'Ractive Forms'}},
  {path: 'shadow', component: ShadowDemo, data: {title: 'Shadows'}},
  {path: 'slider', component: SliderDemo, data: {title: 'Sliders'}},
  {path: 'snackbar', component: SnackbarDemo, data: {title: 'Snachbar'}},
  {path: 'table', component: TableDemo, data: {title: 'Tables'}},
  {path: 'tabs', component: TabsDemo, data: {title: 'Tabs'}},
  {path: 'textfield', component: TextFieldDemo, data: {title: 'Textfields'}},
  {path: 'toggle', component: ToggleDemo, data: {title: 'Toggles'}},
  {path: 'tooltip', component: TooltipDemo, data: {title: 'Tooltips'}},
  {path: '**', redirectTo: ''},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrismDirective,
    ButtonDemo,
    BadgeDemo,
    CardDemo,
    ChipsDemo,
    DialogDemo,
    DialogDeclarativeDemo,
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
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdlModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    FormsModule,
    ReactiveFormsModule,
    LoginModule
  ],
  providers: [
    Title
  ],
  entryComponents: [AppComponent],
  bootstrap: []
})
export class AppModule implements DoBootstrap {

  constructor() {
  }

  public ngDoBootstrap(appRef: ApplicationRef) {
    appRef.isStable.pipe(take(1)).subscribe(() => {
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = 'https://buttons.github.io/buttons.js';
      let anyScriptTag = document.getElementsByTagName('script')[0];
      anyScriptTag.parentNode.insertBefore(script, anyScriptTag);
    });
    appRef.bootstrap(AppComponent);
  }
}
