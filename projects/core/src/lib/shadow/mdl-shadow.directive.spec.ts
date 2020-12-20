import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { MdlShadowModule } from "./mdl-shadow.module";

@Component({
  // eslint-disable-next-line
  selector: 'test-shadow',
  template: "replaced by the test",
})
class MdlTestShadowComponent {
  public shadow = 2;
}

describe("Directive: MdlShadow", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlShadowModule.forRoot()],
      declarations: [MdlTestShadowComponent],
    });
  });

  it("should add the css class mdl-shadow--2dp to the host element", () => {
    TestBed.overrideComponent(MdlTestShadowComponent, {
      set: {
        template: '<span mdl-shadow="2"></span>',
      },
    });
    const fixture = TestBed.createComponent(MdlTestShadowComponent);
    fixture.detectChanges();

    const spanEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spanEl.classList.contains("mdl-shadow--2dp")).toBe(true);
  });

  it("should change the class from mdl-shadow--2dp to mdl-shadow--4dp if the directive value changes", () => {
    TestBed.overrideComponent(MdlTestShadowComponent, {
      set: {
        template: '<span [mdl-shadow]="shadow"></span>',
      },
    });
    const fixture = TestBed.createComponent(MdlTestShadowComponent);
    fixture.detectChanges();

    const spanEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spanEl.classList.contains("mdl-shadow--2dp")).toBe(true);

    fixture.componentInstance.shadow = 4;
    fixture.detectChanges();
    expect(spanEl.classList.contains("mdl-shadow--4dp")).toBe(true);
  });

  it("should throw if an unsupported shadow value is provided", () => {
    TestBed.overrideComponent(MdlTestShadowComponent, {
      set: {
        template: '<span mdl-shadow="200"></span>',
      },
    });
    const fixture = TestBed.createComponent(MdlTestShadowComponent);

    expect(() => fixture.detectChanges()).toThrow();
  });
});
