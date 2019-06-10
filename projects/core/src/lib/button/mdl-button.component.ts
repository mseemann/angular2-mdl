import {Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {MdlError} from '../common/mdl-error';
import {toBoolean} from '../common/boolean-property';
import {callNative} from '../common/native-support';

export class MdlUnsupportedButtonTypeError extends MdlError {
  constructor(type: string) {
    /* istanbul ignore next */
    super(`Button type "${type}" isn't supported (allowed: raised, fab, mini-fab, icon, '').`);
  }
}

export class MdlUnsupportedColoredTypeError extends MdlError {
  constructor(type: string) {
    /* istanbul ignore next */
    super(`Colored type "${type}" isn't supported (allowed: primary, accent, '').`);
  }
}

const MDL_BUTTON_TYPES = [
  'raised',
  'fab',
  'mini-fab',
  'icon',
  ''
];

const MDL_COLORED_TYPES = [
  'primary',
  'accent',
  ''
];


@Component({
  selector: 'mdl-button, button[mdl-button], a[mdl-button]',
  host: {
    '[attr.disabled]': 'disabled ? "disabled" : null',
    '(mouseup)': 'onMouseUp()',
    '(mouseleave)': 'onMouseLeave()',
    '[class.mdl-button]': 'true',
    '[class.mdl-button--raised]': 'mdlButtonType == "raised"',
    '[class.mdl-button--fab]': 'mdlButtonType == "fab" || mdlButtonType == "mini-fab"',
    '[class.mdl-button--mini-fab]': 'mdlButtonType == "mini-fab"',
    '[class.mdl-button--icon]': 'mdlButtonType == "icon"',
    '[class.mdl-button--primary]': 'mdlColoredType == "primary"',
    '[class.mdl-button--accent]': 'mdlColoredType == "accent"'
  },
  exportAs: 'mdlButton',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlButtonComponent implements OnChanges {

  @Input('mdl-button-type') public mdlButtonType: 'raised' | 'fab' | 'mini-fab' | 'icon' | '';
  @Input('mdl-colored') public mdlColoredType: 'primary' | 'accent' | '';
  private element: HTMLElement;
  private disabledIntern = false;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.element = elementRef.nativeElement;
  }

  @Input()
  get disabled(): boolean {
    return this.disabledIntern;
  }

  set disabled(value) {
    this.disabledIntern = toBoolean(value);
  }

  public ngOnChanges(changes: SimpleChanges) {

    if (this.mdlButtonType && MDL_BUTTON_TYPES.indexOf(this.mdlButtonType) === -1) {
      throw new MdlUnsupportedButtonTypeError(this.mdlButtonType);
    }

    if (this.mdlColoredType && MDL_COLORED_TYPES.indexOf(this.mdlColoredType) === -1) {
      throw new MdlUnsupportedColoredTypeError(this.mdlColoredType);
    }
  }

  public onMouseUp() {
    this.blurIt();
  }

  public onMouseLeave() {
    this.blurIt();
  }

  public blurIt() {
    callNative(this.element, 'blur');
  }
}
