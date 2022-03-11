import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";
import { MdlTextFieldComponent } from "@angular-mdl/core";

@Component({
  selector: "demo-textfield",
  animations: [flyInOutTrigger],
  templateUrl: "textfield.component.html",
})
export class TextFieldDemoComponent
  extends AbstractDemoComponent
  implements AfterViewInit
{
  @ViewChild("theFirstTextfield", { static: true }) tf:
    | MdlTextFieldComponent
    | undefined;
  text1: string | undefined;
  text2: string | undefined;
  text3: string | undefined;
  text4: string | undefined;
  text5: string | undefined;
  text6: string | undefined;

  public number1: number | null = null;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  get valueType(): string {
    return typeof this.number1;
  }

  public onBlur(event: FocusEvent): void {
    console.log("blur", event);
  }

  public onFocus(event: FocusEvent): void {
    console.log("focus", event);
  }

  public onKeyup(event: KeyboardEvent): void {
    console.log("keyup", event);
  }

  public ngAfterViewInit(): void {
    this.tf?.setFocus();
  }
}
