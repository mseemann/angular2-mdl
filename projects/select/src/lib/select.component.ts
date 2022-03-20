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
  Provider,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MdlPopoverComponent } from "@angular-mdl/popover";
import { MdlOptionComponent } from "./option";
import { isCharacterKey, isKey, keyboardEventKey, KEYS } from "./keyboard";
import { stringifyValue } from "./util";

const uniq = (array: string[]) => Array.from(new Set(array));

const isEqual = (a: unknown, b: unknown) =>
  JSON.stringify(a) === JSON.stringify(b);

const toBoolean = (value: unknown): boolean =>
  value != null && `${value}` !== "false";

const randomId = () => {
  const S4 = () =>
    // eslint-disable-next-line
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return S4() + S4();
};

export const MDL_SELECT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  // eslint-disable-next-line
  useExisting: forwardRef(() => MdlSelectComponent),
  multi: true,
};

export class SearchableComponent {
  public searchQuery = "";
  private clearTimeout: unknown = null;

  // short search query will be cleared after 300 ms
  protected updateShortSearchQuery($event: KeyboardEvent): void {
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout as number);
    }

    this.clearTimeout = setTimeout(() => {
      this.searchQuery = "";
    }, 300);

    this.searchQuery += keyboardEventKey($event).toLowerCase();
  }
}

