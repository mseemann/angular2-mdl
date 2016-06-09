import {
  Directive,
  Input,
  ElementRef,
  Renderer,
  AfterContentInit,
  Optional} from '@angular/core';

import { MdlRippleDirective } from './../common/mdl-ripple.directive';
import { MaterialRipple } from './../common/ripple.vendor';

@Directive({
  selector: 'button[mdl-button]',
  host: {
    '(mouseup)': 'onMouseUp()',
    '(mouseleave)': 'onMouseLeave()',
    '[class.mdl-button]': 'true',
    '[class.mdl-button--raised]':   'mdlButtonType == "raised"',
    '[class.mdl-button--fab]':      'mdlButtonType == "fab" || mdlButtonType == "mini-fab"',
    '[class.mdl-button--mini-fab]': 'mdlButtonType == "mini-fab"',
    '[class.mdl-button--icon]':     'mdlButtonType == "icon"',
    '[class.mdl-button--colored]' : 'mdlColordType == "" || mdlColordType == "primary"',
    '[class.mdl-button--primary]' : 'mdlColordType == "primary"',
    '[class.mdl-button--accent]' :  'mdlColordType == "accent"'
  }
})
export class MdlButtonDirective implements AfterContentInit {

  private el:HTMLElement;
  private rippleElement:HTMLElement;

  RIPPLE_CONTAINER = 'mdl-button__ripple-container';
  RIPPLE = 'mdl-ripple';

  ripple:any;

  @Input('mdl-button') mdlButtonType: 'raised' | 'fab' | 'mini-fab' | 'icon' | '' ;
  @Input('mdl-colored') mdlColordType : 'primary' | 'accent' | '';

  constructor(private elementRef: ElementRef, @Optional() private mdlRipple:MdlRippleDirective){
    this.el = elementRef.nativeElement;
  }

  ngAfterContentInit(){
    // TODO check buttonType and colorType

    // TODO more testing

    // TODO make all inputs dynamic (mdl-colored mdl-ripple)

    // TODO check wether this can be moved to the ripple directive - depends on the
    // other Components that have a ripple effect

    if (this.mdlRipple){
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add(this.RIPPLE_CONTAINER);
      this.rippleElement = document.createElement('span');
      this.rippleElement.classList.add(this.RIPPLE);
      rippleContainer.appendChild(this.rippleElement);
      this.rippleElement.addEventListener('mouseup', this.blur);
      this.el.appendChild(rippleContainer);

      this.ripple = new MaterialRipple(rippleContainer);

    }
  }

  onMouseUp(){
    this.blur();
  }

  onMouseLeave(){
    this.blur();
  }

  blur(){
    this.el.blur();
  }
}


export const MDL_BUTTON_DIRECTIVES = [MdlButtonDirective];
