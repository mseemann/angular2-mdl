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
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {toBoolean} from '../common/boolean-property';
import {noop} from '../common/noop';


const IS_FOCUSED = 'is-focused';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => MdlCheckboxComponent),
  multi: true
};

@Component({
  selector: 'mdl-checkbox',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  template: `
    <input type="checkbox" class="mdl-checkbox__input"
           (focus)="onFocus()"
           (blur)="onBlur()"
           [disabled]="disabled"
           [attr.tabindex]="tabindex"
           [ngModel]="value">
    <span class="mdl-checkbox__label"><ng-content></ng-content></span>
    <span class="mdl-checkbox__focus-helper"></span>
    <span class="mdl-checkbox__box-outline">
    <span class="mdl-checkbox__tick-outline"></span>
  </span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdlCheckboxComponent implements ControlValueAccessor {

  @Input() tabindex: number = null;

  // tslint:disable-next-line
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('class.mdl-checkbox') isCheckbox = true;
  @HostBinding('class.is-upgraded') isUpgraded = true;


  private el: HTMLElement;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = elementRef.nativeElement;
  }

  // tslint:disable-next-line
  private _value = false;


  get value(): boolean {
    return this._value;
  }

  @Input()
  @HostBinding('class.is-checked')
  set value(v: boolean) {
    this._value = v;
    this.onChangeCallback(v);
    this.change.emit(v);
  }

  // tslint:disable-next-line
  private _disabled = false;

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  @HostBinding('class.is-disabled')
  set disabled(value) {
    this._disabled = toBoolean(value);
  }

  public writeValue(value: any): void {
    this._value = value;
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

  public onFocus() {
    this.renderer.addClass(this.el, IS_FOCUSED);
  }

  public onBlur() {
    this.renderer.removeClass(this.el, IS_FOCUSED);
    this.onTouchedCallback();
  }

  @HostListener('click')
  public onClick() {
    if (this.disabled) {
      return;
    }
    this.value = !this.value;
  }
}

