import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MdlDialogOutletComponent,
  MdlDialogInnerOutletComponent
} from './mdl-dialog-outlet.component';
import { MdlDialogOutletService } from './mdl-dialog-outlet.service';
import { MdlBackdropOverlayComponent } from './mdl-backdrop-overlay.component';

export * from './mdl-dialog-outlet.component';
export * from './mdl-dialog-outlet.service';

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
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlDialogOutletModule,
      providers: [MdlDialogOutletService]
    };
  }
}
