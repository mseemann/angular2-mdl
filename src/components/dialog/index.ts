import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlDialogService } from './mdl-dialog.service';
import { MdlDialogComponent } from './mdl-dialog.component';
import { MdlCommonsModule } from '../common/index';

export * from './mdl-dialog.service';

@NgModule({
  imports: [CommonModule, MdlCommonsModule],
  exports: [MdlDialogComponent],
  declarations: [MdlDialogComponent],
  providers: [MdlDialogService],
  entryComponents: [MdlDialogComponent]
})
export class MdlDialogModule {}
