import {
  Component,
  Input,
  OnChanges,
  SimpleChange
} from '@angular/core';

@Component({
  selector: 'mdl-progress',
  host: {
    '[class.mdl-progress]': 'true',
    '[class.mdl-progress__indeterminate]': 'indeterminate==="" || indeterminate===true'
  },
  template: `
    <div class="progressbar bar bar1" [style.width]="progress + '%'"></div>
    <div class="bufferbar bar bar2" [style.width]="buffer + '%'"></div>
    <div class="auxbar bar bar3" [ngStyle]="{'width': aux+'%'}"></div>
  `

})
export class MdlProgressComponent implements OnChanges {
  @Input() public progress = 0;
  @Input() public buffer = 100;
  @Input() public aux = 0;

  @Input() public indeterminate: boolean | string;

  public ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    if (changes['buffer']) {
      this.setBuffer(changes['buffer'].currentValue);
    }
  }

  private setBuffer(b: number) {
    this.aux = 100 - b;
  }

}

export const MDL_PROGRESS_DIRECTIVES = [MdlProgressComponent];
