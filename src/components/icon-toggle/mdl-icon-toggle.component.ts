import {
  Component,
  ElementRef,
  Provider,
  Renderer,
  forwardRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR as DEPRECATED_NG_VALUE_ACCESSOR
} from '@angular/common';
import {
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MdlIconComponent } from './../icon/mdl-icon.component';
import { MdlCheckboxComponent } from './../checkbox/mdl-checkbox.component';

const DEPRECATED_MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(DEPRECATED_NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlIconToggleComponent),
  multi: true
});

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlIconToggleComponent),
  multi: true
});


@Component({
  selector: 'mdl-icon-toggle',
  providers: [DEPRECATED_MD_INPUT_CONTROL_VALUE_ACCESSOR, MD_INPUT_CONTROL_VALUE_ACCESSOR],
  host: {
    '(click)': 'onClick()',
    '[class.mdl-icon-toggle]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.is-checked]': 'value'
  },
  template: `
  <input type="checkbox" class="mdl-icon-toggle__input" 
    (focus)="onFocus()" 
    (blur)="onBlur()"
    [(ngModel)]="value">
  <mdl-icon class="mdl-icon-toggle__label"><ng-content></ng-content></mdl-icon>
  `,
  directives: [MdlIconComponent]
})
export class MdlIconToggleComponent extends MdlCheckboxComponent {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer);
  }

}



export const MDL_ICON_TOGGLE_DIRECTIVES = [MdlIconToggleComponent];
