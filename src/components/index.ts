import { NgModule } from '@angular/core';
import { MdlRippleModule } from './common/mdl-ripple.directive';
import { MdlButtonModule } from './button/mdl-button.component';
import { MdlBadgeModule } from './badge/mdl-badge.directive';
import { MdlShadowModule } from './shadow/mdl-shadow.directive';
import { MdlCardModule } from './card/mdl-card.component';
import { MdlChipModule } from './chips/index';
import { MdlDialogModule } from './dialog/index';
import { MdlChekboxModule } from './checkbox/mdl-checkbox.component';
import { MdlRadioModule } from './radio/mdl-radio.component';
import { MdlProgressModule } from './progress/mdl-progress.component';
import { MdlIconModule } from './icon/mdl-icon.component';
import { MdlIconToggleModule } from './icon-toggle/mdl-icon-toggle.component';
import { MdlListModule } from './list/mdl-list.component';
import { MdlSpinnerModule } from './spinner/mdl-spinner.component';
import { MdlSliderModule }  from './slider/mdl-slider.component';
import { MdlSwitchModule } from './switch/mdl-switch.component';
import { MdlSnackbarService } from './snackbar/mdl-snackbar.service';
import { MdlTooltipModule } from './tooltip/index';
import { MdlTableModule } from './table/index';
import { MdlMenuModule } from './menu/index';
import { MdlLayoutModule } from './layout/index';
import { MdlTabsModule } from './tabs/index';
import { MdlTextFieldModule } from './textfield/mdl-textfield.component';

export * from './common/mdl-ripple.directive';
export * from './badge/mdl-badge.directive';
export * from './button/mdl-button.component';
export * from './card/mdl-card.component';
export * from './checkbox/mdl-checkbox.component';
export * from './chips/index';
export * from './dialog/index';
export * from './icon/mdl-icon.component';
export * from './list/mdl-list.component';
export * from './icon-toggle/mdl-icon-toggle.component';
export * from './progress/mdl-progress.component';
export * from './radio/mdl-radio.component';
export * from './shadow/mdl-shadow.directive';
export * from './spinner/mdl-spinner.component';
export * from './slider/mdl-slider.component';
export * from './snackbar/mdl-snackbar.service';
export * from './switch/mdl-switch.component';
export * from './table/index'
export * from './tooltip/index';
export * from './menu/index';
export * from './layout/index';
export * from './tabs/index';
export * from './textfield/mdl-textfield.component';


const MDL_SERVICES = [
  MdlSnackbarService
];


const MDL_MODULES = [
  MdlButtonModule,
  MdlLayoutModule,
  MdlChekboxModule,
  MdlChipModule,
  MdlDialogModule,
  MdlSpinnerModule,
  MdlRippleModule,
  MdlBadgeModule,
  MdlShadowModule,
  MdlCardModule,
  MdlRadioModule,
  MdlProgressModule,
  MdlIconModule,
  MdlIconToggleModule,
  MdlListModule,
  MdlSliderModule,
  MdlSwitchModule,
  MdlTooltipModule,
  MdlTableModule,
  MdlMenuModule,
  MdlTabsModule,
  MdlTextFieldModule
];

@NgModule({
  imports: MDL_MODULES,
  exports: MDL_MODULES,
  providers: MDL_SERVICES
})
export class MdlModule {

}
