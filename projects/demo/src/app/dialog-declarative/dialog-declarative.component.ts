import {Component, ViewChild} from '@angular/core';
import {flyInOutTrigger, hostConfig} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';
import {MdlDialogComponent, MdlDialogReference, MdlTextFieldComponent} from '@angular-mdl/core';


@Component({
  selector: 'dialog-declarative-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'dialog-declarative.component.html'
})
export class DialogDeclarativeDemo extends AbstractDemoComponent {

  public username: string = 'Marvin';
  public editedUsername: string;

  @ViewChild('editUserDialog', {static: true}) private editUserDialog: MdlDialogComponent;
  @ViewChild(MdlTextFieldComponent, {static: true}) private tfName: MdlTextFieldComponent;

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title) {
    super(router, route, titleService);
  }

  public alertConfirmd() {
    console.log('alertConfirmd');
  }

  public saveUser() {
    console.log('user saved!');
    this.username = this.editedUsername;
    this.editUserDialog.close();
  }

  public onDialogShow(dialogRef: MdlDialogReference) {
    console.log(`dialog shown`, dialogRef);
    this.editedUsername = this.username;
    this.tfName.setFocus();
  }


  public onDialogHide() {
    console.log(`dialog hidden`);
  }
}
