import {TestBed, waitForAsync} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdlDatePickerModule} from './datepicker.module';
import {CommonModule} from '@angular/common';
import {
  MdlButtonModule,
  MdlDialogModule,
  MdlDialogOutletModule,
  MdlIconModule,
  MdlRippleModule
} from '@angular-mdl/core';
import {MdlDatePickerService} from './datepicker.service';
import * as momentNs from 'moment';
// see https://github.com/ng-packagr/ng-packagr/issues/217
const moment = momentNs;

moment.locale('en');

@Component({
  // eslint-disable-next-line
  selector: 'test-component',
  template: `
    <dialog-outlet></dialog-outlet>
  `
})
class MdlTestComponent {

}

xdescribe('DatePickerService', () => {


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlButtonModule,
        MdlIconModule,
        MdlRippleModule,
        MdlDatePickerModule,
        MdlDialogModule.forRoot(),
        MdlDialogOutletModule
      ],
      declarations: [MdlTestComponent]
    });

    TestBed.compileComponents();
  }));

  it('should instantiate the service', waitForAsync(() => {
    const service: MdlDatePickerService = TestBed.inject(MdlDatePickerService);
    expect(service).toBeDefined();
  }));

  it('should open the date picker dialog', (done: any) => {

    const fixture = TestBed.createComponent(MdlTestComponent);

    const service: MdlDatePickerService = TestBed.inject(MdlDatePickerService);
    service.selectDate().subscribe((date) => {
      expect(date).toBeDefined();
      done();
    });

    // render the dialog component
    fixture.detectChanges();

    // give the service time to subscribe to the dialog hide call.
    setTimeout(() => {

      const cancelButton = fixture.debugElement.query(By.css('.mdl-datepicker-cancel-button')).nativeElement;
      expect(cancelButton.textContent).toBe('Cancel');

      const okButton = fixture.debugElement.query(By.css('.mdl-datepicker-ok-button')).nativeElement;
      expect(okButton.textContent).toBe('Ok');
      okButton.click();

    });

  });

  it('should open the date picker dialog with a provided date', () => {
    const fixture = TestBed.createComponent(MdlTestComponent);

    const service: MdlDatePickerService = TestBed.inject(MdlDatePickerService);
    service.selectDate(moment('2017-01-01').toDate());

    // render the dialog component
    fixture.detectChanges();

    const yearEl = fixture.debugElement.query(By.css('.mdl-datepicker-header-year')).nativeElement;
    expect(yearEl.textContent).toBe('2017');

    const dayEl = fixture.debugElement.query(By.css('.mdl-datepicker-header-day-month')).nativeElement;
    expect(dayEl.textContent).toBe('Sun, Jan 01');

  });

  it('should open the date picker dialog with a ok and cancel label', () => {
    const fixture = TestBed.createComponent(MdlTestComponent);

    const service: MdlDatePickerService = TestBed.inject(MdlDatePickerService);
    service.selectDate(null, {okLabel: '1', cancelLabel: '2'});

    // render the dialog component
    fixture.detectChanges();


    const cancelButton = fixture.debugElement.query(By.css('.mdl-datepicker-cancel-button')).nativeElement;
    expect(cancelButton.textContent).toBe('2');

    const okButton = fixture.debugElement.query(By.css('.mdl-datepicker-ok-button')).nativeElement;
    expect(okButton.textContent).toBe('1');

  });

});
