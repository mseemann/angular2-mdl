import {ModuleWithProviders, NgModule} from '@angular/core';
import {MdlLayoutComponent, MdlScreenSizeService} from './mdl-layout.component';
import {MdlLayoutHeaderComponent} from './mdl-layout-header.component';
import {MdlLayoutDrawerComponent} from './mdl-layout-drawer.component';
import {MdlLayoutContentComponent} from './mdl-layout-content.component';
import {MdlLayoutHeaderTransparentDirective} from './mdl-layout-header-transparent.directive';
import {MdlLayoutHeaderRowComponent} from './mdl-layout-header-row.component';
import {MdlLayoutTitleComponent} from './mdl-layout-title.component';
import {MdlLayoutSpacerComponent} from './mdl-layout-spacer.component';
import {MdlLayoutTabPanelComponent} from './mdl-layout-tab-panel.component';

import {CommonModule} from '@angular/common';
import {MdlIconModule} from '../icon/mdl-icon.module';
import {MdlCommonsModule} from '../common/mdl-common.module';
import {MdlTabsModule} from '../tabs/mdl-tabs.module';
import {MdlRippleModule} from '../ripple/mdl-ripple.module';


const MDL_LAYOUT_DIRECTIVES = [
  MdlLayoutComponent,
  MdlLayoutHeaderComponent,
  MdlLayoutDrawerComponent,
  MdlLayoutContentComponent,
  MdlLayoutHeaderTransparentDirective,
  MdlLayoutHeaderRowComponent,
  MdlLayoutTitleComponent,
  MdlLayoutSpacerComponent,
  MdlLayoutTabPanelComponent
];

export * from './mdl-layout.component';
export * from './mdl-layout-header.component';
export * from './mdl-layout-drawer.component';
export * from './mdl-layout-content.component';
export * from './mdl-layout-header-transparent.directive';
export * from './mdl-layout-header-row.component';
export * from './mdl-layout-title.component';
export * from './mdl-layout-spacer.component';
export * from './mdl-layout-tab-panel.component';

@NgModule({
  imports: [MdlIconModule, MdlCommonsModule, MdlRippleModule, MdlTabsModule, CommonModule],
  exports: MDL_LAYOUT_DIRECTIVES,
  declarations: MDL_LAYOUT_DIRECTIVES,
})
export class MdlLayoutModule {
  public static forRoot(): ModuleWithProviders<MdlLayoutModule> {
    return {
      ngModule: MdlLayoutModule,
      providers: [
        MdlScreenSizeService
      ]
    };
  }
}
