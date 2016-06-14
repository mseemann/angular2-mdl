import {
  Component,
  Directive,
  Input,
  OnChanges,
  SimpleChange,
  ElementRef,
  Renderer } from '@angular/core';
import { MdlError } from './../common/mdl-error';


@Component({
  selector: 'mdl-card',
  host: {
    '[class.mdl-card]': 'true'
  },
  template:'<ng-content></ng-content>'
})
export class MdlCardComponent {}



export const MDL_CARD_DIRECTIVES = [MdlCardComponent];
