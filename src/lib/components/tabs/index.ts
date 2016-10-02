import { MdlTabsComponent } from './mdl-tabs.component';
import { MdlTabPanelComponent, MdlTabPanelContent } from './mdl-tab-panel.component';
import { MdlTabPanelTitleComponent } from './mdl-tab-panel-title.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { MdlRippleModule } from '../common/mdl-ripple.directive';
import { MdlCommonsModule } from '../common/index';
import { CommonModule } from '@angular/common';



export * from './mdl-tabs.component';
export * from './mdl-tab-panel.component';
export * from './mdl-tab-panel-title.component';


const MDL_TABS_DIRECTIVES = [
  MdlTabsComponent,
  MdlTabPanelComponent,
  MdlTabPanelTitleComponent,
  MdlTabPanelContent
];

@NgModule({
  imports: [MdlRippleModule, MdlCommonsModule, CommonModule],
  exports: MDL_TABS_DIRECTIVES,
  declarations: [...MDL_TABS_DIRECTIVES],
})
export class MdlTabsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlTabsModule,
      providers: []
    };
  }
}
