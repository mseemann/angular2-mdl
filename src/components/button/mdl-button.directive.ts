import {
  Directive,
  Input,
  ElementRef,
  Renderer,
  AfterContentInit,
  Optional} from '@angular/core';


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


  @Input('mdl-button') mdlButtonType: 'raised' | 'fab' | 'mini-fab' | 'icon' | '' ;
  @Input('mdl-colored') mdlColordType : 'primary' | 'accent' | '';

  constructor(private elementRef: ElementRef){
    this.el = elementRef.nativeElement;
  }

  ngAfterContentInit(){
    // TODO check buttonType and colorType

    // TODO more testing

    // TODO make all inputs dynamic (mdl-colored )

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
