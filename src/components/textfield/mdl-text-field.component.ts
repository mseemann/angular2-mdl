import {
  Component,
  Provider,
  forwardRef,
  Input,
  Renderer,
  ElementRef,
  OnChanges,
  DoCheck,
  ViewChild
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/common';

import { noop } from './../common/mdl-internal-commons';
import { BooleanProperty } from './../common/boolean-property';

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlTextFieldComponent),
  multi: true
});

const IS_FOCUSED = 'is-focused';
const IS_DISABLED = 'is-disabled';
const IS_INVALID = 'is-invalid';
const IS_DIRTY = 'is-dirty';

@Component({
  selector: 'mdl-text-field',
  host: {
    '[class.mdl-textfield]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.mdl-textfield--floating-label]': 'isFloatingLabel',
    '[class.has-placeholder]': 'placeholder'
  },
  template: `
   <input 
      #input
      class="mdl-textfield__input" 
      type="{{type}}" 
      [pattern]="pattern ? pattern : '.*'"
      [placeholder]="placeholder ? placeholder : ''"
      (focus)="onFocus()" 
      (blur)="onBlur()"
      [(ngModel)]="value"
      [disabled]="disabled">
   <label class="mdl-textfield__label">{{label}}</label>
   <span class="mdl-textfield__error">{{errorMessage}}</span>
   `,
  providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MdlTextFieldComponent implements ControlValueAccessor, OnChanges, DoCheck {
  private value_: any;
  private el: HTMLElement;

  @ViewChild('input') private inputEl: ElementRef;

  get value(): any { return this.value_; };
  @Input() set value(v: any) {
    this.value_ = v;
    this.onChangeCallback(v);
  }

  @Input() public type;
  @Input() public label;
  @Input() public pattern;
  @Input('error-msg') public errorMessage;
  @Input() @BooleanProperty() public disabled = false;
  @Input('floating-label') @BooleanProperty() public isFloatingLabel = false;
  @Input() public placeholder: string;

  constructor(private renderer: Renderer, private elmRef: ElementRef) {
    this.el = elmRef.nativeElement;
  }

  public writeValue(value: any): void {
    this.value_ = value;
    this.checkDirty();
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public ngOnChanges() {
    this.checkDisabled();
  }

  public ngDoCheck() {
    this.checkValidity();
    this.checkDirty();
  }

  protected onFocus() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, true);
  }

  protected onBlur() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, false);
    this.onTouchedCallback();
  }

  private checkDisabled() {
    this.renderer.setElementClass(this.el, IS_DISABLED, this.disabled);
  }

  private checkValidity() {
    if (this.inputEl.nativeElement.validity) {
      this.renderer.setElementClass(this.el, IS_INVALID, !this.inputEl.nativeElement.validity.valid);
    }
  }

  private checkDirty() {
    let dirty = this.inputEl.nativeElement.value && this.inputEl.nativeElement.value.length > 0;
    this.renderer.setElementClass(this.el, IS_DIRTY, dirty);
  }
}

export const MDL_TEXT_FIELD_DIRECTIVES = [MdlTextFieldComponent];
