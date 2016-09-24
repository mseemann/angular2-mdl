import {
  Component,
  ViewContainerRef,
  ViewChild,
  HostListener
} from '@angular/core';
import {
  MdlDialogReference,
  IMdlCustomDialog
} from '../../components/dialog/index';
import 'rxjs/add/operator/scan';
import { MdlTextFieldComponent } from '../../components/textfield/mdl-textfield.component';


@Component({
  moduleId: module.id,
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html'
})
export class LoginDialogComponent implements IMdlCustomDialog {

  @ViewChild('firstElement') private inputElement: MdlTextFieldComponent;

  constructor(
    private vcRef: ViewContainerRef,
    private dialog: MdlDialogReference) {

    this.dialog.onHide().subscribe( () => console.log('login dialog hidden') );

  }

  get viewContainerRef() {
    return this.vcRef;
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
