import {
  Component,
  ViewContainerRef,
  ViewChild,
  HostListener, OnInit
} from '@angular/core';
import {
  MdlDialogReference,
  IMdlCustomDialog   // will be removed in verion 2.X
} from '../../components/dialog/index';
import 'rxjs/add/operator/scan';
import { MdlTextFieldComponent } from '../../components/textfield/mdl-textfield.component';
import { LoginService } from './login.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';



@Component({
  moduleId: module.id,
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  styles: [
    `
     .status-bar {
         text-align: center;
     }
    `
  ]
})
export class LoginDialogComponent implements IMdlCustomDialog, OnInit {

  @ViewChild('firstElement') private inputElement: MdlTextFieldComponent;

  public form: FormGroup;
  public username = new FormControl('',  Validators.required);
  public password = new FormControl('', Validators.required);

  public processingLogin = false;
  public statusMessage = '';

  constructor(
    private vcRef: ViewContainerRef,
    private dialog: MdlDialogReference,
    private fb: FormBuilder,
    private loginService: LoginService) {

    // just if you want to be informed if the dialog is hidden
    this.dialog.onHide().subscribe( () => console.log('login dialog hidden') );

  }

  public ngOnInit() {
    this.form = this.fb.group({
      'username':  this.username,
      'password':   this.password
    });
  }

  // this will no longer be necessary in verion 2.X
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
    this.processingLogin = true;
    this.statusMessage = 'checking your credentials ...';
    let obs = this.loginService.login(this.username.value, this.password.value);
    obs.subscribe( (result) => {

      this.processingLogin = false;
      this.statusMessage = 'you are logged in ...';

      setTimeout( () => {
        this.dialog.hide();
       }, 500);

    });
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
      this.dialog.hide();
  }
}

