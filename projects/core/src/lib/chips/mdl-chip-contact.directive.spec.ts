import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import {
  MdlChipComponent,
  MdlChipContactDirective,
  MdlChipModule,
} from "./mdl-chip.module";

@Component({
  // eslint-disable-next-line
  selector: 'test-chip',
  template: `
    <mdl-chip mdl-label="test">
      <span mdl-chip-contact>A</span>
    </mdl-chip>
  `,
})
class MdlTestComponent {}

describe("Component: MdlChip", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlChipModule],
      declarations: [MdlTestComponent],
    });
  });

  it("should add the css class mdl-chip__contact to the host element and mdl-chip--contact to the mdl-chip", () => {
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.query(
      By.directive(MdlChipContactDirective)
    ).nativeElement;
    expect(el.classList.contains("mdl-chip__contact")).toBe(true);

    const elChip: HTMLElement = fixture.debugElement.query(
      By.directive(MdlChipComponent)
    ).nativeElement;
    expect(elChip.classList.contains("mdl-chip--contact")).toBe(true);
  });

  it("should throw if mdl-chip-contact is used outside mdl-chip", () => {
    TestBed.overrideComponent(MdlTestComponent, {
      set: {
        template: "<span mdl-chip-contact>A</span>",
      },
    });
    const fixture = TestBed.createComponent(MdlTestComponent);

    expect(() => fixture.detectChanges()).toThrow();
  });
});
