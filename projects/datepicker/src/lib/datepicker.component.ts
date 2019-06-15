import {Component, HostListener, Inject, InjectionToken, ViewChild, ViewEncapsulation} from '@angular/core';
import {MdlButtonComponent, MdlDialogReference} from '@angular-mdl/core';
import * as momentNs from 'moment';
import {DatePickerOptions} from './datepicker.service';
// see https://github.com/ng-packagr/ng-packagr/issues/217
const moment = momentNs;

export const CURRENT_DATE = new InjectionToken<Date>('current-date');
export const DATEPICKER_CONFIG = new InjectionToken<DatePickerOptions>('datepicker-options');

@Component({
  // tslint:disable-next-line
  selector: 'datepicker',
  templateUrl: 'datepicker.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DatePickerDialogComponent {

  @ViewChild('okButton', {static: false}) public okButton: MdlButtonComponent;

  public okLabel: string;
  public cancelLabel: string;

  public mDate: momentNs.Moment;
  public prevEnabled = true;
  public nextEnabled = true;
  public monthGridWeekDays: string[];
  public monthGridDays: any[];
  private pmCurrentMonth: momentNs.Moment;

  constructor(
    private dialog: MdlDialogReference,
    @Inject(CURRENT_DATE) private initialDate: Date,
    @Inject(DATEPICKER_CONFIG) private options: DatePickerOptions) {

    this.mDate = moment(initialDate || new Date());
    this.mCurrentMonth = this.mDate.clone();

    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');

    this.monthGridWeekDays = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      this.monthGridWeekDays.push(moment.weekdaysMin(day.day()));
      day = day.clone().add(1, 'd');
    }


    this.okLabel = options.okLabel || 'Ok';
    this.cancelLabel = options.cancelLabel || 'Cancel';

    dialog.onVisible().subscribe(() => {
      this.okButton.elementRef.nativeElement.focus();
    });
  }

  get mCurrentMonth() {
    return this.pmCurrentMonth;
  }

  set mCurrentMonth(m) {
    this.pmCurrentMonth = m;
    this.calculateMonthGrid();
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialog.hide(this.initialDate);
  }

  public onOk() {
    this.dialog.hide(this.mDate.toDate());
  }

  public onCancel() {
    this.dialog.hide(this.initialDate);
  }

  public prevMonth() {
    this.mCurrentMonth = this.mCurrentMonth.subtract(1, 'months');
  }

  public nextMonth() {
    this.mCurrentMonth = this.mCurrentMonth.add(1, 'months');
  }

  public isActualDate(day: momentNs.Moment): boolean {
    return this.mDate.isSame(day, 'day');
  }

  public setCurrentDay(day: momentNs.Moment) {
    this.mDate = day;
  }

  private calculateMonthGrid() {
    const startDateOfMonth = this.mCurrentMonth.clone().startOf('month').clone();
    const startWeek = startDateOfMonth.week();
    const endWeek = this.mCurrentMonth.clone().endOf('month').week();

    // caveat year switch
    // 52 - 5
    // 48 - 1
    // console.log(startWeek, endWeek);

    this.monthGridDays = [];
    let week = startWeek;

    this.monthGridDays.push(this.createMonthRow(startDateOfMonth, week));

    do {
      const firstDayInWeek = startDateOfMonth.add(1, 'week');
      week = firstDayInWeek.week();
      this.monthGridDays.push(this.createMonthRow(firstDayInWeek.clone(), week));
    } while (week !== endWeek);
  }

  private createMonthRow(mDate: any, week: number) {
    const startWeek = mDate.week(week).startOf('week');
    return {
      week,
      days: Array(7).fill(0).map((n, i) => {
        const mDay = startWeek.clone().add(i, 'day');
        return {
          day: mDay,
          isCurrentMonth: this.isCurrentMonth(mDay)
        };
      })
    };
  }

  private isCurrentMonth(day: momentNs.Moment): boolean {
    return this.mCurrentMonth.isSame(day, 'month');
  }
}
