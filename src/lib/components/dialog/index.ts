import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlDialogService } from './mdl-dialog.service';
import { MdlDialogComponent } from './mdl-dialog.component';
import { MdlSimpleDialogComponent } from './mdl-simple-dialog.component';
import { MdlCommonsModule } from '../common/index';
import { MdlDialogHostComponent } from './mdl-dialog-host.component';
import { MdlDialogOutletComponent, MdlDialogInnerOutletComponent } from './mdl-dialog-outlet.component';
import { MdlAlertComponent } from './mdl-alert.component';

export * from './mdl-dialog.component';
export * from './mdl-dialog.service';
export * from './mdl-dialog-configuration';

const PUBLIC_COMPONENTS = [
  MdlDialogComponent,
  MdlDialogInnerOutletComponent,
  MdlAlertComponent
];

const PRIVATE_COMPONENTS = [
  MdlDialogHostComponent,
  MdlSimpleDialogComponent,
  MdlDialogOutletComponent
];

@NgModule({
  imports: [CommonModule, MdlCommonsModule],
  exports: PUBLIC_COMPONENTS,
  declarations: [
    ...PUBLIC_COMPONENTS,
    ...PRIVATE_COMPONENTS
  ],
  entryComponents: [
    ...PUBLIC_COMPONENTS,
    ...PRIVATE_COMPONENTS
  ]
})
export class MdlDialogModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlDialogModule,
      providers: [MdlDialogService]
    };
  }
}
