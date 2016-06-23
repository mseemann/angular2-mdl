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

@Component({
  selector: 'mdl-list-item-primary-content',
  host: {
    '[class.mdl-list__item-primary-content]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListItemPrimaryContentComponent implements OnInit{

  constructor(@Optional() private mdlListItemComponent:MdlListItemComponent){}

  ngOnInit(){
    if (this.mdlListItemComponent===null){
      throw new MdlStructureError('mdl-list-item-primary-content', 'mdl-list-item');
    }
  }
}


@Component({
  selector: 'mdl-list-item-secondary-content',
  host: {
    '[class.mdl-list__item-secondary-content]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListItemSecondaryContentComponent implements OnInit{

  constructor(@Optional() private mdlListItemComponent:MdlListItemComponent){}

  ngOnInit(){
    if (this.mdlListItemComponent===null){
      throw new MdlStructureError('mdl-list-item-secondary-content', 'mdl-list-item');
    }
  }
}

@Component({
  selector: 'mdl-list-item-secondary-action',
  host: {
    '[class.mdl-list__item-secondary-action]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListItemSecondaryActionComponent implements OnInit{

  constructor(@Optional() private mdlListItemComponent:MdlListItemComponent){}

  ngOnInit(){
    if (this.mdlListItemComponent===null){
      throw new MdlStructureError('mdl-list-item-secondary-action', 'mdl-list-item');
    }
  }
}

@Directive({
  selector: 'mdl-icon[mdl-list-item-icon]',
  host: {
    '[class.mdl-list__item-icon]': 'true'
  }
})
export class MdlListItemIconDirective {}

@Directive({
  selector: 'mdl-icon[mdl-list-item-avatar]',
  host: {
    '[class.mdl-list__item-avatar]': 'true'
  }
})
export class MdlListItemAvatarDirective {}


export const MDL_LIST_DIRECTIVES = [
  MdlListComponent,
  MdlListItemComponent,
  MdlListItemPrimaryContentComponent,
  MdlListItemIconDirective,
  MdlListItemAvatarDirective,
  MdlListItemSecondaryContentComponent,
  MdlListItemSecondaryActionComponent
];
