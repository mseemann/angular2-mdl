import {ModuleWithProviders, NgModule} from '@angular/core';
import {
  MdlExpansionPanelBodyComponent,
  MdlExpansionPanelComponent,
  MdlExpansionPanelContentComponent,
  MdlExpansionPanelFooterComponent,
  MdlExpansionPanelGroupComponent,
  MdlExpansionPanelHeaderComponent,
  MdlExpansionPanelHeaderListContentComponent,
  MdlExpansionPanelHeaderSecondaryContentComponent
} from './expansion-panel.component';
import {CommonModule} from '@angular/common';


const MDL_EXPANSION_PANEL_DIRECTIVES = [
  MdlExpansionPanelGroupComponent,
  MdlExpansionPanelComponent,
  MdlExpansionPanelHeaderComponent,
  MdlExpansionPanelHeaderListContentComponent,
  MdlExpansionPanelHeaderSecondaryContentComponent,
  MdlExpansionPanelContentComponent,
  MdlExpansionPanelBodyComponent,
  MdlExpansionPanelFooterComponent
];

@NgModule({
  imports: [CommonModule],
  exports: MDL_EXPANSION_PANEL_DIRECTIVES,
  declarations: MDL_EXPANSION_PANEL_DIRECTIVES,
})
export class MdlExpansionPanelModule {
  static forRoot(): ModuleWithProviders<MdlExpansionPanelModule> {
    return {
      ngModule: MdlExpansionPanelModule,
      providers: []
    };
  }
}
