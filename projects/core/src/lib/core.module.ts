import {ModuleWithProviders, NgModule} from '@angular/core';
import {MdlCommonsModule} from './common/mdl-common.module';
import {MdlLayoutModule} from './layout/mdl-layout.module';
import {MdlIconModule} from './icon/mdl-icon.module';
import {MdlBadgeModule} from './badge/mdl-badge.module';
import {MdlButtonModule} from './button/mdl-button.module';
import {MdlCardModule} from './card/mdl-card.module';
import {MdlCheckboxModule} from './checkbox/mdl-checkbox.module';
import {MdlChipModule} from './chips/mdl-chip.module';
import {MdlDialogModule} from './dialog/mdl-dialog.module';
import {MdlDialogOutletModule} from './dialog-outlet/mdl-dialog-outlet.module';
import {MdlIconToggleModule} from './icon-toggle/mdl-icon-toggle.module';
import {MdlListModule} from './list/mdl-list.module';
import {MdlMenuModule} from './menu/mdl-menu.module';
import {MdlProgressModule} from './progress/mdl-progress.module';
import {MdlRadioModule} from './radio/mdl-radio.module';
import {MdlShadowModule} from './shadow/mdl-shadow.module';
import {MdlSliderModule} from './slider/mdl-slider.module';
import {MdlSnackbarModule} from './snackbar/mdl-snackbar.module';
import {MdlSpinnerModule} from './spinner/mdl-spinner.module';
import {MdlSwitchModule} from './switch/mdl-switch.module';
import {MdlTableModule} from './table/mdl-table.module';
import {MdlTabsModule} from './tabs/mdl-tabs.module';
import {MdlTextFieldModule} from './textfield/mdl-textfield.module';
import {MdlTooltipModule} from './tooltip/mdl-tooltip.module';
import {MdlRippleModule} from './ripple/mdl-ripple.module';

const MODULES = [
  MdlBadgeModule,
  MdlButtonModule,
  MdlCardModule,
  MdlCheckboxModule,
  MdlChipModule,
  MdlCommonsModule,
  MdlDialogModule,
  MdlDialogOutletModule,
  MdlIconModule,
  MdlIconToggleModule,
  MdlLayoutModule,
  MdlListModule,
  MdlMenuModule,
  MdlProgressModule,
  MdlRadioModule,
  MdlRippleModule,
  MdlShadowModule,
  MdlSliderModule,
  MdlSnackbarModule,
  MdlSpinnerModule,
  MdlSwitchModule,
  MdlTableModule,
  MdlTabsModule,
  MdlTextFieldModule,
  MdlTooltipModule
];

@NgModule({
  declarations: [],
  imports: [
    MdlButtonModule.forRoot(),
    MdlLayoutModule.forRoot(),
    MdlCheckboxModule.forRoot(),
    MdlChipModule.forRoot(),
    MdlDialogModule.forRoot(),
    MdlDialogOutletModule.forRoot(),
    MdlSpinnerModule.forRoot(),
    MdlBadgeModule.forRoot(),
    MdlShadowModule.forRoot(),
    MdlCardModule.forRoot(),
    MdlRadioModule.forRoot(),
    MdlRippleModule.forRoot(),
    MdlProgressModule.forRoot(),
    MdlIconModule.forRoot(),
    MdlIconToggleModule.forRoot(),
    MdlListModule.forRoot(),
    MdlSliderModule.forRoot(),
    MdlSwitchModule.forRoot(),
    MdlSnackbarModule.forRoot(),
    MdlTooltipModule.forRoot(),
    MdlTableModule.forRoot(),
    MdlMenuModule.forRoot(),
    MdlTabsModule.forRoot(),
    MdlTextFieldModule.forRoot()
  ],
  exports: [
    ...MODULES
  ]
})
export class MdlModule {
}

@NgModule({
  imports: MODULES,
  exports: MODULES
})
// @deprectaed use MdlModule - all services are provided in root by default.
export class MdlNonRootModule {
  static forRoot(): ModuleWithProviders<MdlModule> {
    return {ngModule: MdlModule};
  }
}
