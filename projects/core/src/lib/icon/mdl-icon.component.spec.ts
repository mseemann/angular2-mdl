import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { MdlIconModule } from "./mdl-icon.module";

@Component({
  // eslint-disable-next-line
  selector: 'test-icon',
  template: "<mdl-icon>x</mdl-icon>",
})
class MdlTestIconComponent {}

describe("Component: MdlIcon", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlIconModule.forRoot()],
      declarations: [MdlTestIconComponent],
    });
  });

  it("should add the css class material-icons to the host element", () => {
    const fixture = TestBed.createComponent(MdlTestIconComponent);
    fixture.detectChanges();

    const iconEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(iconEl.classList.contains("material-icons")).toBe(true);
  });
});
