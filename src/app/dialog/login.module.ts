import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdlModule } from '../../components/index';
import { LoginDialogComponent } from './login-dialog.component';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [MdlModule, CommonModule, ReactiveFormsModule],
  declarations: [LoginDialogComponent],
  exports: [LoginDialogComponent],
  entryComponents: [LoginDialogComponent],
  providers: [LoginService]
})
export class LoginModule {}
