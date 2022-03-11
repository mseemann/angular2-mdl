import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import { toBoolean } from "../common/boolean-property";

@Component({
  selector: "mdl-progress",
  template: `
    <div class="progressbar bar bar1" [style.width]="progress + '%'"></div>
    <div class="bufferbar bar bar2" [style.width]="buffer + '%'"></div>
    <div class="auxbar bar bar3" [ngStyle]="{ width: aux + '%' }"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdlProgressComponent implements OnChanges {
  @Input() progress = 0;
  @Input() buffer = 100;
  @Input() aux = 0;

  @HostBinding("class.mdl-progress")
  isProgess = true;

  private indeterminateIntern = false;

  @HostBinding("class.mdl-progress__indeterminate")
  @Input()
  get indeterminate(): boolean {
    return this.indeterminateIntern;
  }

  set indeterminate(value: boolean) {
    this.indeterminateIntern = toBoolean(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["buffer"]) {
      this.setBuffer(changes["buffer"].currentValue);
    }
  }

  private setBuffer(b: number) {
    this.aux = 100 - b;
  }
}
