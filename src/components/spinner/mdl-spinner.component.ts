import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'mdl-spinner',
  host: {
    '[class.mdl-spinner]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.is-active]': 'active==="" || active===true',
    '[class.mdl-spinner--single-color]': 'singleColor==="" || singleColor===true',
  },
  template: `
    <div *ngFor="let layer of layers;" class="mdl-spinner__layer mdl-spinner__layer-{{layer}}">
      <div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div>
    </div>
  `

})
export class MdlSpinnerComponent {
  layers = [1,2,3,4];

  @Input() active: boolean | string;
  @Input('single-color') singleColor: boolean | string;

}

export const MDL_SPINNER_DIRECTIVES = [MdlSpinnerComponent];
