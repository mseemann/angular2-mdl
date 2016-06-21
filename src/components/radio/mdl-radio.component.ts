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
  useExisting: forwardRef(() => MdlRadioComponent),
  multi: true
});

const noop = () => {};

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

  @Input() name: string;
  @Input() value: any;
  @Input() private optionValue: any;

  private el:HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer){
    this.el = elementRef.nativeElement;
  }
  
  writeValue(optionValue: any): void {
    this.optionValue = optionValue;
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
  }

  onClick(){
    this.optionValue = this.value;
    this.onChangeCallback(this.value);
  }
}



export const MDL_RADIO_DIRECTIVES = [MdlRadioComponent];
