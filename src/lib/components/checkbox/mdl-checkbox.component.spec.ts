import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';
import { DOCUMENT, By } from '@angular/platform-browser';
import { Component} from '@angular/core';
import {
  MdlCheckboxComponent,
  MdlCheckboxModule} from './mdl-checkbox.component';
import { FormsModule } from '@angular/forms';

describe('Component: MdlCheckbox', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MdlCheckboxModule, FormsModule ],
      declarations: [ MdlTestCheckboxComponent ],
    });
  }));

  it('should add the css class mdl-checkbox to the host element', () => {

    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-checkbox')).toBe(true);


  });

  it('should support ngModel', async(() => {

    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let testInstance = fixture.componentInstance;

      // let el = <HTMLInputElement> fixture.debugElement.query(By.css('input')).nativeElement;
      let checkboxComponent = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).componentInstance;

      testInstance.checkboxValue1 = true;

      fixture.detectChanges();
      fixture.whenStable().then(() => {

        // but el.checked is not true ?
        expect(checkboxComponent.value).toEqual(true);

      });

    });

  }));

  it('should change the value on click', () => {

    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;

    instance.checkboxValue1 = false;

    fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement.click();

    expect(instance.checkboxValue1).toEqual(true);

  });

  it('should mark the component as focused and blured', () => {
    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    let doc = TestBed.get(DOCUMENT);
    var evt = doc.createEvent('HTMLEvents');
    evt.initEvent('focus', true, true);
    inputEl.dispatchEvent(evt);

    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement;
    expect(checkboxEl.classList.contains('is-focused')).toBe(true);

    var evtBlur = doc.createEvent('HTMLEvents');
    evtBlur.initEvent('blur', true, true);
    inputEl.dispatchEvent(evtBlur);

    fixture.detectChanges();
    expect(checkboxEl.classList.contains('is-focused')).toBe(false);

  });

  it('should fire a change event if the state changed', async(() => {
    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;

    spyOn(instance, 'onChange');

    fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement.click();

    expect(instance.onChange).toHaveBeenCalledWith(true);
  }));

  it('should be possible to disable the checkbox', async(() => {
    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;
    let cbDebugElem = fixture.debugElement.query(By.directive(MdlCheckboxComponent));

    cbDebugElem.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = cbDebugElem.nativeElement;
    expect(checkboxEl.classList.contains('is-disabled')).toBe(true, 'should have css is-disabled');

    // should not change on click
    cbDebugElem.nativeElement.click();
    expect(instance.checkboxValue1).toEqual(false);

  }));

  it('should be possible to set a tabindex', () => {

    TestBed.overrideComponent(MdlTestCheckboxComponent, { set: {
      template: '<mdl-checkbox tabindex="2"></mdl-checkbox>' }
    });

    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let btnEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(btnEl.tabIndex).toBe(2);

  });

  it('should not set a default tabindex', () => {

    TestBed.overrideComponent(MdlTestCheckboxComponent, { set: {
      template: '<mdl-checkbox></mdl-checkbox>' }
    });

    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let btnEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(btnEl.getAttribute('tabindex')).toEqual(null);

  });
});


@Component({
  selector: 'test-icon',
  template: `<mdl-checkbox [disabled]="false" [(ngModel)]="checkboxValue1" mdl-ripple (change)="onChange($event)">
              checkbox label
            </mdl-checkbox>
  `,
})
class MdlTestCheckboxComponent {
  public checkboxValue1 = false;


  public onChange(v: boolean) {}
}
