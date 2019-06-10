import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {toBoolean} from '../common/boolean-property';
import {noop} from '../common/noop';
import {callNative} from '../common/native-support';


@Component({
  selector: 'mdl-slider',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdlSliderComponent),
    multi: true
  }],
  template: `
    <input class="mdl-slider is-upgraded"
           type="range"
           [min]="min"
           [max]="max"
           [step]="step"
           [(ngModel)]="value"
           [disabled]="disabled"
           tabindex="0"
           #input>
    <div class="mdl-slider__background-flex">
      <div class="mdl-slider__background-lower" #lower></div>
      <div class="mdl-slider__background-upper" #uppper></div>
    </div>
  `,
  styles: [
      `
      :host {
        height: 22px;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class MdlSliderComponent implements ControlValueAccessor {
  @Input() public min: number;
  @Input() public max: number;
  @Input() public step: number;
  @ViewChild('lower', {static: true}) public lowerEl: ElementRef;
  @ViewChild('uppper', {static: true}) public upperEl: ElementRef;
  @ViewChild('input', {static: true}) public inputEl: ElementRef;
  @HostBinding('class.mdl-slider__container') isSliderContainer = true;
  private valueIntern: any;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private disabledIntern = false;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
  }

  @Input()
  get disabled(): boolean {
    return this.disabledIntern;
  }

  set disabled(value) {
    this.disabledIntern = toBoolean(value);
  }

  get value(): any {
    return this.valueIntern;
  }

  @Input() set value(v: any) {
    this.valueIntern = v;
    this.updateSliderUI();
    this.onChangeCallback(v);
  }

  public writeValue(value: number): void {
    this.valueIntern = value;
    this.updateSliderUI();
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp(event) {
    event.target.blur();
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent) {
    if (event.target !== this.elRef.nativeElement) {
      return;
    }
    // Discard the original event and create a new event that
    // is on the slider element.
    event.preventDefault();
    const newEvent = new MouseEvent('mousedown', {
      relatedTarget: event.relatedTarget,
      button: event.button,
      buttons: event.buttons,
      clientX: event.clientX,
      clientY: this.inputEl.nativeElement.getBoundingClientRect().y,
      screenX: event.screenX,
      screenY: event.screenY
    });
    callNative(this.inputEl.nativeElement, 'dispatchEvent', newEvent);
  }

  private updateSliderUI() {
    const fraction = (this.valueIntern - this.min) / (this.max - this.min);

    if (fraction === 0) {
      this.renderer.addClass(this.inputEl.nativeElement, 'is-lowest-value');
    } else {
      this.renderer.removeClass(this.inputEl.nativeElement, 'is-lowest-value');
    }

    this.renderer.setStyle(this.lowerEl.nativeElement, 'flex', '' + fraction);
    this.renderer.setStyle(this.upperEl.nativeElement, 'flex', '' + (1 - fraction));
  }
}
