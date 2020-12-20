import { NgModule } from "@angular/core";
import { DatePickerDialogComponent } from "./datepicker.component";
import {
  MdlButtonModule,
  MdlDialogModule,
  MdlDialogOutletModule,
  MdlIconModule,
  MdlRippleModule,
} from "@angular-mdl/core";
import { MdlDatePickerService } from "./datepicker.service";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [DatePickerDialogComponent],
  imports: [
    CommonModule,
    MdlButtonModule,
    MdlIconModule,
    MdlRippleModule,
    MdlDialogModule,
    MdlDialogOutletModule,
  ],
  exports: [DatePickerDialogComponent],
  entryComponents: [DatePickerDialogComponent],
  providers: [MdlDatePickerService],
})
export class MdlDatePickerModule {}
