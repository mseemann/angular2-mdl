import { Component } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";
import { map } from "rxjs/operators";

const emailValidator = Validators.pattern(
  "^[a-z]+[a-z0-9._]+@[a-z]+.[a-z.]{2,5}$"
);

@Component({
  selector: "demo-reactive-form",
  animations: [flyInOutTrigger],
  templateUrl: "reactiveform.component.html",
})
export class ReactiveFormsDemoComponent extends AbstractDemoComponent {
  public disableForm = false;
  public form: UntypedFormGroup;
  public firstName = new UntypedFormControl("");
  public lastName = new UntypedFormControl("", Validators.required);
  public email = new UntypedFormControl("", emailValidator);
  public email2 = new UntypedFormControl("", emailValidator);
  public breakfast = new UntypedFormControl("Continental");
  public toDrink = new UntypedFormControl("Tea");

  public testForm: UntypedFormGroup;

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title,
    private fb: UntypedFormBuilder
  ) {
    super(router, route, titleService);
    this.form = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      email2: this.email2,
      breakfast: this.breakfast,
      toDrink: this.toDrink,
    });
    this.form.valueChanges
      .pipe(
        map((formValues) => {
          formValues.firstName = formValues.firstName.toUpperCase();
          return formValues;
        })
      )
      // .filter((formValues) => this.form.valid)
      .subscribe((formValues) => {
        console.log(
          `Model Driven Form valid: ${this.form.valid} value:`,
          JSON.stringify(formValues)
        );
      });

    // testform radio buttons inside groups
    this.testForm = new UntypedFormGroup({
      group1: new UntypedFormGroup({
        type: new UntypedFormControl(""),
      }),
      group2: new UntypedFormGroup({
        type: new UntypedFormControl(""),
      }),
    });
  }

  public onSubmit(): void {
    console.log(this.form);
  }

  public onDisableForm(formDisabled: boolean): void {
    if (formDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
