import { MdlTabsComponent } from "./mdl-tabs.component";
import {
  MdlTabPanelComponent,
  MdlTabPanelContentComponent,
} from "./mdl-tab-panel.component";
import { MdlTabPanelTitleComponent } from "./mdl-tab-panel-title.component";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { MdlCommonsModule } from "../common/mdl-common.module";
import { MdlRippleModule } from "../ripple/mdl-ripple.module";

export * from "./mdl-tabs.component";
export * from "./mdl-tab-panel.component";
export * from "./mdl-tab-panel-title.component";

const MDL_TABS_DIRECTIVES = [
  MdlTabsComponent,
  MdlTabPanelComponent,
  MdlTabPanelTitleComponent,
  MdlTabPanelContentComponent,
];

@NgModule({
  imports: [MdlCommonsModule, MdlRippleModule, CommonModule, MdlRippleModule],
  exports: MDL_TABS_DIRECTIVES,
  declarations: [...MDL_TABS_DIRECTIVES],
})
export class MdlTabsModule {
  public static forRoot(): ModuleWithProviders<MdlTabsModule> {
    return {
      ngModule: MdlTabsModule,
      providers: [],
    };
  }
}
