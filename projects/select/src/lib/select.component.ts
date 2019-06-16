import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MdlPopoverComponent} from '@angular-mdl/popover';
import {MdlOptionComponent} from './option';
import {isCharacterKey, isKey, Key, keyboardEventKey} from './keyboard';

const uniq = (array: any[]) => Array.from(new Set(array));

const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

function toBoolean(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

function randomId() {
  // tslint:disable-next-line
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return (S4() + S4());
}

export const MDL_SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => MdlSelectComponent),
  multi: true
};

export class SearchableComponent {
  public searchQuery = '';
  private clearTimeout: any = null;

  // short search query will be cleared after 300 ms
  protected updateShortSearchQuery($event: KeyboardEvent) {
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }

    this.clearTimeout = setTimeout(() => {
      this.searchQuery = '';
    }, 300);

    this.searchQuery += keyboardEventKey($event).toLowerCase();
  }
}

@Component({
  selector: 'mdl-select',
  templateUrl: 'select.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [MDL_SELECT_VALUE_ACCESSOR]
})
export class MdlSelectComponent extends SearchableComponent implements ControlValueAccessor, AfterContentInit, AfterViewInit {
  @Input() ngModel: any;
  @Input() disabled = false;
  @Input() autocomplete = false;
  @Input() public label = '';
  @Input() placeholder = '';
  @Input() multiple = false;
  // tslint:disable-next-line
  @Output() change: EventEmitter<any> = new EventEmitter(true);
  // tslint:disable-next-line
  @Output() blur: EventEmitter<any> = new EventEmitter(true);
  @Output() inputChange: EventEmitter<any> = new EventEmitter(true);
  @ViewChild('selectInput', {static: true}) selectInput: ElementRef;
  @ViewChild(MdlPopoverComponent, {static: true}) public popoverComponent: MdlPopoverComponent;
  @ContentChildren(MdlOptionComponent) public optionComponents: QueryList<MdlOptionComponent>;
  @HostBinding('class.mdl-select') isMdlSelect = true;
  directionUp = false;
  textfieldId: string;
  text = '';
  focused = false;
  private selectElement: HTMLElement;
  private popoverElement: HTMLElement;
  private textByValue: any = {};
  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;
  private misFloatingLabel = false;

  constructor(private changeDetectionRef: ChangeDetectorRef,
              private elementRef: ElementRef) {
    super();
    this.textfieldId = `mdl-textfield-${randomId()}`;
  }

  @HostBinding('class.has-placeholder') get isPlaceholder() {
    return !!this.placeholder;
  }

  get isFloatingLabel() {
    return this.misFloatingLabel;
  }

  @HostBinding('class.mdl-select--floating-label')
  @Input('floating-label')
  set isFloatingLabel(value) {
    this.misFloatingLabel = toBoolean(value);
  }

  public ngAfterContentInit() {
    this.bindOptions();
    this.renderValue(this.ngModel);
    this.optionComponents.changes.subscribe(() => {
      this.bindOptions();
      this.renderValue(this.ngModel);
    });
    this.popoverComponent.onShow.subscribe(() => this.onOpen());
    this.popoverComponent.onHide.subscribe(() => this.onClose());
  }

  public ngAfterViewInit() {
    this.selectElement = this.elementRef.nativeElement as HTMLElement;
    this.popoverElement = this.popoverComponent.elementRef.nativeElement as HTMLElement;
  }

  public isDirty(): boolean {
    return Boolean(this.selectInput.nativeElement.value);
  }

  // rebind options and reset value in connected select
  public reset(resetValue: boolean = true) {
    if (resetValue && !this.isEmpty()) {
      this.ngModel = this.multiple ? [] : '';
      this.onChange(this.ngModel);
      this.change.emit(this.ngModel);
      this.renderValue(this.ngModel);
    }
  }

  public toggle($event: Event) {
    if (!this.disabled) {
      $event.stopPropagation();
      this.popoverComponent.toggle($event);
    }
  }

