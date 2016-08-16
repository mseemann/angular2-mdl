import {
  Component,
  ElementRef,
  Provider,
  Renderer,
  forwardRef,
  Input,
  NgModule
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';


const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlRadioComponent),
  multi: true
});

const IS_FOCUSED = 'is-focused';

/*
 <mdl-radio name="group1" value="1" [(ngModel)]="radioOption">Value 1</mdl-radio>
 */

@Component({
  selector: 'mdl-radio',
  providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
  host: {
    '(click)': 'onClick()',
    '[class.mdl-radio]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.is-checked]': 'optionValue === value'
  },
  template: `
  <input type="radio" class="mdl-radio__button" 
    name="{{name}}"
    (focus)="onFocus()" 
    (blur)="onBlur()"
    [(ngModel)]="checked">
  <span class="mdl-radio__label"><ng-content></ng-content></span>
  <span class="mdl-radio__outer-circle"></span>
  <span class="mdl-radio__inner-circle"></span>
  `
})
export class MdlRadioComponent implements ControlValueAccessor {

  @Input() public name: string;
  @Input() public value: any;
  @Input() public optionValue: any;

  private el: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.el = elementRef.nativeElement;
  }

  public writeValue(optionValue: any): void {
    this.optionValue = optionValue;
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
  }

  protected onClick() {
    this.optionValue = this.value;
    this.onChangeCallback(this.value);
  }
}


/** @deprecated */
export const MDL_RADIO_DIRECTIVES = [MdlRadioComponent];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: MDL_RADIO_DIRECTIVES,
  declarations: MDL_RADIO_DIRECTIVES,
})
export class MdlRadioModule {}
