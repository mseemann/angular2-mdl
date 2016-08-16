import {
  Component,
  ElementRef,
  Provider,
  Renderer,
  forwardRef,
  NgModule,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor, FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlCheckboxComponent),
  multi: true
});

const IS_FOCUSED = 'is-focused';

@Component({
  selector: 'mdl-checkbox',
  providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
  host: {
    '(click)': 'onClick()',
    '[class.mdl-checkbox]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.is-checked]': 'value'
  },
  template: `
  <input type="checkbox" class="mdl-checkbox__input" 
    (focus)="onFocus()" 
    (blur)="onBlur()"
    [ngModel]="value">
  <span class="mdl-checkbox__label"><ng-content></ng-content></span>
  <span class="mdl-checkbox__focus-helper"></span>
  <span class="mdl-checkbox__box-outline">
    <span class="mdl-checkbox__tick-outline"></span>
  </span>
  `,
  inputs: ['value'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdlCheckboxComponent implements ControlValueAccessor {

  private value_: boolean = false;

  private el: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.el = elementRef.nativeElement;
  }

  get value(): boolean { return this.value_; };
  set value(v: boolean) {
    this.value_ = v;
    if (this.onChangeCallback ) {
      this.onChangeCallback(v);
    }

  }

  public writeValue(value: any): void {
    this.value_ = value;
  }

  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  protected onFocus() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, true);
  }

  protected onBlur() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, false);
    this.onTouchedCallback();
  }

  protected onClick() {
    this.value = !this.value;
  }
}


/** @deprecated */
export const MDL_CHECKBOX_DIRECTIVES = [MdlCheckboxComponent];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: MDL_CHECKBOX_DIRECTIVES,
  declarations: MDL_CHECKBOX_DIRECTIVES,
})
export class MdlChekboxModule {}
