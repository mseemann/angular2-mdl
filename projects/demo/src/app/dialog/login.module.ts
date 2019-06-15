import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginDialogComponent} from './login-dialog.component';
import {LoginService} from './login.service';
import {CommonModule} from '@angular/common';
import {MdlModule} from '@angular-mdl/core';


@NgModule({
  imports: [MdlModule, CommonModule, ReactiveFormsModule],
  declarations: [LoginDialogComponent],
  entryComponents: [LoginDialogComponent],
  providers: [LoginService]
})
export class LoginModule {
}
