import {
  Component,
  ViewChild,
  HostListener
} from '@angular/core';
import {
  MdlDialogReference
} from '../../../lib/components/dialog/index';
import 'rxjs/add/operator/scan';
import { MdlTextFieldComponent } from '../../../lib/components/textfield/mdl-textfield.component';


@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html'
})
export class LoginDialogComponent {

  @ViewChild('firstElement') private inputElement: MdlTextFieldComponent;

  constructor(private dialog: MdlDialogReference) {
    this.dialog.onHide().subscribe( () => console.log('login dialog hidden') );
  }

  public ngAfterViewInit() {
    // set the focus - autofocus only works once :(
    setTimeout( () => {
      this.inputElement.setFocus();
    }, 1);
  }

  public login() {
    console.log('login', this.dialog);
    this.dialog.hide();
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
      this.dialog.hide();
  }
}
