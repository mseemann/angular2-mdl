import {Directive, HostListener, Input} from '@angular/core';
import {MdlMenuComponent} from './mdl-menu.component';
import {MdlButtonComponent} from '../button/mdl-button.component';

@Directive({
  // eslint-disable-next-line
  selector: '[mdl-button][mdl-toggle-menu]'
})
export class MdlToggleMenuDirective {

  // eslint-disable-next-line
  @Input('mdl-toggle-menu')
  menu: MdlMenuComponent;

  constructor(private button: MdlButtonComponent) {
  }

  @HostListener('click', ['$event'])
  public onClick($event: Event): void {
    this.menu.toggle($event, this.button);
  }
}
