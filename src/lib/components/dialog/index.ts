import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlDialogService } from './mdl-dialog.service';
import { MdlDialogComponent } from './mdl-dialog.component';
import { MdlDialogDefaultComponent } from './mdl-dialog.component';
import { MdlCommonsModule } from '../common/index';
import { MdlDialogHostComponent } from './mdl-dialog-host.component';

export * from './mdl-dialog.component';
export * from './mdl-dialog.service';
export * from './mdl-dialog-configuration';

@NgModule({
  imports: [CommonModule, MdlCommonsModule],
  exports: [MdlDialogComponent, MdlDialogDefaultComponent],
  declarations: [MdlDialogComponent, MdlDialogDefaultComponent, MdlDialogHostComponent],
  entryComponents: [MdlDialogComponent, MdlDialogDefaultComponent, MdlDialogHostComponent]
})
export class MdlDialogModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlDialogModule,
      providers: [MdlDialogService]
    };
  }
}
