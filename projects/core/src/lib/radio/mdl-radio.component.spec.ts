import { TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { MdlRadioComponent, MdlRadioGroupRegisty } from "./mdl-radio.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MdlRadioModule } from "./mdl-radio.module";

@Component({
  // eslint-disable-next-line
  selector: 'test-radio',
  template: `
    <mdl-radio
      name="r"
      [(ngModel)]="radioValue"
      value="1"
      mdl-ripple
      (change)="onChange($event)"
      >radio label 1
    </mdl-radio>
    <mdl-radio
      name="r"
      [(ngModel)]="radioValue"
      value="2"
      mdl-ripple
      (change)="onChange($event)"
      >radio label 2
    </mdl-radio>
  `,
})
class MdlTestRadioComponent implements OnInit {
  radioValue = "2";
  radioVisible = true;
  form: FormGroup;
  test = new FormControl("");

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.form = this.fb.group({
      test: this.test,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onChange(v: string) {}
}

@Component({
  // eslint-disable-next-line
  selector: 'test-radio',
  template: `
    <form [formGroup]="testForm">
      <div formGroupName="group1" mdl-radio-group>
        <mdl-radio formControlName="type" value="type1" id="g1t1"></mdl-radio>
        <mdl-radio formControlName="type" value="type2" id="g1t2"></mdl-radio>
      </div>
      <div formGroupName="group2">
        <mdl-radio formControlName="type" value="type1" id="g2t1"></mdl-radio>
        <mdl-radio formControlName="type" value="type2" id="g2t2"></mdl-radio>
      </div>
    </form>
  `,
})
class MdlTestUseSameRadioInGroupsComponent implements OnInit {
  public testForm: FormGroup;

  public ngOnInit() {
    this.testForm = new FormGroup({
      group1: new FormGroup({
        type: new FormControl(""),
      }),
      group2: new FormGroup({
        type: new FormControl(""),
      }),
    });
  }
}

describe("Component: MdlRadio", () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MdlRadioModule.forRoot(), FormsModule, ReactiveFormsModule],
        declarations: [
          MdlTestRadioComponent,
          MdlTestUseSameRadioInGroupsComponent,
        ],
      });
    })
  );

  it("should add the css class mdl-radio to the host element", () => {
    const fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    const checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains("mdl-radio")).toBe(true);
  });

  it(
    "should support ngModel",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestRadioComponent);
      fixture.detectChanges();

      const instance = fixture.componentInstance;
      const component = fixture.debugElement.queryAll(
        By.directive(MdlRadioComponent)
      )[0];

      instance.radioValue = "1";
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.componentInstance.optionValue).toEqual("1");

        const component2 = fixture.debugElement.queryAll(
          By.directive(MdlRadioComponent)
        )[1];
        component2.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.componentInstance.optionValue).toEqual("2");
        });
      });
    })
  );

  it("should mark the component as focused and blured", () => {
    const fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    const inputEl: HTMLInputElement = fixture.debugElement.queryAll(
      By.css("input")
    )[0].nativeElement;

    inputEl.dispatchEvent(new Event("focus"));

    fixture.detectChanges();

    const radioEl: HTMLElement = fixture.debugElement.queryAll(
      By.directive(MdlRadioComponent)
    )[0].nativeElement;
    expect(radioEl.classList.contains("is-focused")).toBe(true);

    inputEl.dispatchEvent(new Event("blur"));

    fixture.detectChanges();
    expect(radioEl.classList.contains("is-focused")).toBe(false);
  });

  it(
    "should throw if name and formcontrolname are different",
    waitForAsync(() => {
      TestBed.overrideComponent(MdlTestRadioComponent, {
        set: {
          template: `
        <mdl-radio name="r" formControlName="test" value="1" mdl-ripple>radio label 1</mdl-radio>
        <mdl-radio name="r" formControlName="test" value="2" mdl-ripple>radio label 2</mdl-radio>
      `,
        },
      });
      const fixture = TestBed.createComponent(MdlTestRadioComponent);

      expect(() => {
        fixture.detectChanges();
      }).toThrow();
    })
  );

  it(
    "should take the name from formcontrolname if no name os provided",
    waitForAsync(() => {
      TestBed.overrideComponent(MdlTestRadioComponent, {
        set: {
          template: `
        <form [formGroup]="form">
          <mdl-radio formControlName="test" value="1" mdl-ripple>radio label 1</mdl-radio>
        </form>
      `,
        },
      });
      const fixture = TestBed.createComponent(MdlTestRadioComponent);
      fixture.detectChanges();

      const radioComponent = fixture.debugElement.query(
        By.directive(MdlRadioComponent)
      ).componentInstance;
      expect(radioComponent.name).toEqual("test");
    })
  );

  it(
    "should remove mdl-radio if the component is destroyed",
    waitForAsync(() => {
      TestBed.overrideComponent(MdlTestRadioComponent, {
        set: {
          template: `
      <form [formGroup]="form">
        <mdl-radio formControlName="test" value="1" mdl-ripple>radio label 1</mdl-radio>
        <mdl-radio *ngIf="radioVisible" formControlName="test" value="2" mdl-ripple>radio label 3</mdl-radio>
      </form>
    `,
        },
      });
      const fixture = TestBed.createComponent(MdlTestRadioComponent);
      fixture.detectChanges();

      const registry = TestBed.inject(MdlRadioGroupRegisty);

      spyOn(registry, "remove").and.callThrough();

      fixture.componentInstance.radioVisible = false;

      fixture.detectChanges();

      expect(registry.remove).toHaveBeenCalled();
    })
  );

  it(
    "should fire a change event if the state changed",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestRadioComponent);
      fixture.detectChanges();

      const instance = fixture.componentInstance;

      spyOn(instance, "onChange");

      const component2 = fixture.debugElement.queryAll(
        By.directive(MdlRadioComponent)
      )[1];
      component2.nativeElement.click();

      expect(instance.onChange).toHaveBeenCalledWith("2");
    })
  );

  it(
    "should be possible to disable the radio input",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestRadioComponent);
      fixture.detectChanges();

      const instance = fixture.componentInstance;
      const cbDebugElem = fixture.debugElement.queryAll(
        By.directive(MdlRadioComponent)
      )[0];

      cbDebugElem.componentInstance.setDisabledState(true);
      fixture.detectChanges();

      const checkboxEl: HTMLElement = cbDebugElem.nativeElement;
      expect(checkboxEl.classList.contains("is-disabled")).toBe(
        true,
        "should have css is-disabled"
      );

      const value = instance.radioValue;
      // should not change on click
      cbDebugElem.nativeElement.click();
      expect(instance.radioValue).toEqual(value);
    })
  );

  it(
    "should not change its current state if it is already checked",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestRadioComponent);
      fixture.detectChanges();

      const cbDebugElem1 = fixture.debugElement.queryAll(
        By.directive(MdlRadioComponent)
      )[0];
      const cbInputEl = cbDebugElem1.query(By.css("input"));

      expect(cbDebugElem1.componentInstance.checked).toBe(false);

      cbInputEl.triggerEventHandler("keyup.space", {});
      fixture.detectChanges();
      expect(cbDebugElem1.componentInstance.checked).toBe(false);
    })
  );

  it("should be possible to use the same radio buttons in different groups", () => {
    const fixture = TestBed.createComponent(
      MdlTestUseSameRadioInGroupsComponent
    );
    fixture.detectChanges();

    const g1t1Elem = fixture.debugElement.query(By.css("#g1t1")).nativeElement;
    const g1t2Elem = fixture.debugElement.query(By.css("#g1t2")).nativeElement;
    const g2t1Elem = fixture.debugElement.query(By.css("#g2t1")).nativeElement;

    g1t1Elem.click();
    fixture.detectChanges();

    expect(g1t1Elem.classList.contains("is-checked")).toBe(
      true,
      "the clicked one should be selected"
    );
    expect(g2t1Elem.classList.contains("is-checked")).toBe(
      false,
      "the not clicked one should not be selected"
    );

    g1t2Elem.click();
    fixture.detectChanges();

    expect(g1t1Elem.classList.contains("is-checked")).toBe(
      false,
      "the not clicked one should not be selected"
    );
    expect(g2t1Elem.classList.contains("is-checked")).toBe(
      false,
      "the not clicked one should not be selected"
    );
  });

  it("should be possible to set a tabindex", () => {
    TestBed.overrideComponent(MdlTestRadioComponent, {
      set: {
        template: '<mdl-radio tabindex="2"></mdl-radio>',
      },
    });

    const fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    const btnEl: HTMLInputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;
    expect(btnEl.tabIndex).toBe(2);
  });

  it("should not set a default tabindex", () => {
    TestBed.overrideComponent(MdlTestRadioComponent, {
      set: {
        template: "<mdl-radio></mdl-radio>",
      },
    });

    const fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;

    expect(el.getAttribute("tabindex")).toEqual(null);
  });
});
