import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MdlDialogOutletModule } from "../dialog-outlet/mdl-dialog-outlet.module";
import {
  MdlSnackbarComponent,
  MdlSnackbarService,
} from "./mdl-snackbar.service";

@NgModule({
  imports: [CommonModule, MdlDialogOutletModule.forRoot()],
  exports: [MdlSnackbarComponent],
  declarations: [MdlSnackbarComponent],
  entryComponents: [MdlSnackbarComponent],
})
export class MdlSnackbarModule {
  static forRoot(): ModuleWithProviders<MdlSnackbarModule> {
    return {
      ngModule: MdlSnackbarModule,
      providers: [MdlSnackbarService],
    };
  }
}

export * from "./mdl-snackbar.service";
