import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MdlSelectComponent } from "./select.component";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { KEYS } from "./keyboard";
import { MdlSelectModule } from "./select.module";

@Component({
  // eslint-disable-next-line
  selector: "test-disabled-component",
  template: `
    <form [formGroup]="form">
      <mdl-select formControlName="personId">
        <mdl-option *ngFor="let p of people" [value]="p.id">{{
          p.name
        }}</mdl-option>
      </mdl-select>
    </form>
  `,
})
class TestDisabledComponent {
  form: FormGroup;
  personId: FormControl = new FormControl({ value: 1, disabled: true });
  people: unknown[] = [
    { id: 1, name: "Bryan Cranston" },
    { id: 2, name: "Aaron Paul" },
    { id: 3, name: "Bob Odenkirk" },
  ];

  constructor() {
    this.form = new FormGroup({
      personId: this.personId,
    });
  }
}

@Component({
  // eslint-disable-next-line
  selector: "test-single-component",
  template: `
    <mdl-select
      label="{{ label }}"
      floating-label
      [autocomplete]="true"
      [(ngModel)]="selectedValue"
    >
      <mdl-option *ngFor="let p of people" [value]="p.id">{{
        p.name
      }}</mdl-option>
    </mdl-select>
  `,
})
class TestAutoCompleteComponent {
  selectedValue: unknown = null;
  label = "floating label";
  people: unknown[] = [
    { id: 1, name: "Bryan Cranston" },
    { id: 2, name: "Aaron Paul" },
    { id: 3, name: "Bob Odenkirk" },
  ];
}

@Component({
  // eslint-disable-next-line
  selector: "test-single-component",
  template: `
    <mdl-select label="{{ label }}" floating-label [(ngModel)]="personId">
      <mdl-option *ngFor="let p of people" [value]="p.id">{{
        p.name
      }}</mdl-option>
    </mdl-select>
  `,
})
class TestSingleComponent {
  personId = 1;
  label = "floating label";
  people: unknown[] = [
    { id: 1, name: "Bryan Cranston" },
    { id: 2, name: "Aaron Paul" },
    { id: 3, name: "Bob Odenkirk" },
  ];
}

@Component({
  // eslint-disable-next-line
  selector: "test-single-component-no-model",
  template: `
    <mdl-select placeholder="{{ placeholder }}">
      <mdl-option value="first">Bryan Cranston</mdl-option>
      <mdl-option value="second">Aaron Paul</mdl-option>
      <mdl-option value="third">Bob Odenkirk</mdl-option>
    </mdl-select>
  `,
})
class TestSingleComponentNoModelComponent {
  placeholder = "no model";
}

@Component({
  // eslint-disable-next-line
  selector: "test-multiple-component",
  template: `
    <mdl-select [(ngModel)]="personIds" [multiple]="true">
      <mdl-option *ngFor="let p of people" [value]="p.id">{{
        p.name
      }}</mdl-option>
    </mdl-select>
  `,
})
class TestMultipleComponent {
  personIds: number[] = [1, 2];
  people: unknown[] = [
    { id: 1, name: "Bryan Cranston" },
    { id: 2, name: "Aaron Paul" },
    { id: 3, name: "Bob Odenkirk" },
  ];
}

@Component({
  // eslint-disable-next-line
  selector: "test-object-component",
  template: `
    <mdl-select [(ngModel)]="personObjs" [multiple]="true">
      <mdl-option *ngFor="let p of people" [value]="{ i: p.id, n: p.name }">{{
        p.name
      }}</mdl-option>
    </mdl-select>
  `,
})
class TestObjectComponent {
  personObjs: unknown[] = [
    { i: 1, n: "Bryan Cranston" },
    { i: 2, n: "Aaron Paul" },
  ];
  people: unknown[] = [
    { id: 1, name: "Bryan Cranston" },
    { id: 2, name: "Aaron Paul" },
    { id: 3, name: "Bob Odenkirk" },
  ];
}

