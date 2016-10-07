import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MdlDialogOutletComponent,
  MdlDialogInnerOutletComponent
} from './mdl-dialog-outlet.component';
import { MdlDialogOutletService } from './mdl-dialog-outlet.service';

export * from './mdl-dialog-outlet.component';

const PUBLIC_COMPONENTS = [
  MdlDialogInnerOutletComponent
];

const PRIVATE_COMPONENTS = [
  MdlDialogOutletComponent
];

@NgModule({
  imports: [],
  exports: PUBLIC_COMPONENTS,
  declarations: [
    ...PUBLIC_COMPONENTS,
    ...PRIVATE_COMPONENTS
  ],
  entryComponents: [
    MdlDialogOutletComponent
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
