import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
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
  exportAs: 'mdlButton',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlButtonComponent implements OnChanges {

  @HostBinding('class.mdl-button') isButton = true;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('mdl-button-type') public mdlButtonType: 'raised' | 'fab' | 'mini-fab' | 'icon' | '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('mdl-colored') public mdlColoredType: 'primary' | 'accent' | '';
  private readonly element: HTMLElement;
  private disabledIntern = false;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.element = elementRef.nativeElement;
  }

  @HostBinding('attr.disabled') get isDisable() {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('class.mdl-button--raised') get raised() {
    return this.mdlButtonType === 'raised';
  }

  @HostBinding('class.mdl-button--fab') get fab() {
    return this.mdlButtonType === 'fab' || this.mdlButtonType === 'mini-fab';
  }

  @HostBinding('class.mdl-button--mini-fab') get miniFab() {
    return this.mdlButtonType === 'mini-fab';
  }

  @HostBinding('class.mdl-button--icon') get icon() {
    return this.mdlButtonType === 'icon';
  }

  @HostBinding('class.mdl-button--primary') get primary() {
    return this.mdlColoredType === 'primary';
  }

  @HostBinding('class.mdl-button--accent') get accent() {
    return this.mdlColoredType === 'accent';
  }

  @Input()
  get disabled(): boolean {
    return this.disabledIntern;
  }

  set disabled(value) {
    this.disabledIntern = toBoolean(value);
  }

  @HostListener('mouseup')
  public onMouseUp() {
    this.blurIt();
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.blurIt();
  }

  public ngOnChanges(changes: SimpleChanges) {

    if (this.mdlButtonType && MDL_BUTTON_TYPES.indexOf(this.mdlButtonType) === -1) {
      throw new MdlUnsupportedButtonTypeError(this.mdlButtonType);
    }

    if (this.mdlColoredType && MDL_COLORED_TYPES.indexOf(this.mdlColoredType) === -1) {
      throw new MdlUnsupportedColoredTypeError(this.mdlColoredType);
    }
  }

  public blurIt() {
    callNative(this.element, 'blur');
  }
}
