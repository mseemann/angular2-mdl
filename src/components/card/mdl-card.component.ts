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
import { MdlError } from './../common/mdl-error';

export class MdlStructureError extends MdlError {
  constructor(child:string, requiredParent: string) {
    super(`"${child}" requires "${requiredParent}" as a parent.`);
  }
}

@Component({
  selector: 'mdl-card',
  host: {
    '[class.mdl-card]': 'true'
  },
  template:'<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlCardComponent {

}

export class MdlCardChildStructure implements OnInit {

  constructor(private mdlCardComponent:MdlCardComponent, private childComponentName:string){
  }

  ngOnInit(){
    if (this.mdlCardComponent===null){
      throw new MdlStructureError(this.childComponentName, 'mdl-card');
    }
  }
}

@Component({
  selector: 'mdl-card-title',
  host: {
    '[class.mdl-card__title]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlCardTitleComponent extends MdlCardChildStructure {

  constructor(@Optional() mdlCardComponent:MdlCardComponent){
    super(mdlCardComponent, 'mdl-card-title');
  }

}

@Component({
  selector: 'mdl-card-supporting-text',
  host: {
    '[class.mdl-card__supporting-text]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlCardSupportingTextComponent extends MdlCardChildStructure {

  constructor(@Optional() mdlCardComponent:MdlCardComponent){
    super(mdlCardComponent, 'mdl-card-supporting-text');
  }

}

@Component({
  selector: 'mdl-card-actions',
  host: {
    '[class.mdl-card__actions]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlCardActionsComponent extends MdlCardChildStructure {

  constructor(@Optional() mdlCardComponent:MdlCardComponent){
    super(mdlCardComponent, 'mdl-card-actions');
  }

}

@Component({
  selector: 'mdl-card-menu',
  host: {
    '[class.mdl-card__menu]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlCardMenuComponent extends MdlCardChildStructure {

  constructor(@Optional() mdlCardComponent:MdlCardComponent){
    super(mdlCardComponent, 'mdl-card-menu');
  }

}

@Directive({
  selector: '[mdl-card-title-text]',
  host: {
    '[class.mdl-card__title-text]': 'true'
  }
})
export class MdlCardTitleTextDirective {}


export const MDL_CARD_DIRECTIVES = [
  MdlCardComponent,
  MdlCardTitleComponent,
  MdlCardSupportingTextComponent,
  MdlCardActionsComponent,
  MdlCardMenuComponent,
  MdlCardTitleTextDirective
];
