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

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlCheckboxComponent),
  multi: true
});

const noop = () => {};

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
    [(ngModel)]="value">
  <span class="mdl-checkbox__label"><ng-content></ng-content></span>
  <span class="mdl-checkbox__focus-helper"></span>
  <span class="mdl-checkbox__box-outline">
    <span class="mdl-checkbox__tick-outline"></span>
  </span>
  `
})
export class MdlCheckboxComponent implements ControlValueAccessor {

  private _value: boolean = false;

  private el:HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer){
    this.el = elementRef.nativeElement;
  }

  get value(): boolean { return this._value; };
  @Input() set value(v: boolean) {
    this._value = v;
    this.onChangeCallback(v);
  }

  writeValue(value: any): void {
    this._value = value;
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_:any) => void = noop;

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void{
    this.onTouchedCallback = fn;
  }

  onFocus(){
    this.renderer.setElementClass(this.el, IS_FOCUSED, true);
  }

  onBlur(){
    this.renderer.setElementClass(this.el, IS_FOCUSED, false);
    this.onTouchedCallback();
  }

  onClick(){
    this.value = !this.value;
  }
}



export const MDL_CHECKBOX_DIRECTIVES = [MdlCheckboxComponent];
