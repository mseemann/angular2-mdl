import { Component, ViewChild } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";
import {
  MdlDialogComponent,
  MdlDialogReference,
  MdlTextFieldComponent,
} from "@angular-mdl/core";

@Component({
  selector: "demo-dialog-declarative",
  animations: [flyInOutTrigger],
  templateUrl: "dialog-declarative.component.html",
})
export class DialogDeclarativeDemoComponent extends AbstractDemoComponent {
  @ViewChild("editUserDialog", { static: true })
  public editUserDialog: MdlDialogComponent | undefined;
  @ViewChild(MdlTextFieldComponent, { static: true })
  public tfName: MdlTextFieldComponent | undefined;
  public username = "Marvin";
  public editedUsername = "";

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public alertConfirmd(): void {
    console.log("alertConfirmd");
  }

  public saveUser(): void {
    console.log("user saved!");
    this.username = this.editedUsername;
    this.editUserDialog?.close();
  }

  public onDialogShow(dialogRef: MdlDialogReference): void {
    console.log(`dialog shown`, dialogRef);
    this.editedUsername = this.username;
    this.tfName?.setFocus();
  }

  public onDialogHide(): void {
    console.log(`dialog hidden`);
  }
}
