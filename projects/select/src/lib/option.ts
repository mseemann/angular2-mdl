import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewChild} from '@angular/core';
import {stringifyValue} from './util';

@Component({
  selector: 'mdl-option',
  templateUrl: 'option.html'
})
export class MdlOptionComponent implements AfterViewInit {

  // eslint-disable-next-line
  @HostBinding('class.mdl-option--disabled')
  @Input('disabled') public disabled = false;
  // eslint-disable-next-line
  @Input('value') public value: any;
  @ViewChild('contentWrapper', {static: true}) contentWrapper: ElementRef;
  @HostBinding('class.mdl-option__container') isOptionConatiner = true;
  public text: any;
  public multiple = false;
  public selected = false;
  public onSelect: any = Function.prototype;

  constructor(private changeDetectionRef: ChangeDetectorRef) {
  }

  get stringValue(): string {
    return stringifyValue(this.value);
  }

  public select(event: Event) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      this.onSelect(this.value);
    }
  }

  public setMultiple(multiple: boolean) {
    this.multiple = multiple;
    this.changeDetectionRef.detectChanges();
  }

  public updateSelected(value: any) {
    if (this.multiple) {
      this.selected = ((value || []).map((v: any) => stringifyValue(v)).indexOf(this.stringValue) !== -1);
    } else {
      this.selected = this.value === value;
    }
    if (!(this.changeDetectionRef as any).destroyed) {
      this.changeDetectionRef.detectChanges();
    }
  }

  ngAfterViewInit() {
    this.text = this.contentWrapper.nativeElement.textContent.trim();
  }

}
