import {
  Component,
  Input,
  NgModule
} from '@angular/core';
import { BooleanProperty } from './../common/boolean-property';
import { CommonModule } from '@angular/common';

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
      </div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div>
    </div>
  `
  /* tslint:enable */
})
export class MdlSpinnerComponent {
  protected layers = [1, 2, 3, 4];

  @Input() @BooleanProperty() public active: boolean;
  @Input('single-color') @BooleanProperty() public singleColor: boolean;

}

const MDL_SPINNER_DIRECTIVES = [MdlSpinnerComponent];

@NgModule({
  imports: [CommonModule],
  exports: MDL_SPINNER_DIRECTIVES,
  declarations: MDL_SPINNER_DIRECTIVES,
})
export class MdlSpinnerModule {}
