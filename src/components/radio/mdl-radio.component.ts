import {
  Component,
  ElementRef,
  Output,
  EventEmitter,
  Renderer,
  forwardRef,
  Input,
  NgModule,
  OnInit,
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BooleanProperty } from './../common/boolean-property'

const noop = () => {};
const IS_FOCUSED = 'is-focused';

// Registry for mdl-readio compnents. Is responsible to keep the
// right state of the radio buttons of a radio group. It would be
// easier if i had a mdl-radio-group component. but this would be
// a big braking change.
@Injectable()
export class MdlRadioGroupRegisty {

  private radioComponents: any[] = [];

  public add(radioComponent: MdlRadioComponent) {
    this.radioComponents.push(radioComponent);
  }

  public remove(radioComponent: MdlRadioComponent) {
    this.radioComponents.slice(this.radioComponents.indexOf(radioComponent), 1);
  }

  public select(radioComponent: MdlRadioComponent) {
    // unselect evenry radioComponent that is not the provided radiocomponent and has the same name
    this.radioComponents.forEach( (component) => {
      if (component.name === radioComponent.name) {
        if (component !== radioComponent) {
          component.deselect(radioComponent.value);
        }
      }
    });
  }
}

/*
 <mdl-radio name="group1" value="1" [(ngModel)]="radioOption">Value 1</mdl-radio>
 */

@Component({
  selector: 'mdl-radio',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdlRadioComponent),
    multi: true
  }],
  host: {
    '(click)': 'onClick()',
    '[class.mdl-radio]': 'true',
    '[class.is-upgraded]': 'true',
    '[class.is-checked]': 'checked',
    '[class.is-disabled]': 'disabled'
  },
  template: `
  <input type="checkbox" class="mdl-radio__button" 
    [attr.name]="name"
    (focus)="onFocus()" 
    (blur)="onBlur()"
    [disabled]="disabled"
    [(ngModel)]="checked">
  <span class="mdl-radio__label"><ng-content></ng-content></span>
  <span class="mdl-radio__outer-circle"></span>
  <span class="mdl-radio__inner-circle"></span>
  `
})
export class MdlRadioComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() public name: string;
  @Input() public formControlName: string;
  @Input() public value: any;
  @Input() @BooleanProperty() public disabled = false;

  @Output() public change: EventEmitter<any> = new EventEmitter<any>();

  public optionValue: any;
  // the internal state - used to set the underlaying radio button state.
  public checked = false;

  private el: HTMLElement;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: () => void = noop;


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private ragioGroupRegisty: MdlRadioGroupRegisty) {
    this.el = elementRef.nativeElement;
  }

  public ngOnInit() {
    // we need a name and it must be the same as in the formcontrol.
    // a radio group without name is useless.
    this.checkName();
    // register the radio button - this is the only chance to unselect the
    // radio button that is no longer active
    this.ragioGroupRegisty.add(this);
  }

  public ngOnDestroy() {
    this.ragioGroupRegisty.remove(this);
  }

  public writeValue(optionValue: any): void {
    this.optionValue = optionValue;
    this.updateCheckState();
  }

  public deselect(value: any) {
    // called from the registry. the value is the value of the selected radio button
    // e.g. the radio button get unselected if it isnÄt the selected one.
    this.writeValue(value);
  }

  public registerOnChange(fn: any): void {
    // wrap the callback, so that we can call select on the registry
    this.onChangeCallback = () => {
      fn(this.value);
      this.ragioGroupRegisty.select(this);
    };
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected onFocus() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, true);
  }

  protected onBlur() {
    this.renderer.setElementClass(this.el, IS_FOCUSED, false);
  }

  protected onClick() {
    if(this.disabled){
      return;
    }
    this.optionValue = this.value;
    this.updateCheckState();
    this.onChangeCallback();
    this.change.emit(this.optionValue);
  }

  private updateCheckState() {
    this.checked = this.optionValue === this.value;
  }

  private checkName(): void {
    if (this.name && this.formControlName && this.name !== this.formControlName) {
      this.throwNameError();
    }
    if (!this.name && this.formControlName) {
      this.name = this.formControlName;
    }
  }

  private throwNameError(): void {
    throw new Error(`
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <mdl-radio formControlName="food" name="food"></mdl-radio>
    `);
  }
}


@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [MdlRadioComponent],
  providers: [MdlRadioGroupRegisty],
  declarations: [MdlRadioComponent],
})
export class MdlRadioModule {}
