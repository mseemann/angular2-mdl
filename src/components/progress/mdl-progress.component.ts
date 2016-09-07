import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  NgModule,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { BooleanProperty } from './../common/boolean-property';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mdl-progress',
  host: {
    '[class.mdl-progress]': 'true',
    '[class.mdl-progress__indeterminate]': 'indeterminate===true'
  },
  template: `
    <div class="progressbar bar bar1" [style.width]="progress + '%'"></div>
    <div class="bufferbar bar bar2" [style.width]="buffer + '%'"></div>
    <div class="auxbar bar bar3" [ngStyle]="{'width': aux+'%'}"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdlProgressComponent implements OnChanges {
  @Input() public progress = 0;
  @Input() public buffer = 100;
  @Input() public aux = 0;

  @Input() @BooleanProperty() public indeterminate: boolean;

  public ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    if (changes['buffer']) {
      this.setBuffer(changes['buffer'].currentValue);
    }
  }

  private setBuffer(b: number) {
    this.aux = 100 - b;
  }

}

const MDL_PROGRESS_DIRECTIVES = [MdlProgressComponent];

@NgModule({
  imports: [CommonModule],
  exports: MDL_PROGRESS_DIRECTIVES,
  declarations: MDL_PROGRESS_DIRECTIVES,
})
export class MdlProgressModule {}
