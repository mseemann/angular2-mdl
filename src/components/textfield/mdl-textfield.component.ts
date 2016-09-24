import {
  Component,
  forwardRef,
  Input,
  Renderer,
  ElementRef,
  OnChanges,
  DoCheck,
  ViewChild,
  NgModule,
  OpaqueToken,
  Optional,
  Inject,
  EventEmitter,
  Output
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

import { BooleanProperty } from './../common/boolean-property';
import { NumberProperty } from './../common/number.property';
import { MdlButtonModule } from './../button/mdl-button.component';
import { MdlIconModule } from './../icon/mdl-icon.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const DISABLE_NATIVE_VALIDITY_CHECKING = new OpaqueToken('disableNativeValidityChecking');


const noop = (_?: any) => {};
let nextId = 0;

const IS_FOCUSED = 'is-focused';
const IS_DISABLED = 'is-disabled';
const IS_INVALID = 'is-invalid';
const IS_DIRTY = 'is-dirty';

@Component({
  selector: 'mdl-textfield',
  host: {
    '[class.mdl-textfield]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.mdl-textfield--expandable]': 'icon',
    '[class.mdl-textfield--floating-label]': 'isFloatingLabel',
    '[class.has-placeholder]': 'placeholder'
  },
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
        [(ngModel)]="value"
        [disabled]="disabled"
        [autofocus]="autofocus"
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
        [placeholder]="placeholder ? placeholder : ''"
        (focus)="onFocus($event)" 
        (blur)="onBlur($event)"
        [(ngModel)]="value"
        [disabled]="disabled"
        [required]="required"
        [autofocus]="autofocus"
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
          [placeholder]="placeholder ? placeholder : ''"
          (focus)="onFocus($event)" 
          (blur)="onBlur($event)"
          [(ngModel)]="value"
          [disabled]="disabled"
          [required]="required"
          [autofocus]="autofocus" 
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
  }]
})
export class MdlTextFieldComponent implements ControlValueAccessor, OnChanges, DoCheck {
  private value_: any;
  private el: HTMLElement;

  @Output('blur')
  private blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  @Output('focus')
  private focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  @ViewChild('input') private inputEl: ElementRef;

  get value(): any { return this.value_; };
  @Input() set value(v: any) {
    this.value_ = v;
    this.onChangeCallback(v);
  }

  @Input() public type;
  @Input() public label;
  @Input() public pattern;
  @Input() public min;
  @Input() public max;
  @Input() public name;
  @Input() public id = `mdl-textfield-${nextId++}`;
  @Input('error-msg') public errorMessage;
  @Input() @BooleanProperty() public disabled = false;
  @Input() @BooleanProperty() public required = false;
  @Input() @BooleanProperty() public autofocus: boolean = false;
  @Input('floating-label') @BooleanProperty() public isFloatingLabel = false;
  @Input() public placeholder: string;
  @Input() @NumberProperty() public rows: number = null;
  @Input() @NumberProperty() public maxrows: number = -1;
  @Input() public icon: string;

  // @experimental
  @Input() @BooleanProperty() public disableNativeValidityChecking;

  constructor(
    private renderer: Renderer,
    private elmRef: ElementRef,
    @Optional() @Inject(DISABLE_NATIVE_VALIDITY_CHECKING) private nativeCheckGlobalDisabled: Boolean) {
    this.el = elmRef.nativeElement;
  }

  public writeValue(value: any): void {
    this.value_ = value;
    this.checkDirty();
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public ngOnChanges() {
    this.checkDisabled();
  }

  public ngDoCheck() {
    this.checkValidity();
    this.checkDirty();
  }

  public setFocus() {
    if ( !this.inputEl ) {
      return;
    }
    this.renderer.invokeElementMethod(this.inputEl.nativeElement, 'focus', []);
  }

  protected onFocus(event: FocusEvent) {
    this.renderer.setElementClass(this.el, IS_FOCUSED, true);
    this.focusEmitter.emit(event);
  }

  protected onBlur(event: FocusEvent) {
    this.renderer.setElementClass(this.el, IS_FOCUSED, false);
    this.onTouchedCallback();
    this.blurEmitter.emit(event);
  }

  private checkDisabled() {
    this.renderer.setElementClass(this.el, IS_DISABLED, this.disabled);
  }

  private checkValidity() {
    // check the global setting - if globally disabled do no check
    if ( this.nativeCheckGlobalDisabled === true ) {
      return;
    }
    // check local setting - if locally disabled do no check
    if ( this.disableNativeValidityChecking ) {
      return;
    }
    if (this.inputEl && this.inputEl.nativeElement.validity) {
      this.renderer.setElementClass(this.el, IS_INVALID, !this.inputEl.nativeElement.validity.valid);
    }
  }

  private checkDirty() {
    let dirty = this.inputEl && this.inputEl.nativeElement.value && this.inputEl.nativeElement.value.length > 0;
    this.renderer.setElementClass(this.el, IS_DIRTY, dirty);
  }

  public keydownTextarea($event: KeyboardEvent) {
    var currentRowCount = this.inputEl.nativeElement.value.split('\n').length;
    if ($event.keyCode === 13) {
      if (currentRowCount >= this.maxrows && this.maxrows !== -1) {
        $event.preventDefault();
      }
    }
  }
}


@NgModule({
  imports: [MdlIconModule, MdlButtonModule, FormsModule, CommonModule],
  exports: [MdlTextFieldComponent],
  declarations: [MdlTextFieldComponent],
})
export class MdlTextFieldModule {}
