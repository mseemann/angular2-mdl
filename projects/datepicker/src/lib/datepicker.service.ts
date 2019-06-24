import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MdlDialogReference, MdlDialogService} from '@angular-mdl/core';
import {CURRENT_DATE, DATEPICKER_CONFIG, DatePickerDialogComponent} from './datepicker.component';
import {DatePickerOptions} from './date-picker-option';


@Injectable()
export class MdlDatePickerService {

  constructor(private dialogService: MdlDialogService) {
  }

  public selectDate(currentDate: Date = null, options: DatePickerOptions = {}): Observable<Date> {
    const subject = new Subject<Date>();

    const pDialog = this.dialogService.showCustomDialog({
      classes: 'mdl-datepicker',
      component: DatePickerDialogComponent,
      providers: [
        {provide: CURRENT_DATE, useValue: currentDate},
        {provide: DATEPICKER_CONFIG, useValue: options}
      ],
      isModal: true,
      styles: {width: '320px'},
      openFrom: options.openFrom
    });
    pDialog.subscribe((dialogReference: MdlDialogReference) => {
      dialogReference.onHide().subscribe((date: Date) => {
        subject.next(date);
        subject.complete();
      });
    });

    return subject.asObservable();
  }
}
