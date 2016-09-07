import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  Renderer,
  NgModule
} from '@angular/core';
import { MdlError } from './../common/mdl-error';
import { BooleanProperty } from './../common/boolean-property';

export class MdlUnsupportedButtonTypeError extends MdlError {
  constructor(type: string) {
    super(`Button type "${type}" isn't supported (allowed: raised, fab, mini-fab, icon, '').`);
  }
}

export class MdlUnsupportedColoredTypeError extends MdlError {
  constructor(type: string) {
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
    '[class.mdl-button--raised]':   'mdlButtonType == "raised"',
    '[class.mdl-button--fab]':      'mdlButtonType == "fab" || mdlButtonType == "mini-fab"',
    '[class.mdl-button--mini-fab]': 'mdlButtonType == "mini-fab"',
    '[class.mdl-button--icon]':     'mdlButtonType == "icon"',
    '[class.mdl-button--primary]' : 'mdlColoredType == "primary"',
    '[class.mdl-button--accent]' :  'mdlColoredType == "accent"'
  },
  exportAs: 'mdlButton',
  template: '<ng-content></ng-content>'
})
export class MdlButtonComponent implements OnChanges {

  private element: HTMLElement;

  @Input('mdl-button-type') private mdlButtonType: 'raised' | 'fab' | 'mini-fab' | 'icon' | '' ;
  @Input('mdl-colored') private mdlColoredType: 'primary' | 'accent' | '';
  @Input() @BooleanProperty() public disabled = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.element = elementRef.nativeElement;
  }

  public ngOnChanges() {

    if (this.mdlButtonType && MDL_BUTTON_TYPES.indexOf(this.mdlButtonType) === -1) {
      throw new MdlUnsupportedButtonTypeError(this.mdlButtonType);
    }

    if ( this.mdlColoredType && MDL_COLORED_TYPES.indexOf(this.mdlColoredType) === -1) {
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
    this.renderer.invokeElementMethod(this.element, 'blur', []);
  }
}


const MDL_BUTTON_DIRECTIVES = [MdlButtonComponent];

@NgModule({
  imports: [],
  exports: MDL_BUTTON_DIRECTIVES,
  declarations: MDL_BUTTON_DIRECTIVES,
})
export class MdlButtonModule {}
