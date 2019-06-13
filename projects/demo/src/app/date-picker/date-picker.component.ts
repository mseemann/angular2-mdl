import {Component} from '@angular/core';
import {MdlDatePickerService} from '@angular-mdl/datepicker';
import * as moment from 'moment';
import 'moment/locale/en-gb';

@Component({
  selector: 'demo-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {


  public selectedDate: any;

  constructor(private datePicker: MdlDatePickerService) {
  }

  public pickADate($event: MouseEvent) {
    this.datePicker.selectDate(this.selectedDate, {openFrom: $event}).subscribe((selectedDate: Date) => {
      this.selectedDate = selectedDate ? moment(selectedDate) : null;
    });
  }
}
