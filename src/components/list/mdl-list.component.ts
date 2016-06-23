import {
  Component,
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  ElementRef,
  Renderer,
  Optional,
  ViewEncapsulation } from '@angular/core';
import { MdlStructureError } from './../common/mdl-error';


@Component({
  selector: 'mdl-list',
  host: {
    '[class.mdl-list]': 'true'
  },
  template:'<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListComponent {}


@Component({
  selector: 'mdl-list-item',
  host: {
    '[class.mdl-list__item]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListItemComponent implements OnInit{

  constructor(@Optional() private mdlListComponent:MdlListComponent){}

  ngOnInit(){
    if (this.mdlListComponent===null){
      throw new MdlStructureError('mdl-list-item', 'mdl-list');
    }
  }
}




export const MDL_LIST_DIRECTIVES = [
  MdlListComponent,
  MdlListItemComponent
];
