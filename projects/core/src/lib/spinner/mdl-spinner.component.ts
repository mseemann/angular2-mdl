import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {toBoolean} from '../common/boolean-property';

@Component({
  selector: 'mdl-spinner',
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
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlSpinnerComponent {

  @HostBinding('class.mdl-spinner')
  isSpinner = true;

  @HostBinding('class.is-upgraded')
  isUpgraded = true;

  layers = [1, 2, 3, 4];
  private activeIntern = false;
  private singleColorIntern = false;

  @HostBinding('class.is-active')
  @Input()
  get active(): boolean {
    return this.activeIntern;
  }

  set active(value: boolean) {
    this.activeIntern = toBoolean(value);
  }

  @HostBinding('class.mdl-spinner--single-color')
  @Input('single-color')
  get singleColor(): boolean {
    return this.singleColorIntern;
  }

  set singleColor(value: boolean) {
    this.singleColorIntern = toBoolean(value);
  }

}
