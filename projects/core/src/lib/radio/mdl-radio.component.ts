import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Injectable,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormGroupName, NG_VALUE_ACCESSOR} from '@angular/forms';
import {toBoolean} from '../common/boolean-property';
import {noop} from '../common/noop';


const IS_FOCUSED = 'is-focused';

// Registry for mdl-readio compnents. Is responsible to keep the
// right state of the radio buttons of a radio group. It would be
// easier if i had a mdl-radio-group component. but this would be
// a big braking change.
@Injectable({
  providedIn: 'root'
})
export class MdlRadioGroupRegisty {

  private defaultFormGroup = 'defaultFromGroup';
  private radioComponents: { radio: MdlRadioComponent; group: FormGroupName | string }[] = [];

  public add(radioComponent: MdlRadioComponent, formGroupName: FormGroupName) {
    this.radioComponents.push({
      radio: radioComponent,
      group: formGroupName || this.defaultFormGroup
    });
  }

  public remove(radioComponent: MdlRadioComponent) {
    this.radioComponents = this.radioComponents.filter((radioComponentInArray) => (radioComponentInArray.radio !== radioComponent));
  }

  public select(radioComponent: MdlRadioComponent, formGroupName: FormGroupName) {
    // unselect every radioComponent that is not the provided radiocomponent
    // and has the same name and is in teh same group.
    const groupToTest = formGroupName || this.defaultFormGroup;
    this.radioComponents.forEach((component) => {
      if (component.radio.name === radioComponent.name && component.group === groupToTest) {
        if (component.radio !== radioComponent) {
          component.radio.deselect(radioComponent.value);
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
  template: `
    <input type="checkbox" class="mdl-radio__button"
           [attr.name]="name"
           (focus)="onFocus()"
           (blur)="onBlur()"
           (keyup.space)="spaceKeyPress($event)"
           [disabled]="disabled"
           [attr.tabindex]="tabindex"
           [(ngModel)]="checked">
    <span class="mdl-radio__label"><ng-content></ng-content></span>
    <span class="mdl-radio__outer-circle"></span>
    <span class="mdl-radio__inner-circle"></span>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlRadioComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() public name: string;
  @Input() public formControlName: string;
  @Input() public value: any;
  @Input() public tabindex = null;
  // eslint-disable-next-line
  @Output() public change: EventEmitter<any> = new EventEmitter<any>();
  // the internal state - used to set the underlaying radio button state.
  @HostBinding('class.is-checked') public checked = false;
  @HostBinding('class.is-upgraded') isUpgraded = true;
  @HostBinding('class.mdl-radio') isRadio = true;

  public optionValue: any;

  private el: HTMLElement;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: () => void = noop;
  private disabledIntern = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private radioGroupRegistry: MdlRadioGroupRegisty,
    @Optional() private formGroupName: FormGroupName) {
    this.el = elementRef.nativeElement;
  }

  @HostBinding('class.is-disabled')
  @Input()
  get disabled(): boolean {
    return this.disabledIntern;
  }

  set disabled(value) {
    this.disabledIntern = toBoolean(value);
  }

  @HostListener('click')
  public onClick() {
    if (this.disabled) {
      return;
    }
    this.optionValue = this.value;
    this.updateCheckState();
    this.onChangeCallback();
    this.change.emit(this.optionValue);
  }


  public ngOnInit() {
    // we need a name and it must be the same as in the formcontrol.
    // a radio group without name is useless.
    this.checkName();
    // register the radio button - this is the only chance to unselect the
    // radio button that is no longer active - scope the radio button with it's group
    // if there is one.
    this.radioGroupRegistry.add(this, this.formGroupName);
  }

  public ngOnDestroy() {
    this.radioGroupRegistry.remove(this);
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
      this.radioGroupRegistry.select(this, this.formGroupName);
    };
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
  }

  spaceKeyPress(event) {
    this.checked = false; // in case of space key is pressed radio button value must remain same
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
