import {
  Component,
  ElementRef,
  forwardRef,
  NgModule,
  ViewEncapsulation,
  ModuleWithProviders,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  FormsModule
} from '@angular/forms';
import { MdlIconModule } from '../icon/mdl-icon.component';
import { MdlCheckboxComponent } from '../checkbox/mdl-checkbox.component';

@Component({
  selector: 'mdl-icon-toggle',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdlIconToggleComponent),
    multi: true }],
  host: {
    '(click)': 'onClick()',
    '[class.mdl-icon-toggle]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.is-checked]': 'value',
    '[class.is-disabled]': 'disabled'
  },
  outputs: ['change'],
  template: `
  <input type="checkbox" class="mdl-icon-toggle__input" 
    (focus)="onFocus()" 
    (blur)="onBlur()"
    [disabled]="disabled"
    [(ngModel)]="value">
  <mdl-icon class="mdl-icon-toggle__label"><ng-content></ng-content></mdl-icon>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlIconToggleComponent extends MdlCheckboxComponent {

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer);
  }

}

const MDL_ICON_TOGGLE_DIRECTIVES = [MdlIconToggleComponent];

@NgModule({
  imports: [ MdlIconModule, CommonModule, FormsModule],
  exports: MDL_ICON_TOGGLE_DIRECTIVES,
  declarations: MDL_ICON_TOGGLE_DIRECTIVES,
})
export class MdlIconToggleModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlIconToggleModule,
      providers: []
    };
  }
}
