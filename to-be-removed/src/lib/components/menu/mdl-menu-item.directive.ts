import {
  Directive
} from '@angular/core';

@Directive({
  selector: '[mdl-menu-item-full-bleed-divider]',
  host: {
    '[class.mdl-menu__item--full-bleed-divider]': 'true'
  }
})
export class MdlMenuItemFullBleedDeviderComponent {

}
