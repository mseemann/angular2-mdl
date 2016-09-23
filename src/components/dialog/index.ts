import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlDialogService } from './mdl-dialog.service';
import { MdlDialogComponent } from './mdl-dialog.component';
import { MdlCommonsModule } from '../common/index';
import { MdlDialogHostComponent } from './mdl-dialog-host.component';

export * from './mdl-dialog.service';

@NgModule({
  imports: [CommonModule, MdlCommonsModule],
  exports: [MdlDialogComponent],
  declarations: [MdlDialogComponent, MdlDialogHostComponent],
  providers: [MdlDialogService],
  entryComponents: [MdlDialogComponent, MdlDialogHostComponent]
})
export class MdlDialogModule {}
