import {
  Component,
  ElementRef,
  Provider,
  Renderer,
  forwardRef,
  Input
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/common';
import { MdlCheckboxComponent } from './../checkbox/mdl-checkbox.component';

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlSwitchComponent),
  multi: true
});


@Component({
  selector: 'mdl-switch',
  providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
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

  constructor(elementRef: ElementRef, renderer: Renderer){
    super(elementRef, renderer);
  }

}



export const MDL_SWITCH_DIRECTIVES = [MdlSwitchComponent];
