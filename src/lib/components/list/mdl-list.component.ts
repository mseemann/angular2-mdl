import {
  Component,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Optional,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders,
  SimpleChanges
} from '@angular/core';
import {
  MdlError,
  MdlStructureError
} from '../common/mdl-error';
import { toNumber } from '../common/number.property';

export class MdlUnsupportedCountOfListItemLinesError extends MdlError {
  constructor(lines: number|string) {
      /* istanbul ignore next */
    super(`"${lines}" is not supported - max 3 lines please.`);
  }
}

@Component({
  selector: 'mdl-list',
  host: {
    '[class.mdl-list]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListComponent {}


@Component({
  selector: 'mdl-list-item',
  host: {
    '[class.mdl-list__item]': 'true',
    '[class.mdl-list__item--two-line]': 'lines==2',
    '[class.mdl-list__item--three-line]': 'lines==3'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListItemComponent implements OnInit, OnChanges {

  private _lines: number = 1;
  @Input()
  get lines() { return this._lines; }
  set lines(value) { this._lines = toNumber(value); }

  constructor(@Optional() private mdlListComponent: MdlListComponent) {}

  public ngOnInit() {
    if (this.mdlListComponent === null) {
      throw new MdlStructureError('mdl-list-item', 'mdl-list');
    }
  }

  public ngOnChanges(changes: SimpleChanges) {

    if (this.lines && this.lines > 3) {
      throw new MdlUnsupportedCountOfListItemLinesError(this.lines);
    }
  }


  /**
   * TODO check these conditions
   * .mdl-list__item-secondary-content	Defines the secondary content sub-division
   * requires .mdl-list__item-two-line or .mdl-list__item-three-line
   .mdl-list__item-secondary-info	Defines the information sub-division
   requires .mdl-list__item-two-line or .mdl-list__item-three-line
   .mdl-list__item-secondary-action	Defines the Action sub-division
   requires .mdl-list__item-two-line or .mdl-list__item-three-line
   .mdl-list__item-text-body	Defines the Text Body sub-division
   requires .mdl-list__item-three-line
   */
}

@Component({
  selector: 'mdl-list-item-primary-content',
  host: {
    '[class.mdl-list__item-primary-content]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListItemPrimaryContentComponent implements OnInit {

  constructor(@Optional() private mdlListItemComponent: MdlListItemComponent) {}

  public ngOnInit() {
    if (this.mdlListItemComponent === null) {
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
export class MdlListItemSecondaryContentComponent implements OnInit {

  constructor(@Optional() private mdlListItemComponent: MdlListItemComponent) {}

  public ngOnInit() {
    if (this.mdlListItemComponent === null) {
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
export class MdlListItemSecondaryActionComponent implements OnInit {

  constructor(@Optional() private mdlListItemComponent: MdlListItemComponent) {}

  public ngOnInit() {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError('mdl-list-item-secondary-action', 'mdl-list-item');
    }
  }
}

@Component({
  selector: 'mdl-list-item-sub-title',
  host: {
    '[class.mdl-list__item-sub-title]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListItemSubTitleComponent implements OnInit {

  constructor(@Optional() private mdlListItemComponent: MdlListItemPrimaryContentComponent) {}

  public ngOnInit() {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError('mdl-list-item-sub-title', 'mdl-list-item-primary-content');
    }
  }
}

@Component({
  selector: 'mdl-list-item-secondary-info',
  host: {
    '[class.mdl-list__item-secondary-info]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListItemSecondaryInfoComponent implements OnInit {

  constructor(@Optional() private mdlListItemComponent: MdlListItemSecondaryContentComponent) {}

  public ngOnInit() {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError('mdl-list-item-secondary-info', 'mdl-list-item-secondary-content');
    }
  }
}

@Component({
  selector: 'mdl-list-item-text-body',
  host: {
    '[class.mdl-list__item-text-body]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlListItemTextBodyComponent implements OnInit {

  constructor(@Optional() private mdlListItemComponent: MdlListItemComponent) {}

  public ngOnInit() {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError('mdl-list-item-text-body', 'mdl-list-item');
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

const MDL_LIST_DIRECTIVES = [
  MdlListComponent,
  MdlListItemComponent,
  MdlListItemPrimaryContentComponent,
  MdlListItemIconDirective,
  MdlListItemAvatarDirective,
  MdlListItemSecondaryContentComponent,
  MdlListItemSecondaryActionComponent,
  MdlListItemSubTitleComponent,
  MdlListItemSecondaryInfoComponent,
  MdlListItemTextBodyComponent
];


@NgModule({
  imports: [],
  exports: MDL_LIST_DIRECTIVES,
  declarations: MDL_LIST_DIRECTIVES,
})
export class MdlListModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlListModule,
      providers: []
    };
  }
}
