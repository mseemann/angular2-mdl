import {
  Component,
  Directive,
  OnInit,
  Optional,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { MdlStructureError } from '../common/mdl-error';


@Component({
  selector: 'mdl-card',
  host: {
    '[class.mdl-card]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlCardComponent {}


export class MdlCardChildStructure implements OnInit {

  constructor(private mdlCardComponent: MdlCardComponent, private childComponentName: string) {
  }

  public ngOnInit() {
    if (this.mdlCardComponent === null) {
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

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, 'mdl-card-title');
  }

  public ngOnInit() { super.ngOnInit(); }

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

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, 'mdl-card-supporting-text');
  }

  public ngOnInit() { super.ngOnInit(); }
}

@Component({
  selector: 'mdl-card-media',
  host: {
    '[class.mdl-card__media]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlCardMediaComponent extends MdlCardChildStructure {

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, 'mdl-card-media');
  }

  public ngOnInit() { super.ngOnInit(); }
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

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, 'mdl-card-actions');
  }

  public ngOnInit() { super.ngOnInit(); }
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

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, 'mdl-card-menu');
  }

  public ngOnInit() { super.ngOnInit(); }
}

@Directive({
  selector: '[mdl-card-title-text]',
  host: {
    '[class.mdl-card__title-text]': 'true'
  }
})
export class MdlCardTitleTextDirective {}

@Directive({
  selector: '[mdl-card-border]',
  host: {
    '[class.mdl-card--border]': 'true'
  }
})
export class MdlCardBorderDirective {}

@Directive({
  selector: '[mdl-card-expand]',
  host: {
    '[class.mdl-card--expand]': 'true'
  }
})
export class MdlCardExpandDirective {}


const MDL_CARD_DIRECTIVES = [
  MdlCardComponent,
  MdlCardTitleComponent,
  MdlCardMediaComponent,
  MdlCardSupportingTextComponent,
  MdlCardActionsComponent,
  MdlCardMenuComponent,
  MdlCardTitleTextDirective,
  MdlCardBorderDirective,
  MdlCardExpandDirective
];

@NgModule({
  imports: [],
  exports: MDL_CARD_DIRECTIVES,
  declarations: MDL_CARD_DIRECTIVES,
})
export class MdlCardModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlCardModule,
      providers: []
    };
  }
}
