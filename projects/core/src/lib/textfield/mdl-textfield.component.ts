import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  Optional,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {toBoolean} from '../common/boolean-property';
import {toNumber} from '../common/number.property';
import {noop} from '../common/noop';

export const DISABLE_NATIVE_VALIDITY_CHECKING = new InjectionToken<boolean>('disableNativeValidityChecking');


let nextId = 0;

const IS_FOCUSED = 'is-focused';
const IS_DISABLED = 'is-disabled';
const IS_INVALID = 'is-invalid';
const IS_DIRTY = 'is-dirty';

@Component({
  selector: 'mdl-textfield',
  template: `
    <div *ngIf="!icon">
     <textarea
       *ngIf="rows"
       #input
       [rows]="rows"
       class="mdl-textfield__input"
       type="text"
       [attr.name]="name"
       [id]="id"
       [placeholder]="placeholder ? placeholder : ''"
       (focus)="onFocus($event)"
       (blur)="onBlur($event)"
       (keydown)="keydownTextarea($event)"
       (keyup)="onKeyup($event)"
       [(ngModel)]="value"
       [disabled]="disabled"
       [required]="required"
       [autofocus]="autofocus"
       [readonly]="readonly"
       [maxlength]="maxlength"
     ></textarea>
      <input
        *ngIf="!rows"
        #input
        class="mdl-textfield__input"
        [type]="type"
        [attr.name]="name"
        [id]="id"
        [pattern]="pattern ? pattern : '.*'"
        [attr.min]="min"
        [attr.max]="max"
        [attr.step]="step"
        [placeholder]="placeholder ? placeholder : ''"
        [autocomplete]="autocomplete ? autocomplete : ''"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (keyup)="onKeyup($event)"
        [(ngModel)]="value"
        [disabled]="disabled"
        [required]="required"
        [autofocus]="autofocus"
        [readonly]="readonly"
        [attr.tabindex]="tabindex"
        [maxlength]="maxlength"
      >
      <label class="mdl-textfield__label" [attr.for]="id">{{label}}</label>
      <span class="mdl-textfield__error">{{errorMessage}}</span>
    </div>
    <div *ngIf="icon">
      <button mdl-button mdl-button-type="icon" (click)="setFocus()">
        <mdl-icon>{{icon}}</mdl-icon>
      </button>
      <div class="mdl-textfield__expandable-holder">
        <input
          #input
          class="mdl-textfield__input"
          [type]="type"
          [attr.name]="name"
          [id]="id"
          [pattern]="pattern ? pattern : '.*'"
          [attr.min]="min"
          [attr.max]="max"
          [attr.step]="step"
          [placeholder]="placeholder ? placeholder : ''"
          [autocomplete]="autocomplete ? autocomplete : ''"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (keyup)="onKeyup($event)"
          [(ngModel)]="value"
          [disabled]="disabled"
          [required]="required"
          [autofocus]="autofocus"
          [readonly]="readonly"
          [attr.tabindex]="tabindex"
          [maxlength]="maxlength"
        >
        <label class="mdl-textfield__label" [attr.for]="id">{{label}}</label>
        <span class="mdl-textfield__error">{{errorMessage}}</span>
      </div>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdlTextFieldComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class MdlTextFieldComponent implements ControlValueAccessor, OnChanges, DoCheck {
  // eslint-disable-next-line
  @Output('blur')
  blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  // eslint-disable-next-line
  @Output('focus')
  focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  // eslint-disable-next-line
  @Output('keyup')
  keyupEmitter: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @ViewChild('input')
  inputEl: ElementRef;
  @Input()
  type = 'text';
  @Input()
  label;
  @Input()
  pattern;
  @Input()
  min;
  @Input()
  max;
  @Input()
  step;
  @Input()
  name;
  @Input()
  id = `mdl-textfield-${nextId++}`;
  // eslint-disable-next-line
  @Input('error-msg')
  errorMessage;
  @HostBinding('class.has-placeholder')
  @Input()
  placeholder: string;
  @Input()
  autocomplete: string;
  @HostBinding('class.mdl-textfield--expandable')
  @Input()
  icon: string;
  @Input()
  tabindex: number = null;
  @Input()
  maxlength: number = null;
  @HostBinding('class.mdl-textfield')
  isTextfield = true;
  @HostBinding('class.is-upgraded')
  isUpgraded = true;
  private valueIntern: string | number;

  private readonly el: HTMLElement;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: unknown) => void = noop;
  private disabledIntern = false;
  private readonlyIntern = false;
  private requiredIntern = false;
  private autofocusIntern = false;
  private isFloatingLabelIntern = false;
  private rowsIntern: number = null;
  private maxrowsIntern = -1;
  // @experimental
  private disableNativeValidityCheckingIntern = false;

  constructor(
    private renderer: Renderer2,
    private elmRef: ElementRef,
    @Optional() @Inject(DISABLE_NATIVE_VALIDITY_CHECKING) private nativeCheckGlobalDisabled: boolean) {
    this.el = elmRef.nativeElement;
  }

  get value(): string | number {
    return this.valueIntern;
  }

  @Input() set value(v: string | number) {
    this.valueIntern = this.type === 'number' ? (v === '' ? null : parseFloat(v as string)) : v;
    this.onChangeCallback(this.value);
  }

  @Input()
  get disabled(): boolean {
    return this.disabledIntern;
  }

  set disabled(value: boolean) {
    this.disabledIntern = toBoolean(value);
  }

  @Input()
  get readonly(): boolean {
    return this.readonlyIntern;
  }

  set readonly(value: boolean) {
    this.readonlyIntern = toBoolean(value);
  }

  @Input()
  get required(): boolean {
    return this.requiredIntern;
  }

  set required(value: boolean) {
    this.requiredIntern = toBoolean(value);
  }

  @Input()
  get autofocus(): boolean {
    return this.autofocusIntern;
  }

  set autofocus(value: boolean) {
    this.autofocusIntern = toBoolean(value);
  }

  @HostBinding('class.mdl-textfield--floating-label')
  @Input('floating-label')
  get isFloatingLabel(): boolean {
    return this.isFloatingLabelIntern;
  }

  set isFloatingLabel(value: boolean) {
    this.isFloatingLabelIntern = toBoolean(value);
  }

  @Input()
  get rows(): number {
    return this.rowsIntern;
  }

  set rows(value: number) {
    this.rowsIntern = toNumber(value);
  }

  @Input()
  get maxrows(): number {
    return this.maxrowsIntern;
  }

  set maxrows(value: number) {
    this.maxrowsIntern = toNumber(value);
  }

  @Input()
  get disableNativeValidityChecking(): boolean {
    return this.disableNativeValidityCheckingIntern;
  }

  set disableNativeValidityChecking(value: boolean) {
    this.disableNativeValidityCheckingIntern = toBoolean(value);
  }

  public writeValue(value: string | number): void {
    this.valueIntern = value;
    this.checkDirty();
  }

  public registerOnChange(fn: () => unknown): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: () => unknown): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngOnChanges(): void {
    this.checkDisabled();
  }

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngDoCheck(): void {
    this.checkValidity();
    this.checkDirty();
  }

  setFocus(): void {
    if (!this.inputEl) {
      return;
    }
    (this.inputEl.nativeElement as HTMLInputElement).dispatchEvent(new Event('focus'));
  }

  keydownTextarea($event: KeyboardEvent): void {
    const currentRowCount = this.inputEl.nativeElement.value.split('\n').length;
    // eslint-disable-next-line
    if ($event.keyCode === 13) {
      if (currentRowCount >= this.maxrows && this.maxrows !== -1) {
        $event.preventDefault();
      }
    }
  }

  // model value.
  triggerChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onTouchedCallback();
  }

  onFocus(event: FocusEvent): void {
    this.renderer.addClass(this.el, IS_FOCUSED);
    this.focusEmitter.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.renderer.removeClass(this.el, IS_FOCUSED);
    this.onTouchedCallback();
    this.blurEmitter.emit(event);
  }

  onKeyup(event: KeyboardEvent): void {
    this.keyupEmitter.emit(event);
  }

  private checkDisabled() {
    if (this.disabled) {
      this.renderer.addClass(this.el, IS_DISABLED);
    } else {
      this.renderer.removeClass(this.el, IS_DISABLED);
    }
  }

  private checkValidity() {
    // check the global setting - if globally disabled do no check
    if (this.nativeCheckGlobalDisabled === true) {
      return;
    }
    // check local setting - if locally disabled do no check
    if (this.disableNativeValidityChecking) {
      return;
    }
    if (this.inputEl && this.inputEl.nativeElement.validity) {
      if (!this.inputEl.nativeElement.validity.valid) {
        this.renderer.addClass(this.el, IS_INVALID);
      } else {
        this.renderer.removeClass(this.el, IS_INVALID);
      }
    }
  }

  private checkDirty() {
    const dirty = this.inputEl && this.inputEl.nativeElement.value && this.inputEl.nativeElement.value.length > 0;
    if (dirty) {
      this.renderer.addClass(this.el, IS_DIRTY);
    } else {
      this.renderer.removeClass(this.el, IS_DIRTY);
    }

  }
}
