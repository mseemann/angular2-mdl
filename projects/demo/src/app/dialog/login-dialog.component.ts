import {
  Component,
  HostListener,
  Inject,
  InjectionToken,
  OnInit,
  ViewChild,
} from "@angular/core";
import { LoginService } from "./login.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { MdlDialogReference, MdlTextFieldComponent } from "@angular-mdl/core";

export const TEST_VALUE = new InjectionToken<string>("test value");

@Component({
  selector: "demo-login-dialog",
  templateUrl: "login-dialog.component.html",
  styles: [
    `
      .status-bar {
        text-align: center;
      }
    `,
  ],
})
export class LoginDialogComponent implements OnInit {
  @ViewChild("firstElement", { static: true })
  public inputElement: MdlTextFieldComponent;
  public form: FormGroup;
  public username = new FormControl("", Validators.required);
  public password = new FormControl("", Validators.required);
  public processingLogin = false;
  public statusMessage = "";

  constructor(
    private dialog: MdlDialogReference,
    private fb: FormBuilder,
    private loginService: LoginService,
    @Inject(TEST_VALUE) testValue: string
  ) {
    console.log(`injected test value: ${testValue}`);

    // just if you want to be informed if the dialog is hidden
    this.dialog.onHide().subscribe((user) => {
      console.log("login dialog hidden");
      if (user) {
        console.log("authenticated user", user);
      }
    });

    this.dialog.onVisible().subscribe(() => {
      console.log("set focus");
      this.inputElement.setFocus();
    });
  }

  @HostListener("keydown.esc")
  public onEsc(): void {
    this.dialog.hide();
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      username: this.username,
      password: this.password,
    });
  }

  public login(): void {
    this.processingLogin = true;
    this.statusMessage = "checking your credentials ...";

    const obs = this.loginService.login(
      this.username.value,
      this.password.value
    );
    obs.subscribe((user) => {
      this.processingLogin = false;
      this.statusMessage = "you are logged in ...";

      setTimeout(() => {
        this.dialog.hide(user);
      }, 500);
    });
  }
}