@Component({
  selector: "mdl-select",
  templateUrl: "select.component.html",
  encapsulation: ViewEncapsulation.None,
  providers: [MDL_SELECT_VALUE_ACCESSOR],
})
export class MdlSelectComponent
  extends SearchableComponent
  implements ControlValueAccessor, AfterContentInit, AfterViewInit
{
  @Input() disabled: boolean | string = false;
  @Input() autocomplete = false;
  @Input() public label = "";
  @Input() placeholder = "";
  @Input() multiple = false;
  // eslint-disable-next-line
  @Output() change: EventEmitter<any> = new EventEmitter(true);
  // eslint-disable-next-line
  @Output() blur: EventEmitter<any> = new EventEmitter(true);
  @Output() inputChange: EventEmitter<string> = new EventEmitter(true);
  @ViewChild("selectInput", { static: true }) selectInput:
    | ElementRef
    | undefined;
  @ViewChild(MdlPopoverComponent, { static: true })
  public popoverComponent: MdlPopoverComponent | undefined;
  @ContentChildren(MdlOptionComponent)
  public optionComponents: QueryList<MdlOptionComponent> | undefined;
  @HostBinding("class.mdl-select") isMdlSelect = true;
  directionUp = false;
  textfieldId: string;
  text = "";
  focused = false;
  // eslint-disable-next-line
  model: any[] | any | null = null;
  private selectElement: HTMLElement | undefined;
  private popoverElement: HTMLElement | undefined;
  private textByValue: { [property: string]: string } = {};
  private onChange = Function.prototype;
  private onTouched = Function.prototype;
  private misFloatingLabel = false;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
    super();
    this.textfieldId = `mdl-textfield-${randomId()}`;
  }

  @HostBinding("class.has-placeholder") get isPlaceholder(): boolean {
    return !!this.placeholder;
  }

  get isFloatingLabel(): boolean {
    return this.misFloatingLabel;
  }

  @HostBinding("class.mdl-select--floating-label")
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("floating-label")
  set isFloatingLabel(value: boolean | string) {
    this.misFloatingLabel = toBoolean(value);
  }

  @HostListener("keydown", ["$event"])
  public onKeyDown($event: KeyboardEvent): void {
    if (!this.disabled && this.popoverComponent?.isVisible && !this.multiple) {
      if (isKey($event, KEYS.upArrow)) {
        this.onArrow($event, -1);
      } else if (isKey($event, KEYS.downArrow)) {
        this.onArrow($event, 1);
      } else if (!this.autocomplete && isCharacterKey($event)) {
        this.onCharacterKeydown($event);
      }
    }
  }

  @HostListener("keyup", ["$event"])
  public onKeyUp($event: KeyboardEvent): void {
    const inputField = $event.target as HTMLInputElement;
    const inputValue = inputField.value;

    if (!this.multiple && isKey($event, KEYS.enter, KEYS.escape, KEYS.tab)) {
      this.searchQuery = "";
      if (isKey($event, KEYS.enter)) {
        this.setCurrentOptionValue();
      } else {
        inputField.value = this.text;
      }
      inputField.blur();
      this.popoverComponent?.hide();
    } else if (
      this.autocomplete &&
      !isKey($event, KEYS.downArrow, KEYS.upArrow)
    ) {
      this.inputChange.emit(inputValue);
      this.searchQuery = inputValue;
    }

    $event.preventDefault();
  }

  ngAfterContentInit(): void {
    this.bindOptions();
    this.renderValue(this.model);
    this.optionComponents?.changes.subscribe(() => {
      this.bindOptions();
      this.renderValue(this.model);
    });
    this.popoverComponent?.onShow.subscribe(() => this.onOpen());
    this.popoverComponent?.onHide.subscribe(() => this.onClose());
  }

  ngAfterViewInit(): void {
    this.selectElement = this.elementRef.nativeElement as HTMLElement;
    this.popoverElement = this.popoverComponent?.elementRef
      .nativeElement as HTMLElement;
  }

  public isDirty(): boolean {
    return Boolean(this.selectInput?.nativeElement.value);
  }

  // rebind options and reset value in connected select
  reset(resetValue: boolean = true): void {
    if (resetValue && !this.isEmpty()) {
      this.model = this.multiple ? [] : "";
      this.onChange(this.model);
      this.change.emit(this.model);
      this.renderValue(this.model);
    }
  }

  toggle($event: Event): void {
    if (!this.disabled) {
      $event.stopPropagation();
      this.popoverComponent?.toggle($event);
    }
  }

  onFocus($event: Event): void {
    if (!this.popoverComponent?.isVisible) {
      setTimeout(() => {
        this.popoverComponent?.show($event);
        this.selectInput?.nativeElement.focus();
      }, 200);
    }
  }

  onInputFocus(): void {
    if (this.autocomplete) {
      this.selectInput?.nativeElement.select();
    }
  }

  public writeValue(value: string | string[] | undefined): void {
    if (this.multiple) {
      this.model = this.model || [];
      if (!value || this.model === value) {
        // skip ngModel update when undefined value or multiple selects initialized with same array
      } else if (Array.isArray(value)) {
        this.model = value; // why the uniq call? uniq((this.model as string[]).concat(value));
      } else if (
        (this.model as string[])
          .map((v: string) => stringifyValue(v))
          .indexOf(stringifyValue(value)) !== -1
      ) {
        this.model = [
          ...(this.model as string[]).filter(
            (v: string) => stringifyValue(v) !== stringifyValue(value)
          ),
        ];
      } else if (!!value) {
        this.model = [...(this.model as string[]), value];
      }
    } else {
      this.model = value;
    }
    this.renderValue(this.model);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => unknown): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private setCurrentOptionValue() {
    const currentOption = this.getCurrentOption();
    const autoSelectedValue = this.getAutoSelection();
    const value =
      autoSelectedValue || (currentOption ? currentOption.value : this.model);
    this.resetText();

    if (!isEqual(this.model, value)) {
      this.writeValue(value);
      this.change.emit(value);
      this.onChange(this.model);
    }
  }

  private resetText() {
    this.text = this.selectInput?.nativeElement.value;
    this.changeDetectionRef.detectChanges();
  }

  private getCurrentOption() {
    return this.optionComponents
      ? this.optionComponents.find((option) => option.selected)
      : null;
  }

  private onCharacterKeydown($event: KeyboardEvent): void {
    this.updateShortSearchQuery($event);
    const autoSelectedValue = this.getAutoSelection();
    if (autoSelectedValue) {
      this.onSelect(autoSelectedValue);
    }

    $event.preventDefault();
  }

  private getAutoSelection(): string | null | undefined {
    const filteredOptions = this.optionComponents
      ?.filter(({ disabled }) => !disabled)
      .filter((option) =>
        option.text?.toLowerCase().startsWith(this.searchQuery)
      );

    const selectedOption = this.optionComponents?.find(
      (option) => option.selected
    );

    if (filteredOptions && filteredOptions.length > 0) {
      const selectedOptionInFiltered =
        selectedOption && filteredOptions.indexOf(selectedOption) !== -1;

      if (!selectedOptionInFiltered && !filteredOptions[0].selected) {
        return filteredOptions[0].value;
      }
    }

    return null;
  }

  private onArrow($event: KeyboardEvent, offset: number) {
    const arr = this.optionComponents
      ?.toArray()
      .filter(({ disabled }) => !disabled);
    if (!arr) {
      return;
    }
    let optionForSelection: MdlOptionComponent | undefined;
    const selectedOption = arr.find((option) => option.selected);
    if (!selectedOption) {
      optionForSelection = arr[offset > 0 ? -1 : 0];
    } else {
      const selectedOptionIndex = arr.indexOf(selectedOption);
      optionForSelection = arr[selectedOptionIndex + offset];
    }

    if (optionForSelection) {
      const value = optionForSelection.value;
      this.selectValue(value);
    }

    $event.preventDefault();
  }

  private selectValue(value: string | string[] | undefined) {
    this.scrollToValue(value);

    if (this.optionComponents) {
      this.optionComponents.forEach((selectOptionComponent) => {
        selectOptionComponent.updateSelected(value);
      });
    }
  }

  private isEmpty() {
    return this.multiple ? !this.model?.length : !this.model;
  }

  private bindOptions() {
    this.optionComponents?.forEach(
      (selectOptionComponent: MdlOptionComponent) => {
        selectOptionComponent.setMultiple(this.multiple);
        selectOptionComponent.onSelect = this.onSelect.bind(this);

        if (selectOptionComponent.value != null) {
          this.textByValue[stringifyValue(selectOptionComponent.value)] =
            selectOptionComponent.contentWrapper?.nativeElement.textContent.trim();
        }
      }
    );
  }

  private renderValue(value: string | string[] | undefined) {
    if (this.multiple) {
      this.text = ((value as string[]) || [])
        .map((valueItem: string) => this.textByValue[stringifyValue(valueItem)])
        .join(", ");
    } else {
      this.text = this.textByValue[stringifyValue(value)] || "";
    }
    this.changeDetectionRef.detectChanges();

    if (this.optionComponents) {
      const mvalue =
        !this.multiple && this.optionComponents.length === 1
          ? this.optionComponents.first.value
          : value;

      this.optionComponents.forEach((selectOptionComponent) => {
        selectOptionComponent.updateSelected(mvalue);
      });
    }
  }

  private onOpen() {
    if (!this.disabled) {
      if (this.popoverElement) {
        this.popoverElement.style.visibility = "hidden";
      }

      setTimeout(() => {
        this.focused = true;
        this.selectValue(this.model);
        this.tryToUpdateDirection();
        if (this.popoverElement) {
          this.popoverElement.style.visibility = "visible";
        }
      });
    }
  }

  private tryToUpdateDirection() {
    const targetRect = this.selectElement?.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const height = this.popoverElement?.offsetHeight;
    if (height && targetRect) {
      const bottomSpaceAvailable = viewHeight - targetRect.bottom;
      this.directionUp = bottomSpaceAvailable < height;
      this.changeDetectionRef.markForCheck();
    }
  }

  private onClose() {
    if (!this.disabled) {
      this.focused = false;
      this.selectValue(this.model);
      if (this.selectInput) {
        this.selectInput.nativeElement.value = this.text;
      }
      if (this.popoverElement) {
        this.popoverElement.style.visibility = "hidden";
      }
      this.blur.emit(this.model);
    }
  }

  onSelect(value: any | any[]) {
    if (!this.multiple) {
      this.scrollToValue(value);
    }
    if (!isEqual(this.model, value)) {
      this.writeValue(value);
      this.change.emit(value);
      this.onChange(this.model);
    }
  }

  private scrollToValue(value: string | string[] | undefined) {
    const popover: HTMLElement =
      this.popoverComponent?.elementRef.nativeElement;
    const list = popover.querySelector(".mdl-list");

    const optionComponent = this.optionComponents?.find(
      (o) => o.value === value
    );
    const optionElement = optionComponent
      ? optionComponent.contentWrapper?.nativeElement
      : null;

    const selectedItemElem = optionElement?.parentElement;
    if (list && selectedItemElem) {
      const computedScrollTop =
        selectedItemElem.offsetTop -
        list.clientHeight / 2 +
        selectedItemElem.clientHeight / 2;
      list.scrollTop = Math.max(computedScrollTop, 0);
    }
  }
}
