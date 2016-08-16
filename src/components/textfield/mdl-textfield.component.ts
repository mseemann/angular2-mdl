import {
  Component,
  Provider,
  forwardRef,
  Input,
  Renderer,
  ElementRef,
  OnChanges,
  DoCheck,
  ViewChild,
  NgModule
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

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlTextFieldComponent),
  multi: true
});

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
        [placeholder]="placeholder ? placeholder : ''"
        (focus)="onFocus()" 
        (blur)="onBlur()"
        (keydown)="keydownTextarea($event)"
        [(ngModel)]="value"
        [disabled]="disabled"></textarea>
     <input
        *ngIf="!rows"
        #input
        class="mdl-textfield__input" 
        type="{{type}}" 
        [pattern]="pattern ? pattern : '.*'"
        [placeholder]="placeholder ? placeholder : ''"
        (focus)="onFocus()" 
        (blur)="onBlur()"
        [(ngModel)]="value"
        [disabled]="disabled">
     <label class="mdl-textfield__label">{{label}}</label>
     <span class="mdl-textfield__error">{{errorMessage}}</span>
   </div>
   <div *ngIf="icon">
      <mdl-button mdl-button-type="icon" (click)="setFocus()">
         <mdl-icon>{{icon}}</mdl-icon>
      </mdl-button>
      <div class="mdl-textfield__expandable-holder">
       <input
          #input
          class="mdl-textfield__input" 
          type="{{type}}" 
          [pattern]="pattern ? pattern : '.*'"
          [placeholder]="placeholder ? placeholder : ''"
          (focus)="onFocus()" 
          (blur)="onBlur()"
          [(ngModel)]="value"
          [disabled]="disabled">
     <label class="mdl-textfield__label">{{label}}</label>
     <span class="mdl-textfield__error">{{errorMessage}}</span>
      </div>
   </div>
   `,
  providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MdlTextFieldComponent implements ControlValueAccessor, OnChanges, DoCheck {
  private value_: any;
  private el: HTMLElement;

  @ViewChild('input') private inputEl: ElementRef;

  get value(): any { return this.value_; };
  @Input() set value(v: any) {
    this.value_ = v;
    this.onChangeCallback(v);
  }

  @Input() public type;
  @Input() public label;
  @Input() public pattern;
  @Input('error-msg') public errorMessage;
  @Input() @BooleanProperty() public disabled = false;
  @Input('floating-label') @BooleanProperty() public isFloatingLabel = false;
  @Input() public placeholder: string;
  @Input() @NumberProperty() public rows: number = null;
  @Input() @NumberProperty() public maxrows: number = -1;
  @Input() public icon: string;

  constructor(private renderer: Renderer, private elmRef: ElementRef) {
    this.el = elmRef.nativeElement;
  }

  public writeValue(value: any): void {
    this.value_ = value;
    this.checkDirty();
  }

  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public ngOnChanges() {
    this.checkDisabled();
  }

  public ngDoCheck() {
    this.checkValidity();
    this.checkDirty();
  }

  protected setFocus() {
    this.inputEl.nativeElement.focus();
  }

  protected onFocus() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, true);
  }

  protected onBlur() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, false);
    if ( this.onTouchedCallback ) {
      this.onTouchedCallback();
    }
  }

  private checkDisabled() {
    this.renderer.setElementClass(this.el, IS_DISABLED, this.disabled);
  }

  private checkValidity() {
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

/** @deprecated */
export const MDL_TEXT_FIELD_DIRECTIVES = [MdlTextFieldComponent];

@NgModule({
  imports: [MdlIconModule, MdlButtonModule, FormsModule, CommonModule],
  exports: MDL_TEXT_FIELD_DIRECTIVES,
  declarations: MDL_TEXT_FIELD_DIRECTIVES,
})
export class MdlTextFieldModule {}
