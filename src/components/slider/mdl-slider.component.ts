import {
  Component,
  Input,
  forwardRef,
  Provider,
  ViewChild,
  Renderer, ElementRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/common';
import { noop } from './../common/mdl-internal-commons';

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlSliderComponent),
  multi: true
});

@Component({
  selector: 'mdl-slider',
  providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
  host: {
    '[class.mdl-slider__container]': 'true',
    '(mouseup)': 'onMouseUp($event)',
  },
  template: `
    <input class="mdl-slider is-upgraded" 
            type="range" 
            [min]="min" 
            [max]="max" 
            [(ngModel)]="value" 
            tabindex="0"
            #input>
    <div class="mdl-slider__background-flex">
      <div class="mdl-slider__background-lower" #lower></div>
      <div class="mdl-slider__background-upper" #uppper></div>
  </div>
  `
})
export class MdlSliderComponent implements ControlValueAccessor {
  private _value:any;

  @Input() min:number;
  @Input() max:number;
  @ViewChild('lower') lowerEl:ElementRef;
  @ViewChild('uppper') upperEl:ElementRef;
  @ViewChild('input') inputEl:ElementRef;

  constructor(private renderer:Renderer){
  }

  get value(): any { return this._value; };
  @Input() set value(v: any) {
    this._value = v;
    this.updateSliderUI();
    this.onChangeCallback(v);
  }

  writeValue(value: number): void {
    this._value = value;
    this.updateSliderUI();
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_:any) => void = noop;

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void{
    this.onTouchedCallback = fn;
  }

  updateSliderUI(){
    var fraction = (this._value - this.min) / (this.max - this.min);

    this.renderer.setElementClass(this.inputEl.nativeElement, 'is-lowest-value', fraction === 0)

    this.renderer.setElementStyle(this.lowerEl.nativeElement, 'flex', ''+fraction);
    this.renderer.setElementStyle(this.upperEl.nativeElement, 'flex', ''+(1 - fraction));
  }

  onMouseUp(event){
    event.target.blur();
  }
}


export const MDL_SLIDER_DIRECTIVES = [MdlSliderComponent];
