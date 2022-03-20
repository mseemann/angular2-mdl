import { TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { MdlSliderComponent } from "./mdl-slider.component";
import { FormsModule } from "@angular/forms";
import { MdlSliderModule } from "./mdl-slider.module";
import { DOCUMENT } from "@angular/common";

@Component({
  // eslint-disable-next-line
  selector: "test-icon",
  template: ` <mdl-slider
    [min]="min"
    [max]="max"
    [(ngModel)]="currentValue"
  ></mdl-slider>`,
})
class MdlTestSliderComponent {
  public min = 0;
  public max = 100;
  public currentValue = 50;
}

describe("Component: MdlSlider", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdlSliderModule.forRoot(), FormsModule],
      declarations: [MdlTestSliderComponent],
    });
  }));

  it("should add the css class mdl-slider__container to the host element", waitForAsync(() => {
    const fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    const iconEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(iconEl.classList.contains("mdl-slider__container")).toBe(true);
  }));

  it("should support ngModel", waitForAsync(() => {
    const fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    const instance = fixture.componentInstance;
    const component = fixture.debugElement.query(
      By.directive(MdlSliderComponent)
    ).componentInstance;

    instance.currentValue = 67;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.value).toEqual(67);

      component.value = 88;
      fixture.detectChanges();

      expect(instance.currentValue).toEqual(88);
    });
  }));

  it("should call blur on mouseup events on the host element", waitForAsync(() => {
    const fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    const hostElement = fixture.debugElement.query(
      By.css("mdl-slider")
    ).nativeElement;

    spyOn(hostElement, "blur");

    const evt = TestBed.inject(DOCUMENT).createEvent("HTMLEvents");
    evt.initEvent("mouseup", true, true);
    hostElement.dispatchEvent(evt);

    fixture.detectChanges();

    expect(hostElement.blur).toHaveBeenCalled();
  }));

  it("should propagate mousedown events on the host to the input element", waitForAsync(() => {
    const fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    const hostElement = fixture.debugElement.query(
      By.css("mdl-slider")
    ).nativeElement;

    const inputElement = fixture.debugElement.query(
      By.css("input")
    ).nativeElement;

    spyOn(inputElement, "dispatchEvent").and.callThrough();

    const evt = TestBed.inject(DOCUMENT).createEvent("HTMLEvents");
    evt.initEvent("mousedown", true, true);
    hostElement.dispatchEvent(evt);

    fixture.detectChanges();

    expect(inputElement.dispatchEvent).toHaveBeenCalledTimes(1);
  }));

  it("should not propagate mousedown events to the input element on other elements than the host", waitForAsync(() => {
    const fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(
      By.css("input")
    ).nativeElement;

    spyOn(inputElement, "dispatchEvent").and.callThrough();

    const evt = TestBed.inject(DOCUMENT).createEvent("HTMLEvents");
    evt.initEvent("mousedown", true, true);
    inputElement.dispatchEvent(evt);

    fixture.detectChanges();

    // if it would be propagated dispatchEvent would have been called 2 times.
    expect(inputElement.dispatchEvent).toHaveBeenCalledTimes(1);
  }));

  it("should be possible to disable the slider", waitForAsync(() => {
    const fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    const cbDebugElem = fixture.debugElement.query(
      By.directive(MdlSliderComponent)
    );

    cbDebugElem.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    expect(cbDebugElem.componentInstance.disabled).toBe(
      true,
      "the internal disbaled prop should be true"
    );

    fixture.whenStable().then(() => {
      const inputElement: HTMLInputElement = fixture.debugElement.query(
        By.css("input")
      ).nativeElement;
      expect(inputElement.getAttribute("disabled")).toBe(
        "",
        "the underlaying input element should be disbaled"
      );
    });
  }));

  it("should support the min, max and step attributes", waitForAsync(() => {
    TestBed.overrideComponent(MdlTestSliderComponent, {
      set: {
        template: '<mdl-slider [min]="1" [max]="2" [step]="5"></mdl-slider>',
      },
    });
    const fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.debugElement.query(
      By.css("input")
    ).nativeElement;
    expect(inputElement.min).toBe("1");
    expect(inputElement.max).toBe("2");
    expect(inputElement.step).toBe("5");
  }));
});
