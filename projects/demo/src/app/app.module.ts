import { BrowserModule, Title } from "@angular/platform-browser";
import { ApplicationRef, DoBootstrap, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MdlModule } from "@angular-mdl/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PrismDirective } from "./prism";
import { take } from "rxjs/operators";
import { ButtonDemoComponent } from "./button/button.component";
import { BadgeDemoComponent } from "./badge/badge.component";
import { CardDemoComponent } from "./card/card.component";
import { ChipsDemoComponent } from "./chips/chips.component";
import { DialogDemoComponent } from "./dialog/dialog.component";
import { DialogDeclarativeDemoComponent } from "./dialog-declarative/dialog-declarative.component";
import { IconDemoComponent } from "./icon/icon.component";
import { ShadowDemoComponent } from "./shadow/shadow.component";
import { LoadingDemoComponent } from "./loading/loading.component";
import { ListDemoComponent } from "./list/list.component";
import {
  Layout0DemoComponent,
  Layout1DemoComponent,
  Layout2DemoComponent,
  Layout3DemoComponent,
  LayoutDemoComponent,
} from "./layout/layout.component";
import { MenuDemoComponent } from "./menus/menu.component";
import { ToggleDemoComponent } from "./toggle/toggle.component";
import { TooltipDemoComponent } from "./tooltip/tooltip.component";
import { SliderDemoComponent } from "./slider/slider.component";
import { SnackbarDemoComponent } from "./snackbar/snackbar.component";
import { TableDemoComponent } from "./tables/table.component";
import { TabsDemoComponent } from "./tabs/tabs.component";
import { TextFieldDemoComponent } from "./textfield/textfield.component";
import { ThemeDemoComponent } from "./theme/theme.component";
import { ReactiveFormsDemoComponent } from "./reactiveforms/reactiveform.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginModule } from "./dialog/login.module";
import { DatePickerComponent } from "./date-picker/date-picker.component";
import { MdlDatePickerModule } from "@angular-mdl/datepicker";
import { PopoverComponent } from "./popover/popover.component";
import { MdlPopoverModule } from "@angular-mdl/popover";
import { SelectComponent } from "./select/select.component";
import { MdlSelectModule } from "@angular-mdl/select";
import { MatchSorterPipe } from "./select/matchSorter.pipe";
import { ExpansionPanelComponent } from "./expansion-panel/expansion-panel.component";
import { MdlExpansionPanelModule } from "@angular-mdl/expansion-panel";
import { FabMenuComponent } from "./fab-menu/fab-menu.component";
import { MdlFabMenuModule } from "@angular-mdl/fab-menu";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "theme", component: ThemeDemoComponent, data: { title: "Themes" } },
  { path: "badge", component: BadgeDemoComponent, data: { title: "Badges" } },
  {
    path: "button",
    component: ButtonDemoComponent,
    data: { title: "Buttons" },
  },
  { path: "card", component: CardDemoComponent, data: { title: "Cards" } },
  { path: "chips", component: ChipsDemoComponent, data: { title: "Chips" } },
  {
    path: "dialogs",
    component: DialogDemoComponent,
    data: { title: "Dialog (imperative)" },
  },
  {
    path: "dialogs-declarative",
    component: DialogDeclarativeDemoComponent,
    data: { title: "Dialog (declarative)" },
  },
  { path: "icon", component: IconDemoComponent, data: { title: "Icons" } },
  {
    path: "layout",
    component: LayoutDemoComponent,
    data: { title: "Layouts" },
    children: [
      { path: "", component: Layout0DemoComponent },
      { path: "l1", component: Layout1DemoComponent },
      { path: "l2", component: Layout2DemoComponent },
      { path: "l3", component: Layout3DemoComponent },
    ],
  },
  {
    path: "loading",
    component: LoadingDemoComponent,
    data: { title: "Loading" },
  },
  { path: "list", component: ListDemoComponent, data: { title: "Lists" } },
  { path: "menu", component: MenuDemoComponent, data: { title: "Menus" } },
  {
    path: "reactiveForms",
    component: ReactiveFormsDemoComponent,
    data: { title: "Ractive Forms" },
  },
  {
    path: "shadow",
    component: ShadowDemoComponent,
    data: { title: "Shadows" },
  },
  {
    path: "slider",
    component: SliderDemoComponent,
    data: { title: "Sliders" },
  },
  {
    path: "snackbar",
    component: SnackbarDemoComponent,
    data: { title: "Snachbar" },
  },
  { path: "table", component: TableDemoComponent, data: { title: "Tables" } },
  { path: "tabs", component: TabsDemoComponent, data: { title: "Tabs" } },
  {
    path: "textfield",
    component: TextFieldDemoComponent,
    data: { title: "Textfields" },
  },
  {
    path: "toggle",
    component: ToggleDemoComponent,
    data: { title: "Toggles" },
  },
  {
    path: "tooltip",
    component: TooltipDemoComponent,
    data: { title: "Tooltips" },
  },
  {
    path: "date-picker",
    component: DatePickerComponent,
    data: { title: "DatePicker" },
  },
  {
    path: "expansion-panel",
    component: ExpansionPanelComponent,
    data: { title: "Expansion-Panel" },
  },
  {
    path: "fab-menu",
    component: FabMenuComponent,
    data: { title: "FAB menu" },
  },
  { path: "popover", component: PopoverComponent, data: { title: "Popover" } },
  { path: "select", component: SelectComponent, data: { title: "Select" } },
  { path: "**", redirectTo: "" },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrismDirective,
    ButtonDemoComponent,
    BadgeDemoComponent,
    CardDemoComponent,
    ChipsDemoComponent,
    DialogDemoComponent,
    DialogDeclarativeDemoComponent,
    IconDemoComponent,
    ShadowDemoComponent,
    LoadingDemoComponent,
    ListDemoComponent,
    LayoutDemoComponent,
    Layout0DemoComponent,
    Layout1DemoComponent,
    Layout2DemoComponent,
    Layout3DemoComponent,
    MenuDemoComponent,
    ToggleDemoComponent,
    TooltipDemoComponent,
    SliderDemoComponent,
    SnackbarDemoComponent,
    TableDemoComponent,
    TabsDemoComponent,
    TextFieldDemoComponent,
    ThemeDemoComponent,
    PrismDirective,
    ReactiveFormsDemoComponent,
    DatePickerComponent,
    PopoverComponent,
    SelectComponent,
    MatchSorterPipe,
    ExpansionPanelComponent,
    FabMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdlModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    MdlDatePickerModule,
    MdlPopoverModule,
    MdlSelectModule,
    MdlExpansionPanelModule,
    MdlFabMenuModule,
  ],
  providers: [Title],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    appRef.isStable.pipe(take(1)).subscribe(() => {
      const script = document.createElement("script");
      script.innerHTML = "";
      script.src = "https://buttons.github.io/buttons.js";
      const anyScriptTag = document.getElementsByTagName("script")[0];
      anyScriptTag?.parentNode?.insertBefore(script, anyScriptTag);
    });
    appRef.bootstrap(AppComponent);
  }
}
