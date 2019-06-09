import { NgModule, ModuleWithProviders } from '@angular/core';
import { MdlRippleModule } from './common/mdl-ripple.directive';
import { MdlButtonModule } from './button/mdl-button.component';
import { MdlBadgeModule } from './badge/mdl-badge.directive';
import { MdlShadowModule } from './shadow/mdl-shadow.directive';
import { MdlCardModule } from './card/mdl-card.component';
import { MdlChipModule } from './chips';
import { MdlDialogModule } from './dialog';
import { MdlDialogOutletModule } from './dialog-outlet';
import { MdlCheckboxModule } from './checkbox/mdl-checkbox.component';
import { MdlRadioModule } from './radio/mdl-radio.component';
import { MdlProgressModule } from './progress/mdl-progress.component';
import { MdlIconModule } from './icon/mdl-icon.component';
import { MdlIconToggleModule } from './icon-toggle/mdl-icon-toggle.component';
import { MdlListModule } from './list/mdl-list.component';
import { MdlSpinnerModule } from './spinner/mdl-spinner.component';
import { MdlSliderModule }  from './slider/mdl-slider.component';
import { MdlSwitchModule } from './switch/mdl-switch.component';
import { MdlSnackbarModule } from './snackbar/mdl-snackbar.service';
import { MdlTooltipModule } from './tooltip';
import { MdlTableModule } from './table';
import { MdlMenuModule } from './menu';
import { MdlLayoutModule } from './layout';
import { MdlTabsModule } from './tabs';
import { MdlTextFieldModule } from './textfield/mdl-textfield.component';


export * from './common/mdl-ripple.directive';
export * from './badge/mdl-badge.directive';
export * from './button/mdl-button.component';
export * from './card/mdl-card.component';
export * from './checkbox/mdl-checkbox.component';
export * from './chips';
export * from './dialog';
export * from './dialog-outlet';
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
export * from './table'
export * from './tooltip';
export * from './menu';
export * from './layout';
export * from './tabs';
export * from './textfield/mdl-textfield.component';

// AOT :( https://github.com/angular/angular/issues/11606
export { MdlBackdropOverlayComponent as Private1 } from './dialog-outlet/mdl-backdrop-overlay.component';
export { MdlDialogHostComponent as Private2 } from './dialog/mdl-dialog-host.component';
export { MdlSimpleDialogComponent as Private3 } from './dialog/mdl-simple-dialog.component';
export { AppendViewContainerRefDirective as Private4 } from './common/append-view-container-ref-directive';

const MDL_MODULES = [
  MdlButtonModule,
  MdlLayoutModule,
  MdlCheckboxModule,
  MdlChipModule,
  MdlDialogModule,
  MdlDialogOutletModule,
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
  MdlSnackbarModule,
  MdlTooltipModule,
  MdlTableModule,
  MdlMenuModule,
  MdlTabsModule,
  MdlTextFieldModule
];


@NgModule({
  imports: [
    MdlButtonModule.forRoot(),
    MdlLayoutModule.forRoot(),
    MdlCheckboxModule.forRoot(),
    MdlChipModule.forRoot(),
    MdlDialogModule.forRoot(),
    MdlDialogOutletModule.forRoot(),
    MdlSpinnerModule.forRoot(),
    MdlRippleModule.forRoot(),
    MdlBadgeModule.forRoot(),
    MdlShadowModule.forRoot(),
    MdlCardModule.forRoot(),
    MdlRadioModule.forRoot(),
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
  exports: MDL_MODULES,
  providers: []
})
export class MdlModule {}

@NgModule({
  imports: MDL_MODULES,
  exports: MDL_MODULES
})
export class MdlNonRootModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: MdlModule};
  }
}
