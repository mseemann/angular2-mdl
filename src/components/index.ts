import { NgModule } from '@angular/core';
import {
  MdlRippleModule,
  MdlButtonRippleDirective,
  MdlCheckboxRippleDirective,
  MdlRadioRippleDirective,
  MdlIconToggleRippleDirective,
  MdlSwitchRippleDirective,
  MdlMenuItemRippleDirective,
  MdlListItemRippleDirective,
  MdlAnchorRippleDirective
} from './common/mdl-ripple.directive';
import {
  MdlButtonModule,
  MdlButtonComponent
} from './button/mdl-button.component';
import {
  MdlBadgeModule,
  MdlBadgeDirective,
  MdlBadgeNoBackgroundDirective,
  MdlBadgeOverlapDirective
} from './badge/mdl-badge.directive';
import {
  MdlShadowModule,
  MdlShadowDirective
} from './shadow/mdl-shadow.directive';
import {
  MdlCardModule,
  MdlCardComponent,
  MdlCardTitleComponent,
  MdlCardMediaComponent,
  MdlCardSupportingTextComponent,
  MdlCardActionsComponent,
  MdlCardMenuComponent,
  MdlCardTitleTextDirective,
  MdlCardBorderDirective,
  MdlCardExpandDirective
} from './card/mdl-card.component';
import {
  MdlChekboxModule,
  MdlCheckboxComponent
} from './checkbox/mdl-checkbox.component';
import {
  MdlRadioModule,
  MdlRadioComponent
} from './radio/mdl-radio.component';
import {
  MdlProgressModule,
  MdlProgressComponent
} from './progress/mdl-progress.component';
import {
  MdlIconModule,
  MdlIconComponent
} from './icon/mdl-icon.component';
import {
  MdlIconToggleModule,
  MdlIconToggleComponent
} from './icon-toggle/mdl-icon-toggle.component';
import {
  MdlListModule,
  MdlListComponent,
  MdlListItemComponent,
  MdlListItemPrimaryContentComponent,
  MdlListItemIconDirective,
  MdlListItemAvatarDirective,
  MdlListItemSecondaryContentComponent,
  MdlListItemSecondaryActionComponent,
  MdlListItemSubTitleComponent,
  MdlListItemSecondaryInfoComponent,
  MdlListItemTextBodyComponent
} from './list/mdl-list.component';
import {
  MdlSpinnerModule,
  MdlSpinnerComponent
} from './spinner/mdl-spinner.component';
import {
  MdlSliderModule,
  MdlSliderComponent
}  from './slider/mdl-slider.component';
import {
  MdlSwitchModule,
  MdlSwitchComponent
} from './switch/mdl-switch.component';
import {
  MdlSnackbarService
} from './snackbar/mdl-snackbar.service';
import {
  MdlTooltipModule,
  MdlTooltipComponent,
  MdlTooltipDirective,
  MdlTooltipLargeDirective
} from './tooltip/index';
import {
  MdlTableModule,
  MdlTableComponent,
  MdlSelectableTableComponent
} from './table/index';
import {
  MdlMenuModule,
  MdlMenuComponent,
  MdlMenuItemComponent,
  MdlMenuItemFullBleedDeviderComponent
} from './menu/index';
import {
  MdlLayoutModule,
  MdlLayoutComponent,
  MdlLayoutHeaderComponent,
  MdlLayoutDrawerComponent,
  MdlLayoutContentComponent,
  MdlLayoutHeaderTransparentDirective,
  MdlLayoutHeaderRowComponent,
  MdlLayoutTitleComponent,
  MdlLayoutSpacerComponent,
  MdlLayoutTabPanelComponent
} from './layout/index';
import {
  MdlTabsModule,
  MdlTabsComponent,
  MdlTabPanelComponent,
  MdlTabPanelTitleComponent
} from './tabs/index';
import {
  MdlTextFieldModule,
  MdlTextFieldComponent
} from './textfield/mdl-textfield.component';

export * from './common/mdl-ripple.directive';
export * from './badge/mdl-badge.directive';
export * from './button/mdl-button.component';
export * from './card/mdl-card.component';
export * from './checkbox/mdl-checkbox.component';
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

/** @deprecated */
export const MDL_SERVICES = [
  MdlSnackbarService
];

/** @deprecated */
export const MDL_DIRECTIVES = [
  MdlButtonRippleDirective,
  MdlCheckboxRippleDirective,
  MdlRadioRippleDirective,
  MdlIconToggleRippleDirective,
  MdlSwitchRippleDirective,
  MdlListItemRippleDirective,
  MdlAnchorRippleDirective,
  MdlBadgeDirective,
  MdlBadgeNoBackgroundDirective,
  MdlBadgeOverlapDirective,
  MdlButtonComponent,
  MdlCardComponent,
  MdlCardTitleComponent,
  MdlCardSupportingTextComponent,
  MdlCardActionsComponent,
  MdlCardMenuComponent,
  MdlCardTitleTextDirective,
  MdlCardMediaComponent,
  MdlCardBorderDirective,
  MdlCardExpandDirective,
  MdlCheckboxComponent,
  MdlIconComponent,
  MdlIconToggleComponent,
  MdlListComponent,
  MdlListItemComponent,
  MdlListItemPrimaryContentComponent,
  MdlListItemIconDirective,
  MdlListItemAvatarDirective,
  MdlListItemSecondaryContentComponent,
  MdlListItemSecondaryActionComponent,
  MdlListItemSubTitleComponent,
  MdlListItemSecondaryInfoComponent,
  MdlListItemTextBodyComponent,
  MdlProgressComponent,
  MdlRadioComponent,
  MdlShadowDirective,
  MdlSliderComponent,
  MdlSpinnerComponent,
  MdlSwitchComponent,
  MdlTooltipComponent,
  MdlTooltipDirective,
  MdlTooltipLargeDirective,
  MdlTableComponent,
  MdlSelectableTableComponent,
  MdlMenuComponent,
  MdlMenuItemComponent,
  MdlMenuItemRippleDirective,
  MdlMenuItemFullBleedDeviderComponent,
  MdlLayoutComponent,
  MdlLayoutHeaderComponent,
  MdlLayoutDrawerComponent,
  MdlLayoutContentComponent,
  MdlLayoutHeaderTransparentDirective,
  MdlLayoutHeaderRowComponent,
  MdlLayoutTitleComponent,
  MdlLayoutSpacerComponent,
  MdlTabsComponent,
  MdlTabPanelComponent,
  MdlTabPanelTitleComponent,
  MdlLayoutTabPanelComponent,
  MdlTextFieldComponent
];

const MDL_MODULES = [
  MdlButtonModule,
  MdlLayoutModule,
  MdlChekboxModule,
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
export class MdlModule {}
