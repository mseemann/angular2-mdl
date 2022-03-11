import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { toBoolean } from "../common/boolean-property";
import { noop } from "../common/noop";
import { callNative } from "../common/native-support";
import { toNumber } from "../common/number.property";

@Component({
  selector: "mdl-slider",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MdlSliderComponent),
      multi: true,
    },
  ],
  template: `
    <input
      class="mdl-slider is-upgraded"
      type="range"
      [min]="min"
      [max]="max"
      [step]="step"
      [(ngModel)]="value"
      [disabled]="disabled"
      tabindex="0"
      #input
    />
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
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MdlSliderComponent implements ControlValueAccessor, AfterViewInit {
  @Input()
  min: number | string | undefined;
  @Input()
  max: number | string | undefined;
  @Input()
  step: number | string | undefined;
  @ViewChild("lower", { static: true })
  lowerEl: ElementRef | undefined;
  @ViewChild("uppper", { static: true })
  upperEl: ElementRef | undefined;
  @ViewChild("input", { static: true })
  inputEl: ElementRef | undefined;
  @HostBinding("class.mdl-slider__container")
  isSliderContainer = true;
  private valueIntern: number | null | undefined;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: unknown) => void = noop;
  private disabledIntern = false;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  @Input()
  get disabled(): boolean {
    return this.disabledIntern;
  }

  set disabled(value: boolean) {
    this.disabledIntern = toBoolean(value);
  }

  get value(): number | string | undefined | null {
    return this.valueIntern;
  }

  @Input() set value(v: number | string | undefined | null) {
    this.valueIntern = toNumber(v);
    this.updateSliderUI();
    this.onChangeCallback(v);
  }

  @HostListener("mouseup", ["$event"])
  onMouseUp(event: MouseEvent): void {
    (event.target as HTMLElement).blur();
  }

  @HostListener("mousedown", ["$event"])
  onMouseDown(event: MouseEvent): void {
    if (event.target !== this.elRef.nativeElement) {
      return;
    }
    // Discard the original event and create a new event that
    // is on the slider element.
    event.preventDefault();
    const newEvent = new MouseEvent("mousedown", {
      relatedTarget: event.relatedTarget,
      button: event.button,
      buttons: event.buttons,
      clientX: event.clientX,
      clientY: this.inputEl?.nativeElement.getBoundingClientRect().y,
      screenX: event.screenX,
      screenY: event.screenY,
    });
    callNative(this.inputEl?.nativeElement, "dispatchEvent", newEvent);
  }

  ngAfterViewInit(): void {
    this.updateSliderUI();
  }

  writeValue(value: number): void {
    this.valueIntern = value;
    this.updateSliderUI();
  }

  registerOnChange(fn: () => unknown): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => unknown): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateSliderUI(): void {
    // if the input hat a static value (for example value="30"
    // the setvalue method is called before the ViewChilds are initialized
    // this has changed in Angular 9! :(
    const min = toNumber(this.min);
    const max = toNumber(this.max);
    if (
      !this.inputEl ||
      this.valueIntern == null ||
      max == null ||
      min == null
    ) {
      return;
    }
    const fraction = (this.valueIntern - min) / (max - min);

    if (fraction === 0) {
      this.renderer.addClass(this.inputEl.nativeElement, "is-lowest-value");
    } else {
      this.renderer.removeClass(this.inputEl.nativeElement, "is-lowest-value");
    }

    this.renderer.setStyle(this.lowerEl?.nativeElement, "flex", "" + fraction);
    this.renderer.setStyle(
      this.upperEl?.nativeElement,
      "flex",
      "" + (1 - fraction)
    );
  }
}
