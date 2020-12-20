import { Component } from "@angular/core";
import { MdlDatePickerService } from "@angular-mdl/datepicker";
import * as moment from "moment";
import "moment/locale/en-gb";
import { AbstractDemoComponent } from "../abstract-demo.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";

@Component({
  selector: "demo-date-picker",
  templateUrl: "./date-picker.component.html",
  animations: [flyInOutTrigger],
  styleUrls: ["./date-picker.component.scss"],
})
export class DatePickerComponent extends AbstractDemoComponent {
  // eslint-disable-next-line
  public selectedDate: any;

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title,
    private datePicker: MdlDatePickerService
  ) {
    super(router, route, titleService);
  }

  public pickADate($event: MouseEvent): void {
    this.datePicker
      .selectDate(this.selectedDate as Date, { openFrom: $event })
      .subscribe((selectedDate: Date) => {
        this.selectedDate = selectedDate ? moment(selectedDate) : null;
      });
  }
}
