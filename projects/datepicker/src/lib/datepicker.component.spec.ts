import {CURRENT_DATE, DATEPICKER_CONFIG, DatePickerDialogComponent} from './datepicker.component';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {MdlButtonModule, MdlDialogModule, MdlDialogReference, MdlIconModule, MdlRippleModule} from '@angular-mdl/core';
import {Subject} from 'rxjs';

import * as momentNs from 'moment';

// see https://github.com/ng-packagr/ng-packagr/issues/217
const moment = momentNs;

moment.locale('en');

class MdlDialogMockReference {
  // eslint-disable-next-line
  onVisible() {
    return new Subject<void>().asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  hide(date: Date) {
  }
}

describe('DatePickerDialogComponent', () => {


  let fixture: ComponentFixture<DatePickerDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlButtonModule,
        MdlIconModule,
        MdlRippleModule,
        MdlDialogModule.forRoot()
      ],
      declarations: [DatePickerDialogComponent],
      providers: [
        {provide: MdlDialogReference, useClass: MdlDialogMockReference},
        {provide: CURRENT_DATE, useValue: null},
        {provide: DATEPICKER_CONFIG, useValue: {}}
      ]
    });

    TestBed.compileComponents().then(() => {
      // LOOKS LIKE THE DEMO APP
      moment.updateLocale('en', {
        week: {
          dow: 1,
          doy: 4
        }
      });

      fixture = TestBed.createComponent(DatePickerDialogComponent);
      fixture.detectChanges();
    });
  }));

  it('should instantiate the component', () => {
    expect(fixture).toBeDefined();
  });

  it('should call hide with null on cancel', () => {
    const dialogRef: MdlDialogReference = TestBed.inject<MdlDialogReference>(MdlDialogReference);
    spyOn(dialogRef, 'hide');
    fixture.componentInstance.onCancel();
    expect(dialogRef.hide).toHaveBeenCalledWith(null);
  });

  it('should call hide with null on esc', () => {
    const dialogRef: MdlDialogReference = TestBed.inject<MdlDialogReference>(MdlDialogReference);
    spyOn(dialogRef, 'hide');
    fixture.componentInstance.onEsc();
    expect(dialogRef.hide).toHaveBeenCalledWith(null);
  });

  it('should call hide with actual date on ok', () => {
    const dialogRef: MdlDialogReference = TestBed.inject<MdlDialogReference>(MdlDialogReference);
    spyOn(dialogRef, 'hide');
    fixture.componentInstance.onOk();
    expect(dialogRef.hide).toHaveBeenCalledWith(fixture.componentInstance.mDate.toDate());
  });

  it('should show the current date - because we did not provide a date', () => {
    expect(fixture.componentInstance.mDate.isSame(moment(), 'day')).toBeTruthy();
    expect(fixture.componentInstance.mCurrentMonth.isSame(fixture.componentInstance.mDate, 'day')).toBeTruthy();
  });

  it('should be possible to set a specific date', waitForAsync(() => {
    fixture.componentInstance.setCurrentDay(moment('2017-01-01'));
    expect(fixture.componentInstance.mDate.isSame(moment('2017-01-01'), 'day')).toBeTruthy();
  }));

  it('should be possible to go to the next month', () => {
    fixture.componentInstance.mCurrentMonth = moment('2017-01-01');
    fixture.componentInstance.nextMonth();

    expect(fixture.componentInstance.mCurrentMonth.isSame(moment('2017-02-01'), 'month')).toBeTruthy();

    // but this should not change the actual date
    expect(fixture.componentInstance.mDate.isSame(moment(), 'day')).toBeTruthy();
  });

  it('should be possible to go to the prev month', () => {
    fixture.componentInstance.mCurrentMonth = moment('2017-01-01');
    fixture.componentInstance.prevMonth();

    expect(fixture.componentInstance.mCurrentMonth.isSame(moment('2016-12-01'), 'month')).toBeTruthy();

    // but this should not change the actual date
    expect(fixture.componentInstance.mDate.isSame(moment(), 'day')).toBeTruthy();
  });

  it('should create an array with the week days for dow=1 locale', () => {
    fixture.componentInstance.mCurrentMonth = moment('2017-01-01');
    expect(fixture.componentInstance.monthGridWeekDays).toEqual(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
  });

  it('should create an array with all days for the current month', () => {


    fixture.componentInstance.mDate = moment('2017-04-10');
    fixture.componentInstance.mCurrentMonth = moment('2017-04-01');

    const gridWithDays = fixture.componentInstance.monthGridDays;

    // the first date should be 2017/3/25 - e.g. not the current month and not the actual date
    const day1 = gridWithDays[0].days[0];
    expect(day1.day.isSame(moment('2017-03-27'), 'day')).toBeTruthy('should be the 2017-03-27');
    expect(fixture.componentInstance.isActualDate(day1.day)).toBeFalsy('first day is not the actual');
    expect(day1.isCurrentMonth).toBeFalsy('first day is not in the current month');

    // the third week the 2snd day ist 2017-04-10
    const dayActual = gridWithDays[2].days[0];
    expect(dayActual.day.isSame(moment('2017-04-10'), 'day')).toBeTruthy('should be 2017-04-10');
    expect(fixture.componentInstance.isActualDate(dayActual.day)).toBeTruthy('the 10. is the actual day');
    expect(dayActual.isCurrentMonth).toBeTruthy('the 10 is in the current month');

    const lastDayOfTheMonth = gridWithDays[4].days[6];
    expect(lastDayOfTheMonth.day.isSame(moment('2017-04-30'), 'day')).toBeTruthy('should be 2017-04-30');
    expect(fixture.componentInstance.isActualDate(lastDayOfTheMonth.day)).toBeFalsy('30. is not the actual day');
    expect(lastDayOfTheMonth.isCurrentMonth).toBeTruthy('the 30 is in the current month');
  });


  it('should create an array with all days for the december 2018', () => {
    fixture.componentInstance.mCurrentMonth = moment('2018-12-01');

    const gridWithDays = fixture.componentInstance.monthGridDays;

    const day1 = gridWithDays[0].days[0];
    expect(day1.day.isSame(moment('2018-11-26'), 'day')).toBeTruthy('should be the 2018-11-26');

    const lastDayOfTheMonth = gridWithDays[5].days[0];
    expect(lastDayOfTheMonth.day.isSame(moment('2018-12-31'), 'day')).toBeTruthy('should be 2018-12-31');
  });

});
