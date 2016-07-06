import {
  Component,
  Input,
  forwardRef,
  Provider,
  ViewChild,
  Renderer,
  ElementRef
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
  private value_: any;

  @Input() public min: number;
  @Input() public max: number;
  @ViewChild('lower') private lowerEl: ElementRef;
  @ViewChild('uppper') private upperEl: ElementRef;
  @ViewChild('input') private inputEl: ElementRef;

  constructor(private renderer: Renderer) {
  }

  get value(): any { return this.value_; };
  @Input() set value(v: any) {
    this.value_ = v;
    this.updateSliderUI();
    this.onChangeCallback(v);
  }

  public writeValue(value: number): void {
    this.value_ = value;
    this.updateSliderUI();
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private updateSliderUI() {
    var fraction = (this.value_ - this.min) / (this.max - this.min);

    this.renderer.setElementClass(this.inputEl.nativeElement, 'is-lowest-value', fraction === 0);

    this.renderer.setElementStyle(this.lowerEl.nativeElement, 'flex', '' + fraction);
    this.renderer.setElementStyle(this.upperEl.nativeElement, 'flex', '' + (1 - fraction));
  }

  protected onMouseUp(event) {
    event.target.blur();
  }
}


export const MDL_SLIDER_DIRECTIVES = [MdlSliderComponent];
