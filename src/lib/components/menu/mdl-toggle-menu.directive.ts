import {
  Directive, Input, HostListener
} from '@angular/core';
import { MdlMenuComponent } from './mdl-menu.component';
import { MdlButtonComponent } from '../button/mdl-button.component';

@Directive({
  selector: '[mdl-button][mdl-toggle-menu]'
})
export class MdlToggleMenuDirective {

  @Input('mdl-toggle-menu') public menu: MdlMenuComponent;

  constructor(private button: MdlButtonComponent){}

  @HostListener('click', ['$event'])
  public onClick($event){
    this.menu.toggle($event, this.button);
  }
}
