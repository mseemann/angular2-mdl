import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewChild} from '@angular/core';
import {stringifyValue} from './util';

@Component({
  selector: 'mdl-option',
  templateUrl: 'option.html'
})
export class MdlOptionComponent implements AfterViewInit {

  // eslint-disable-next-line
  @HostBinding('class.mdl-option--disabled')
  @Input('disabled')
  disabled = false;
  // eslint-disable-next-line
  @Input('value')
  value: string;
  @ViewChild('contentWrapper', {static: true}) contentWrapper: ElementRef;
  @HostBinding('class.mdl-option__container') isOptionConatiner = true;
  text: string;
  multiple = false;
  selected = false;
  onSelect = Function.prototype;

  constructor(private changeDetectionRef: ChangeDetectorRef) {
  }

  get stringValue(): string {
    return stringifyValue(this.value);
  }

  select(event: Event): void {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      this.onSelect(this.value);
    }
  }

  setMultiple(multiple: boolean): void {
    this.multiple = multiple;
    this.changeDetectionRef.detectChanges();
  }

  updateSelected(value: string[] | string): void {
    if (this.multiple) {
      this.selected = (((value as string[]) || []).map((v: unknown) => stringifyValue(v)).indexOf(this.stringValue) !== -1);
    } else {
      this.selected = this.value === value;
    }
    // eslint-disable-next-line
    if (!(this.changeDetectionRef as any).destroyed) {
      this.changeDetectionRef.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    this.text = this.contentWrapper.nativeElement.textContent.trim();
  }

}
