import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  Provider,
  Renderer2,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { toBoolean } from "../common/boolean-property";
import { noop } from "../common/noop";

const IS_FOCUSED = "is-focused";
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdlCheckboxComponent),
  multi: true,
};

@Component({
  selector: "mdl-checkbox",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  template: `
    <input
      type="checkbox"
      class="mdl-checkbox__input"
      (focus)="onFocus()"
      (blur)="onBlur()"
      [disabled]="disabled"
      [attr.tabindex]="tabindex"
      [ngModel]="value"
    />
    <span class="mdl-checkbox__label"><ng-content></ng-content></span>
    <span class="mdl-checkbox__focus-helper"></span>
    <span class="mdl-checkbox__box-outline">
      <span class="mdl-checkbox__tick-outline"></span>
    </span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdlCheckboxComponent implements ControlValueAccessor {
  @Input()
  tabindex: number = null;

  @Output()
  // eslint-disable-next-line  @angular-eslint/no-output-native
  change: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding("class.mdl-checkbox")
  isCheckbox = true;

  @HostBinding("class.is-upgraded")
  isUpgraded = true;

  private readonly el: HTMLElement;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: unknown) => void = noop;
  private internalValue = false;
  private internalDisabled = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = elementRef.nativeElement;
  }

  get value(): boolean {
    return this.internalValue;
  }

  @Input()
  @HostBinding("class.is-checked")
  set value(v: boolean) {
    this.internalValue = v;
    this.onChangeCallback(v);
    this.change.emit(v);
  }

  get disabled(): boolean {
    return this.internalDisabled;
  }

  @Input()
  @HostBinding("class.is-disabled")
  set disabled(value: boolean) {
    this.internalDisabled = toBoolean(value);
  }

  @HostListener("click")
  onClick(): void {
    if (this.disabled) {
      return;
    }
    this.value = !this.value;
  }

  writeValue(value: boolean): void {
    this.internalValue = value;
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

  onFocus(): void {
    this.renderer.addClass(this.el, IS_FOCUSED);
  }

  onBlur(): void {
    this.renderer.removeClass(this.el, IS_FOCUSED);
    this.onTouchedCallback();
  }
}
