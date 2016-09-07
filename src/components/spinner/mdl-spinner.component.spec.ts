import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MdlSpinnerModule } from './mdl-spinner.component';

describe('Component: MdlProgress', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlSpinnerModule ],
      declarations: [ MdlTestSpinnerComponent ],
    });
  });

  it('should add the css class mdl-spinner to the host element', () => {

    TestBed.overrideComponent(MdlTestSpinnerComponent, { set: {
      template: '<mdl-spinner active></mdl-spinner>' }
    });
    let fixture = TestBed.createComponent(MdlTestSpinnerComponent);
    fixture.detectChanges();

    let spinnerEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spinnerEl.classList.contains('mdl-spinner')).toBe(true);

  });

  it('should be possible to activate or deactivate the spinner', () => {

    TestBed.overrideComponent(MdlTestSpinnerComponent, { set: {
      template: '<mdl-spinner [active]="active"></mdl-spinner>' }
    });
    let fixture = TestBed.createComponent(MdlTestSpinnerComponent);
    fixture.detectChanges();

    let spinnerEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spinnerEl.classList.contains('is-active')).toBe(true);

    fixture.componentInstance.active = false;

    fixture.detectChanges();

    expect(spinnerEl.classList.contains('is-active')).toBe(false);

  });

  it('should be possible to colorize or decolorize the spinner', () => {

    TestBed.overrideComponent(MdlTestSpinnerComponent, { set: {
      template: '<mdl-spinner [single-color]="colored"></mdl-spinner>' }
    });
    let fixture = TestBed.createComponent(MdlTestSpinnerComponent);
    fixture.detectChanges();

    let spinnerEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spinnerEl.classList.contains('mdl-spinner--single-color')).toBe(true);

    fixture.componentInstance.colored = false;

    fixture.detectChanges();

    expect(spinnerEl.classList.contains('mdl-spinner--single-color')).toBe(false);
  });
});


@Component({
  selector: 'test-progress',
  template: 'replaced by the test'
})
class MdlTestSpinnerComponent {
  public active = true;
  public colored = true;
}
