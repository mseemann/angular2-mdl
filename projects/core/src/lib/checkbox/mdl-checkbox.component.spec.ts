import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {MdlCheckboxComponent} from './mdl-checkbox.component';
import {FormsModule} from '@angular/forms';
import {MdlCheckboxModule} from './mdl-checkbox.module';
import {DOCUMENT} from '@angular/common';

@Component({
  // tslint:disable-next-line
  selector: 'test-icon',
  template: `
    <mdl-checkbox [disabled]="false" [(ngModel)]="checkboxValue1" mdl-ripple (change)="onChange($event)">
      checkbox label
    </mdl-checkbox>
  `,
})
class MdlTestCheckboxComponent {
  public checkboxValue1 = false;


  public onChange(v: boolean) {
  }
}


describe('Component: MdlCheckbox', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdlCheckboxModule.forRoot(), FormsModule],
      declarations: [MdlTestCheckboxComponent],
    });
  }));

  it('should add the css class mdl-checkbox to the host element', () => {

    const fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    const checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-checkbox')).toBe(true);


  });

  it('should support ngModel', async(() => {

    const fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const testInstance = fixture.componentInstance;

      // let el = <HTMLInputElement> fixture.debugElement.query(By.css('input')).nativeElement;
      const checkboxComponent = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).componentInstance;

      testInstance.checkboxValue1 = true;

      fixture.detectChanges();
      fixture.whenStable().then(() => {

        // but el.checked is not true ?
        expect(checkboxComponent.value).toEqual(true);

      });

    });

  }));

  it('should change the value on click', () => {

    const fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    const instance = fixture.componentInstance;

    instance.checkboxValue1 = false;

    fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement.click();

    expect(instance.checkboxValue1).toEqual(true);

  });

  it('should mark the component as focused and blured', () => {
    const fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    const doc = TestBed.get(DOCUMENT);
    const evt = doc.createEvent('HTMLEvents');
    evt.initEvent('focus', true, true);
    inputEl.dispatchEvent(evt);

    fixture.detectChanges();

    const checkboxEl: HTMLElement = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement;
    expect(checkboxEl.classList.contains('is-focused')).toBe(true);

    const evtBlur = doc.createEvent('HTMLEvents');
    evtBlur.initEvent('blur', true, true);
    inputEl.dispatchEvent(evtBlur);

    fixture.detectChanges();
    expect(checkboxEl.classList.contains('is-focused')).toBe(false);

  });

  it('should fire a change event if the state changed', async(() => {
    const fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    const instance = fixture.componentInstance;

    spyOn(instance, 'onChange');

    fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement.click();

    expect(instance.onChange).toHaveBeenCalledWith(true);
  }));

  it('should be possible to disable the checkbox', async(() => {
    const fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    const instance = fixture.componentInstance;
    const cbDebugElem = fixture.debugElement.query(By.directive(MdlCheckboxComponent));

    cbDebugElem.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    const checkboxEl: HTMLElement = cbDebugElem.nativeElement;
    expect(checkboxEl.classList.contains('is-disabled')).toBe(true, 'should have css is-disabled');

    // should not change on click
    cbDebugElem.nativeElement.click();
    expect(instance.checkboxValue1).toEqual(false);

  }));

  it('should be possible to set a tabindex', () => {

    TestBed.overrideComponent(MdlTestCheckboxComponent, {
      set: {
        template: '<mdl-checkbox tabindex="2"></mdl-checkbox>'
      }
    });

    const fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    const btnEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(btnEl.tabIndex).toBe(2);

  });

  it('should not set a default tabindex', () => {

    TestBed.overrideComponent(MdlTestCheckboxComponent, {
      set: {
        template: '<mdl-checkbox></mdl-checkbox>'
      }
    });

    const fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    const btnEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(btnEl.getAttribute('tabindex')).toEqual(null);

  });
});