  public onFocus($event: Event) {
    if (!this.popoverComponent.isVisible) {
      setTimeout(() => {
        this.popoverComponent.show($event);
        this.selectInput.nativeElement.focus();
      }, 200);
    }
  }

  public onInputFocus($event: Event) {
    if (this.autocomplete) {
      this.selectInput.nativeElement.select();
    }
  }

  public writeValue(value: any): void {
    if (this.multiple) {
      this.ngModel = this.ngModel || [];
      if (!value || this.ngModel === value) {
        // skip ngModel update when undefined value or multiple selects initialized with same array
      } else if (Array.isArray(value)) {
        this.ngModel = uniq(this.ngModel.concat(value));
      } else if (this.ngModel.map((v: any) => this.stringifyValue(v)).indexOf(this.stringifyValue(value)) !== -1) {
        this.ngModel = [...this.ngModel.filter((v: any) => this.stringifyValue(v) !== this.stringifyValue(value))];
      } else if (!!value) {
        this.ngModel = [...this.ngModel, value];
      }
    } else {
      this.ngModel = value;
    }
    this.onChange(this.ngModel);
    this.renderValue(this.ngModel);
  }

  public registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown($event: KeyboardEvent) {
    if (!this.disabled && this.popoverComponent.isVisible && !this.multiple) {
      if (isKey($event, Key.UpArrow)) {
        this.onArrow($event, -1);
      } else if (isKey($event, Key.DownArrow)) {
        this.onArrow($event, 1);
      } else if (!this.autocomplete && isCharacterKey($event)) {
        this.onCharacterKeydown($event);
      }
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: KeyboardEvent) {
    const inputField = $event.target as HTMLInputElement;
    const inputValue = inputField.value;

    if (!this.multiple && isKey($event, Key.Enter, Key.Escape, Key.Tab)) {
      this.searchQuery = '';
      if (isKey($event, Key.Enter)) {
        this.setCurrentOptionValue();
      } else {
        inputField.value = this.text;
      }
      inputField.blur();
      this.popoverComponent.hide();
    } else if (this.autocomplete && !isKey($event, Key.DownArrow, Key.UpArrow)) {
      this.inputChange.emit(inputValue);
      this.searchQuery = inputValue;
    }

    $event.preventDefault();
  }

  private setCurrentOptionValue() {
    const currentOption = this.getCurrentOption();
    const autoSelectedValue = this.getAutoSelection();
    const value = autoSelectedValue || (currentOption ? currentOption.value : this.ngModel);

    this.resetText();

    if (!isEqual(this.ngModel, value)) {
      this.writeValue(value);
      this.change.emit(value);
    }
  }

  private resetText() {
    this.text = this.selectInput.nativeElement.value;
    this.changeDetectionRef.detectChanges();
  }

  private getCurrentOption() {
    return this.optionComponents ? this.optionComponents.find(option => option.selected) : null;
  }

  private onCharacterKeydown($event: KeyboardEvent): void {
    this.updateShortSearchQuery($event);
    const autoSelectedValue = this.getAutoSelection();
    if (autoSelectedValue) {
      this.onSelect(autoSelectedValue);
    }

    $event.preventDefault();
  }

  private getAutoSelection(): any {
    const filteredOptions = this.optionComponents
      .filter(({disabled}) => !disabled)
      .filter(option => {
        return option.text.toLowerCase().startsWith(this.searchQuery);
      });

    const selectedOption = this.optionComponents.find(option => option.selected);

    if (filteredOptions.length > 0) {
      const selectedOptionInFiltered = filteredOptions.indexOf(selectedOption) !== -1;

      if (!selectedOptionInFiltered && !filteredOptions[0].selected) {
        return filteredOptions[0].value;
      }
    }

    return null;
  }

  private onArrow($event: KeyboardEvent, offset: number) {
    const arr = this.optionComponents.toArray().filter(({disabled}) => !disabled);
    const selectedOption = arr.find(option => option.selected);
    const selectedOptionIndex = arr.indexOf(selectedOption);
    const optionForSelection = selectedOption !== null
      ? arr[selectedOptionIndex + offset]
      : arr[offset > 0 ? -1 : 0];

    if (optionForSelection) {
      const value = optionForSelection.value;
      this.selectValue(value);
    }

    $event.preventDefault();
  }

  private selectValue(value: any) {
    this.scrollToValue(value);

    if (this.optionComponents) {
      this.optionComponents.forEach((selectOptionComponent) => {
        selectOptionComponent.updateSelected(value);
      });
    }
  }

  private isEmpty() {
    return this.multiple ? !this.ngModel.length : !this.ngModel;
  }

  private bindOptions() {
    this.optionComponents.forEach((selectOptionComponent: MdlOptionComponent) => {
      selectOptionComponent.setMultiple(this.multiple);
      selectOptionComponent.onSelect = this.onSelect.bind(this);

      if (selectOptionComponent.value != null) {
        this.textByValue[this.stringifyValue(selectOptionComponent.value)]
          = selectOptionComponent.contentWrapper.nativeElement.textContent.trim();
      }
    });
  }

  private renderValue(value: any) {
    if (this.multiple) {
      this.text = (value || []).map((valueItem: string) => this.textByValue[this.stringifyValue(valueItem)]).join(', ');
    } else {
      this.text = this.textByValue[this.stringifyValue(value)] || '';
    }
    this.changeDetectionRef.detectChanges();

    if (this.optionComponents) {
      const mvalue = (!this.multiple && this.optionComponents.length === 1)
        ? this.optionComponents.first.value
        : value;

      this.optionComponents.forEach((selectOptionComponent) => {
        selectOptionComponent.updateSelected(mvalue);
      });
    }
  }

  private stringifyValue(value: any): string {
    switch (typeof value) {
      case 'number':
        return String(value);
      case 'object':
        return JSON.stringify(value);
      default:
        return (!!value) ? String(value) : '';
    }
  }

  private onOpen() {
    if (!this.disabled) {
      this.popoverElement.style.visibility = 'hidden';

      setTimeout(() => {
        this.focused = true;
        this.selectValue(this.ngModel);
        this.tryToUpdateDirection();
        this.popoverElement.style.visibility = 'visible';
      });
    }
  }

  private tryToUpdateDirection() {
    const targetRect = this.selectElement.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const height = this.popoverElement.offsetHeight;
    if (height) {
      const bottomSpaceAvailable = viewHeight - targetRect.bottom;
      this.directionUp = bottomSpaceAvailable < height;
      this.changeDetectionRef.markForCheck();
    }
  }

  private onClose() {
    if (!this.disabled) {
      this.focused = false;
      this.selectValue(this.ngModel);
      this.selectInput.nativeElement.value = this.text;
      this.popoverElement.style.visibility = 'hidden';
      this.blur.emit(this.ngModel);
    }
  }

  private onSelect(value: any) {
    if (!this.multiple) {
      this.scrollToValue(value);
    }
    if (!isEqual(this.ngModel, value)) {
      this.writeValue(value);
      this.change.emit(value);
    }
  }

  private scrollToValue(value: any) {
    const popover: any = this.popoverComponent.elementRef.nativeElement;
    const list: any = popover.querySelector('.mdl-list');

    const optionComponent = this.optionComponents.find(o => o.value === value);
    const optionElement: any = optionComponent
      ? optionComponent.contentWrapper.nativeElement
      : null;

    if (optionElement) {
      const selectedItemElem = optionElement.parentElement;
      const computedScrollTop = selectedItemElem.offsetTop - (list.clientHeight / 2) + (selectedItemElem.clientHeight / 2);
      list.scrollTop = Math.max(computedScrollTop, 0);
    }
  }
}