// based on @angular/cdk
export const createKeyboardEvent = (
  type: string,
  keyCode: number,
  target?: Element,
  key?: string
): KeyboardEvent => {
  // eslint-disable-next-line
  const event = document.createEvent("KeyboardEvent") as any;

  // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
  if (event.initKeyEvent) {
    event.initKeyEvent(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
  } else {
    // eslint-disable-next-line
    event.initKeyboardEvent(type, true, true, window, 0, key, 0, "", false);
  }

  // Webkit Browsers don't set the keyCode when calling the init function.
  // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
  Object.defineProperties(event, {
    keyCode: { get: () => keyCode },
    key: { get: () => key },
    target: { get: () => target },
  });

  return event;
};

// based on @angular/cdk
export const dispatchEvent = (node: Node | Window, event: Event): Event => {
  node.dispatchEvent(event);
  return event;
};

// eslint-disable-next-line
export const dispatchKeydownEvent = (node: any, keycode: number) =>
  dispatchEvent(node, createKeyboardEvent("keydown", keycode, node));

describe("MdlSelect", () => {
  describe("single", () => {
    let fixture: ComponentFixture<TestSingleComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [MdlSelectModule.forRoot(), FormsModule],
          declarations: [TestSingleComponent],
        });

        TestBed.compileComponents().then(() => {
          fixture = TestBed.createComponent(TestSingleComponent);
          fixture.detectChanges();
        });
      })
    );

    it(
      "should support floating-label attr",
      waitForAsync(() => {
        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        );

        const selectNativeElement = selectComponent.nativeElement;

        expect(
          selectNativeElement.classList.contains("mdl-select--floating-label")
        ).toBe(true, "did not has css class mdl-select--floating-label");

        expect(
          selectComponent.nativeElement.querySelector(".mdl-textfield__label")
            .innerText
        ).toBe(
          selectComponent.componentInstance.label,
          "did not set correct label text"
        );
      })
    );

    it(
      "should create the component and add the mdl-select css class",
      waitForAsync(() => {
        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        );

        const selectNativeElement = selectComponent.nativeElement;

        expect(selectNativeElement.classList.contains("mdl-select")).toBe(
          true,
          "did not has css class mdl-select"
        );
      })
    );

    it(
      "should support internalModel",
      waitForAsync(() => {
        const testInstance = fixture.componentInstance;
        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        fixture.whenStable().then(() => {
          expect(selectComponent.internalModel).toEqual(
            1,
            "did not init internalModel"
          );

          testInstance.personId = 2;

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(selectComponent.internalModel).toEqual(
              2,
              "did not update internalModel"
            );
          });
        });
      })
    );

    it(
      "should reset internalModel",
      waitForAsync(() => {
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        fixture.whenStable().then(() => {
          expect(selectComponentInstance.internalModel).toEqual(
            1,
            "did not init internalModel"
          );

          selectComponentInstance.reset();

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(selectComponentInstance.internalModel).toEqual(
              "",
              "did not reset internalModel"
            );
          });
        });
      })
    );

    it(
      "should bind options on options change",
      waitForAsync(() => {
        const testInstance = fixture.componentInstance;
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        spyOn(selectComponentInstance, "bindOptions").and.callThrough();

        testInstance.people.push({ id: 4, name: "Gary Cole" });

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(selectComponentInstance.bindOptions).toHaveBeenCalled();

          expect(selectComponentInstance.textByValue[4]).toEqual("Gary Cole");
        });
      })
    );

    it(
      "focus should have keyboard events",
      waitForAsync(() => {
        jasmine.clock().uninstall();
        jasmine.clock().install();

        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        );

        const selectNativeElement = selectComponent.nativeElement;

        const selectComponentInstance = selectComponent.componentInstance;

        spyOn(selectComponentInstance, "onKeyDown").and.callThrough();

        spyOn(selectComponentInstance, "onArrow").and.callThrough();

        // console.log(selectNativeElement.querySelector("span[tabindex]"));
        // document.body.appendChild(selectNativeElement);

        selectNativeElement.querySelector("span[tabindex]").focus();
        jasmine.clock().tick(500); // onFocus timeout is cleared
        fixture.detectChanges();

        expect(selectComponentInstance.popoverComponent.isVisible).toEqual(
          true,
          "toggle did not update isVisible to true"
        );

        dispatchKeydownEvent(
          selectNativeElement.querySelector("span"),
          KEYS.downArrow
        );

        dispatchKeydownEvent(
          selectNativeElement.querySelector("span"),
          KEYS.upArrow
        );

        dispatchKeydownEvent(
          selectNativeElement.querySelector("span"),
          KEYS.tab
        );

        fixture.detectChanges();

        fixture.debugElement.nativeElement.click(); // click outside select to close
        fixture.detectChanges();

        expect(selectComponentInstance.popoverComponent.isVisible).toEqual(
          false,
          "toggle did not update isVisible to false"
        );

        expect(selectComponentInstance.onKeyDown).toHaveBeenCalled();
        // eslint-disable-next-line
        expect(
          selectComponentInstance.onArrow.calls
            .allArgs()
            .map((args: any) => args[1])
        ).toEqual([1, -1]);

        jasmine.clock().uninstall();
      })
    );

    it(
      "should auto-select searched options",
      waitForAsync(() => {
        jasmine.clock().uninstall();
        jasmine.clock().install();

        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        );

        const selectNativeElement = selectComponent.nativeElement;

        const selectComponentInstance = selectComponent.componentInstance;

        spyOn(selectComponentInstance, "onSelect").and.callThrough();
        spyOn(selectComponentInstance, "onCharacterKeydown").and.callThrough();

        selectNativeElement.querySelector("span[tabindex]").focus();
        jasmine.clock().tick(500); // onFocus timeout is cleared
        fixture.detectChanges();

        expect(selectComponentInstance.internalModel).toEqual(1);
        dispatchKeydownEvent(selectNativeElement, KEYS.b);
        fixture.detectChanges();

        expect(selectComponentInstance.onSelect).not.toHaveBeenCalled();
        expect(selectComponentInstance.onCharacterKeydown).toHaveBeenCalled();
        expect(selectComponentInstance.internalModel).toEqual(1);

        dispatchKeydownEvent(selectNativeElement, KEYS.o);
        fixture.detectChanges();

        expect(selectComponentInstance.onSelect).toHaveBeenCalled();
        expect(selectComponentInstance.searchQuery).toEqual("bo");
        expect(selectComponentInstance.internalModel).toEqual(3); // B and O typed, so 'Bob Odenkirk' selected

        jasmine.clock().tick(300); // search query timeout is cleared

        expect(selectComponentInstance.searchQuery).toEqual("");

        dispatchKeydownEvent(selectNativeElement, KEYS.a);
        fixture.detectChanges();

        expect(selectComponentInstance.onSelect).toHaveBeenCalled();
        expect(selectComponentInstance.internalModel).toEqual(2); // A typed, so 'Aaron Paul' selected

        jasmine.clock().uninstall();
      })
    );
  });

  describe("single, without model", () => {
    let fixture: ComponentFixture<TestSingleComponentNoModelComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [MdlSelectModule.forRoot(), FormsModule],
          declarations: [TestSingleComponentNoModelComponent],
        });

        TestBed.compileComponents().then(() => {
          fixture = TestBed.createComponent(
            TestSingleComponentNoModelComponent
          );
          fixture.detectChanges();
        });
      })
    );

    it(
      "should select vlaue and display text",
      waitForAsync(() => {
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        const noModelData = [
          { value: "first", text: "Bryan Cranston" },
          { value: "second", text: "Aaron Paul" },
          { value: "third", text: "Bob Odenkirk" },
        ];

        selectComponentInstance.onSelect(noModelData[0].value);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(selectComponentInstance.text).toEqual(noModelData[0].text);

          selectComponentInstance.onSelect(noModelData[1].value);

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(selectComponentInstance.text).toEqual(noModelData[1].text);
          });
        });
      })
    );
  });

  describe("disabled", () => {
    let fixture: ComponentFixture<TestDisabledComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [MdlSelectModule.forRoot(), ReactiveFormsModule],
          declarations: [TestDisabledComponent],
        });

        TestBed.compileComponents().then(() => {
          fixture = TestBed.createComponent(TestDisabledComponent);
          fixture.detectChanges();
        });
      })
    );

    it(
      "should create the component and make it disabled",
      waitForAsync(() => {
        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        fixture.whenStable().then(() => {
          expect(selectComponent.disabled).toBe(
            true,
            "select field should be disabled"
          );
        });
      })
    );
  });

  describe("autocomplete", () => {
    let fixture: ComponentFixture<TestAutoCompleteComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [MdlSelectModule.forRoot(), FormsModule],
          declarations: [TestAutoCompleteComponent],
        });

        TestBed.compileComponents().then(() => {
          fixture = TestBed.createComponent(TestAutoCompleteComponent);
          fixture.detectChanges();
        });
      })
    );

    it(
      "should not make autoselection when it's on",
      waitForAsync(() => {
        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        );

        const selectNativeElement = selectComponent.nativeElement;

        const selectComponentInstance = selectComponent.componentInstance;

        spyOn(selectComponentInstance, "onSelect").and.callThrough();
        spyOn(selectComponentInstance, "onCharacterKeydown").and.callThrough();

        selectNativeElement.querySelector("input").focus();
        fixture.detectChanges();

        expect(selectComponentInstance.internalModel).toBeNull();
        dispatchKeydownEvent(selectNativeElement, KEYS.b);
        fixture.detectChanges();

        expect(selectComponentInstance.internalModel).toBeNull();
      })
    );

    it(
      "should make autoselection on enter",
      waitForAsync(() => {
        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        );

        const selectNativeElement = selectComponent.nativeElement;

        const selectComponentInstance = selectComponent.componentInstance;

        const input = selectNativeElement.querySelector("input");

        spyOn(selectComponentInstance, "onSelect").and.callThrough();
        spyOn(selectComponentInstance, "onCharacterKeydown").and.callThrough();
        input.focus();

        fixture.detectChanges();
        expect(selectComponentInstance.internalModel).toBeNull();

        dispatchEvent(input, createKeyboardEvent("keyup", KEYS.b, input));
        fixture.detectChanges();
        expect(selectComponentInstance.internalModel).toBeNull();

        dispatchEvent(input, createKeyboardEvent("keyup", KEYS.enter, input));
        fixture.detectChanges();
        expect(selectComponentInstance.internalModel).toEqual(1);
      })
    );

    it(
      "should make input writable when autoselection is off",
      waitForAsync(() => {
        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        );

        const selectNativeElement = selectComponent.nativeElement;

        expect(selectNativeElement.querySelector("input").readonly).toBeFalsy();
      })
    );
  });

  describe("multiple", () => {
    let fixture: ComponentFixture<TestMultipleComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [MdlSelectModule.forRoot(), FormsModule],
          declarations: [TestMultipleComponent],
        });

        TestBed.compileComponents().then(() => {
          fixture = TestBed.createComponent(TestMultipleComponent);
          fixture.detectChanges();
        });
      })
    );

    it(
      "should create the component and add the mdl-select css class",
      waitForAsync(() => {
        const selectComponent = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        );

        const selectNativeElement = selectComponent.nativeElement;

        expect(selectNativeElement.classList.contains("mdl-select")).toBe(
          true,
          "did not have css class mdl-select"
        );
      })
    );

    it(
      "should support internalModel",
      waitForAsync(() => {
        const testInstance = fixture.componentInstance;
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        fixture.whenStable().then(() => {
          expect(selectComponentInstance.internalModel).toEqual(
            [1, 2],
            "did not init internalModel"
          );

          testInstance.personIds = [1];

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(selectComponentInstance.internalModel).toEqual(
              [1],
              "did not update internalModel"
            );
          });
        });
      })
    );

    it(
      "should reset internalModel",
      waitForAsync(() => {
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        spyOn(selectComponentInstance, "bindOptions");

        fixture.whenStable().then(() => {
          expect(selectComponentInstance.internalModel).toEqual(
            [1, 2],
            "did not init internalModel"
          );

          selectComponentInstance.reset();

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(selectComponentInstance.internalModel).toEqual(
              [],
              "did not reset internalModel"
            );
          });
        });
      })
    );

    it(
      "should select and deselect value",
      waitForAsync(() => {
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        expect(selectComponentInstance.multiple).toBe(true, "is not multiple");

        selectComponentInstance.onSelect(3);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(selectComponentInstance.internalModel).toEqual(
            [1, 2, 3],
            "did not update internalModel on select 3"
          );

          selectComponentInstance.onSelect(3);

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(selectComponentInstance.internalModel).toEqual(
              [1, 2],
              "did not update internalModel on deselect 3"
            );
          });
        });
      })
    );

    it(
      "should bind options on options change",
      waitForAsync(() => {
        const testInstance = fixture.componentInstance;
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        spyOn(selectComponentInstance, "bindOptions").and.callThrough();

        testInstance.people.push({ id: 4, name: "Gary Cole" });

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(selectComponentInstance.bindOptions).toHaveBeenCalled();

          expect(selectComponentInstance.textByValue[4]).toEqual("Gary Cole");
        });
      })
    );
  });
  describe("object", () => {
    let fixture: ComponentFixture<TestObjectComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [MdlSelectModule.forRoot(), FormsModule],
          declarations: [TestObjectComponent],
        });

        TestBed.compileComponents().then(() => {
          fixture = TestBed.createComponent(TestObjectComponent);
          fixture.detectChanges();
        });
      })
    );

    it(
      "should support internalModel",
      waitForAsync(() => {
        const testInstance = fixture.componentInstance;
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        fixture.whenStable().then(() => {
          expect(selectComponentInstance.internalModel).toEqual(
            [
              { i: 1, n: "Bryan Cranston" },
              { i: 2, n: "Aaron Paul" },
            ],
            "did not init internalModel"
          );

          testInstance.personObjs = [{ i: 1, n: "Bryan Cranston" }];

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(selectComponentInstance.internalModel).toEqual(
              [{ i: 1, n: "Bryan Cranston" }],
              "did not update internalModel"
            );
          });
        });
      })
    );

    it(
      "should reset internalModel",
      waitForAsync(() => {
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        spyOn(selectComponentInstance, "bindOptions");

        fixture.whenStable().then(() => {
          expect(selectComponentInstance.internalModel).toEqual(
            [
              { i: 1, n: "Bryan Cranston" },
              { i: 2, n: "Aaron Paul" },
            ],
            "did not init internalModel"
          );

          selectComponentInstance.reset();

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(selectComponentInstance.internalModel).toEqual(
              [],
              "did not reset internalModel"
            );
          });
        });
      })
    );

    it(
      "should select and deselect value",
      waitForAsync(() => {
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        const arrWith3Obj = [
          { i: 1, n: "Bryan Cranston" },
          { i: 2, n: "Aaron Paul" },
          { i: 3, n: "Bob Odenkirk" },
        ];

        expect(selectComponentInstance.multiple).toBe(true, "is not multiple");

        selectComponentInstance.onSelect(arrWith3Obj[2]);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(selectComponentInstance.internalModel).toEqual(
            arrWith3Obj,
            "did not update internalModel on select 3"
          );

          selectComponentInstance.onSelect(arrWith3Obj[2]);

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(selectComponentInstance.internalModel).toEqual(
              [arrWith3Obj[0], arrWith3Obj[1]],
              "did not update internalModel on deselect 3"
            );

            selectComponentInstance.onSelect(arrWith3Obj[1]);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
              expect(selectComponentInstance.internalModel).toEqual(
                [arrWith3Obj[0]],
                "did not update internalModel on deselect 3"
              );
            });
          });
        });
      })
    );

    it(
      "should bind options on options change",
      waitForAsync(() => {
        const testInstance = fixture.componentInstance;
        const selectComponentInstance = fixture.debugElement.query(
          By.directive(MdlSelectComponent)
        ).componentInstance;

        spyOn(selectComponentInstance, "bindOptions").and.callThrough();

        testInstance.people.push({ id: 4, name: "Gary Cole" });

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(selectComponentInstance.bindOptions).toHaveBeenCalled();

          expect(
            selectComponentInstance.textByValue[
              JSON.stringify({ i: 4, n: "Gary Cole" })
            ]
          ).toEqual("Gary Cole");
        });
      })
    );
  });
});
