import {
  Component,
  Input,
  ElementRef,
  Renderer,
  OnChanges,
  SimpleChange,
  Optional} from '@angular/core';
import { MdlError } from './../common/mdl-error';

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
]


@Component({
  selector: 'mdl-button',
  host: {
    '(mouseup)': 'onMouseUp()',
    '(mouseleave)': 'onMouseLeave()',
    '[class.mdl-button]': 'true',
    '[class.mdl-button--raised]':   'mdlButtonType == "raised"',
    '[class.mdl-button--fab]':      'mdlButtonType == "fab" || mdlButtonType == "mini-fab"',
    '[class.mdl-button--mini-fab]': 'mdlButtonType == "mini-fab"',
    '[class.mdl-button--icon]':     'mdlButtonType == "icon"',
    '[class.mdl-button--colored]' : 'mdlColoredType == "" || mdlColoredType == "primary"',
    '[class.mdl-button--primary]' : 'mdlColoredType == "primary"',
    '[class.mdl-button--accent]' :  'mdlColoredType == "accent"'
  },
  exportAs: 'mdlButton',
  template: '<ng-content></ng-content>'
})
export class MdlButtonComponent implements OnChanges {

  private element:HTMLElement;

  @Input('mdl-button-type') mdlButtonType: 'raised' | 'fab' | 'mini-fab' | 'icon' | '' ;
  @Input('mdl-colored') mdlColoredType : 'primary' | 'accent' | '';

  constructor(private elementRef: ElementRef){
    this.element = elementRef.nativeElement;
  }

  ngOnChanges() {

    if (this.mdlButtonType && MDL_BUTTON_TYPES.indexOf(this.mdlButtonType) === -1) {
      throw new MdlUnsupportedButtonTypeError(this.mdlButtonType);
    }

    if( this.mdlColoredType && MDL_COLORED_TYPES.indexOf(this.mdlColoredType) === -1) {
      throw new MdlUnsupportedColoredTypeError(this.mdlColoredType);
    }
  }

  onMouseUp(){
    this.blurIt();
  }

  onMouseLeave(){
    this.blurIt();
  }

  blurIt(){
    this.element.blur();
  }
}


export const MDL_BUTTON_DIRECTIVES = [MdlButtonComponent];
