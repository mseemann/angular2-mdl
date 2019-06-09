import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  NgModule,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ModuleWithProviders
} from '@angular/core';
import { toBoolean } from '../common/boolean-property';
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

  private _indeterminate: boolean = false;
  @Input()
  get indeterminate() { return this._indeterminate; }
  set indeterminate(value) { this._indeterminate = toBoolean(value); }

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
export class MdlProgressModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlProgressModule,
      providers: []
    };
  }
}
