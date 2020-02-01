import {ModuleWithProviders, NgModule} from '@angular/core';
import {MdlDialogOutletComponent} from './mdl-dialog-outlet.component';
import {MdlDialogOutletService} from './mdl-dialog-outlet.service';
import {MdlBackdropOverlayComponent} from './mdl-backdrop-overlay.component';
import {MdlDialogInnerOutletComponent} from './mdl-dialog-inner-outlet.component';

export * from './mdl-dialog-outlet.component';
export * from './mdl-dialog-outlet.service';
export * from './mdl-backdrop-overlay.component';

const PUBLIC_COMPONENTS = [
  MdlDialogInnerOutletComponent
];

const PRIVATE_COMPONENTS = [
  MdlDialogOutletComponent,
  MdlBackdropOverlayComponent
];

@NgModule({
  imports: [],
  exports: PUBLIC_COMPONENTS,
  declarations: [
    ...PUBLIC_COMPONENTS,
    ...PRIVATE_COMPONENTS
  ],
  entryComponents: [
    MdlDialogOutletComponent,
    MdlBackdropOverlayComponent
  ]
})
export class MdlDialogOutletModule {
  public static forRoot(): ModuleWithProviders<MdlDialogOutletModule> {
    return {
      ngModule: MdlDialogOutletModule,
      providers: [MdlDialogOutletService]
    };
  }
}
