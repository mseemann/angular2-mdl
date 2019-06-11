import {Directive, HostBinding} from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[mdl-menu-item-full-bleed-divider]'
})
export class MdlMenuItemFullBleedDeviderDirective {

  @HostBinding('class.mdl-menu__item--full-bleed-divider') isFullBleedDivider = true;

}
