import {Component, Input, ViewEncapsulation} from '@angular/core';
import {toBoolean} from '../common/boolean-property';

@Component({
  selector: 'mdl-spinner',
  host: {
    '[class.mdl-spinner]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.is-active]': 'active',
    '[class.mdl-spinner--single-color]': 'singleColor',
  },
  // must be one line - otherwise the spinner is broken in the ui
  /* tslint:disable */
  template: `
    <div *ngFor="let layer of layers;"
         class="mdl-spinner__layer mdl-spinner__layer-{{layer}}">
      <div class="mdl-spinner__circle-clipper mdl-spinner__left">
        <div class="mdl-spinner__circle"></div>
      </div>
      <div class="mdl-spinner__gap-patch">
        <div class="mdl-spinner__circle"></div>
      </div>
      <div class="mdl-spinner__circle-clipper mdl-spinner__right">
        <div class="mdl-spinner__circle"></div>
      </div>
    </div>
  `
  /* tslint:enable */,
  encapsulation: ViewEncapsulation.None
})
export class MdlSpinnerComponent {
  public layers = [1, 2, 3, 4];

  private activeIntern = false;
  private singleColorIntern = false;

  @Input()
  get active() {
    return this.activeIntern;
  }

  set active(value) {
    this.activeIntern = toBoolean(value);
  }

  @Input('single-color')
  get singleColor() {
    return this.singleColorIntern;
  }

  set singleColor(value) {
    this.singleColorIntern = toBoolean(value);
  }

}
