import {
  Component,
  ElementRef,
  EventEmitter,
  Renderer,
  forwardRef,
  NgModule,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BooleanProperty } from './../common/boolean-property'

const noop = (_?: any) => {};
const IS_FOCUSED = 'is-focused';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdlCheckboxComponent),
  multi: true
};

@Component({
  selector: 'mdl-checkbox',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  host: {
    '(click)': 'onClick()',
    '[class.mdl-checkbox]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.is-checked]': 'value',
    '[class.is-disabled]': 'disabled'
  },
  template: `
  <input type="checkbox" class="mdl-checkbox__input" 
    (focus)="onFocus()" 
    (blur)="onBlur()"
    [disabled]="disabled"
    [ngModel]="value">
  <span class="mdl-checkbox__label"><ng-content></ng-content></span>
  <span class="mdl-checkbox__focus-helper"></span>
  <span class="mdl-checkbox__box-outline">
    <span class="mdl-checkbox__tick-outline"></span>
  </span>
  `,
  inputs: ['value'],
  outputs: ['change'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdlCheckboxComponent implements ControlValueAccessor {

  @Input() @BooleanProperty() public disabled = false;

  private change: EventEmitter<boolean> = new EventEmitter<boolean>();

  private value_: boolean = false;

  private el: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.el = elementRef.nativeElement;
  }

  get value(): boolean { return this.value_; };
  set value(v: boolean) {
    this.value_ = v;
    this.onChangeCallback(v);
    this.change.emit(v);
  }

  public writeValue(value: any): void {
    this.value_ = value;
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected onFocus() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, true);
  }

  protected onBlur() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, false);
    this.onTouchedCallback();
  }

  protected onClick() {
    if (this.disabled) {
      return;
    }
    this.value = !this.value;
  }
}


const MDL_CHECKBOX_DIRECTIVES = [MdlCheckboxComponent];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: MDL_CHECKBOX_DIRECTIVES,
  declarations: MDL_CHECKBOX_DIRECTIVES,
})
export class MdlChekboxModule {}
