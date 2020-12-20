import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { MdlSpinnerModule } from "./mdl-spinner.module";

@Component({
  // eslint-disable-next-line
  selector: 'test-progress',
  template: "replaced by the test",
})
class MdlTestSpinnerComponent {
  public active = true;
  public colored = true;
}

describe("Component: MdlProgress", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlSpinnerModule.forRoot()],
      declarations: [MdlTestSpinnerComponent],
    });
  });

  it("should add the css class mdl-spinner to the host element", () => {
    TestBed.overrideComponent(MdlTestSpinnerComponent, {
      set: {
        template: "<mdl-spinner active></mdl-spinner>",
      },
    });
    const fixture = TestBed.createComponent(MdlTestSpinnerComponent);
    fixture.detectChanges();

    const spinnerEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spinnerEl.classList.contains("mdl-spinner")).toBe(true);
  });

  it("should be possible to activate or deactivate the spinner", () => {
    TestBed.overrideComponent(MdlTestSpinnerComponent, {
      set: {
        template: '<mdl-spinner [active]="active"></mdl-spinner>',
      },
    });
    const fixture = TestBed.createComponent(MdlTestSpinnerComponent);
    fixture.detectChanges();

    const spinnerEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spinnerEl.classList.contains("is-active")).toBe(true);

    fixture.componentInstance.active = false;

    fixture.detectChanges();

    expect(spinnerEl.classList.contains("is-active")).toBe(false);
  });

  it("should be possible to colorize or decolorize the spinner", () => {
    TestBed.overrideComponent(MdlTestSpinnerComponent, {
      set: {
        template: '<mdl-spinner [single-color]="colored"></mdl-spinner>',
      },
    });
    const fixture = TestBed.createComponent(MdlTestSpinnerComponent);
    fixture.detectChanges();

    const spinnerEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spinnerEl.classList.contains("mdl-spinner--single-color")).toBe(
      true
    );

    fixture.componentInstance.colored = false;

    fixture.detectChanges();

    expect(spinnerEl.classList.contains("mdl-spinner--single-color")).toBe(
      false
    );
  });
});
