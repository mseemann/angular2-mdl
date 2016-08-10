import {
  Component,
  ElementRef,
  Provider,
  Renderer,
  forwardRef,
  NgModule
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR as DEPRECATED_NG_VALUE_ACCESSOR
} from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  FormsModule
} from '@angular/forms';
import { MdlCheckboxComponent } from './../checkbox/mdl-checkbox.component';
import { CommonModule } from '@angular/common';

const DEPRECATED_MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(DEPRECATED_NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlSwitchComponent),
  multi: true
});
const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlSwitchComponent),
  multi: true
});

@Component({
  selector: 'mdl-switch',
  providers: [DEPRECATED_MD_INPUT_CONTROL_VALUE_ACCESSOR, MD_INPUT_CONTROL_VALUE_ACCESSOR],
  host: {
    '(click)': 'onClick()',
    '[class.mdl-switch]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.is-checked]': 'value'
  },
  template: `
    <input type="checkbox" class="mdl-switch__input" 
      (focus)="onFocus()" 
      (blur)="onBlur()"
      [(ngModel)]="value">
    <span class="mdl-switch__label"><ng-content></ng-content></span>
    <div class="mdl-switch__track"></div>
    <div class="mdl-switch__thumb"><span class="mdl-switch__focus-helper"></span></div>
  `
})
export class MdlSwitchComponent extends MdlCheckboxComponent {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer);
  }

}

/** @deprecated */
export const MDL_SWITCH_DIRECTIVES = [MdlSwitchComponent];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: MDL_SWITCH_DIRECTIVES,
  declarations: MDL_SWITCH_DIRECTIVES,
})
export class MdlSwitchModule {}
