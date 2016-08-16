import {
  Component,
  ElementRef,
  Provider,
  Renderer,
  forwardRef,
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  FormsModule
} from '@angular/forms';
import { MdlIconModule } from './../icon/mdl-icon.component';
import { MdlCheckboxComponent } from './../checkbox/mdl-checkbox.component';

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlIconToggleComponent),
  multi: true
});


@Component({
  selector: 'mdl-icon-toggle',
  providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
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
})
export class MdlIconToggleComponent extends MdlCheckboxComponent {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer);
  }

}


/** @deprecated */
export const MDL_ICON_TOGGLE_DIRECTIVES = [MdlIconToggleComponent];

@NgModule({
  imports: [ MdlIconModule, CommonModule, FormsModule],
  exports: MDL_ICON_TOGGLE_DIRECTIVES,
  declarations: MDL_ICON_TOGGLE_DIRECTIVES,
})
export class MdlIconToggleModule {}
