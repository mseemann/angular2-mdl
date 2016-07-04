import {
  Component,
  Input
} from '@angular/core';


@Component({
  selector: 'mdl-menu',
  host: {
    '[class.mdl-menu]': 'true'
  },
  exportAs: 'mdlMenu',
  template: '<ng-content></ng-content>'
})
export class MdlMenuComponent {
  @Input('mdl-menu-position') position:string;

  show(){
    console.log('show the menu');
  }
}

