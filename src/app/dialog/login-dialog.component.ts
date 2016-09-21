import {
  Component,
  ViewContainerRef,
} from '@angular/core';
import { MdlDialogReference } from '../../components/dialog/mdl-dialog.service';


@Component({
  moduleId: module.id,
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html'
})
export class LoginDialogComponent {

  constructor(
    public vcRef: ViewContainerRef,
    private dialog: MdlDialogReference) {}

  public login() {
    console.log('login', this.dialog);
    this.dialog.hide();
  }
}
