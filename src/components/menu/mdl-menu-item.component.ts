import {
  Component,
  Input,
  ElementRef,
  Optional,
  forwardRef,
  Inject
} from '@angular/core';
import { MdlMenuComponent } from './mdl-menu.component';


@Component({
  selector: 'mdl-menu-item',
  host: {
    '[class.mdl-menu__item]': 'true',
    'tabindex': '-1',
    '(click)': 'onClick($event)'
  },
  template: '<ng-content></ng-content>'
})
export class MdlMenuItemComponent {

  @Input('disabled') disabled:boolean|string;

  element:HTMLElement;
  //forwardRef is needed because of he circular dependency menu queries menuitems; menuitem needs the parent
  constructor(private elementRef: ElementRef, @Inject(forwardRef(() => MdlMenuComponent)) private mdlMenu:MdlMenuComponent){
    this.element = elementRef.nativeElement;
  }

  onClick($event){
    if(this.disabled == false || this.disabled == ''){
      $event.stopPropagation();
      return;
    }
    this.mdlMenu.hideOnItemClicked();
  }
}