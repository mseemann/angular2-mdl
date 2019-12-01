import {ModuleWithProviders, NgModule} from '@angular/core';
import {
  MdlListComponent,
  MdlListItemAvatarDirective,
  MdlListItemComponent,
  MdlListItemIconDirective,
  MdlListItemPrimaryContentComponent,
  MdlListItemSecondaryActionComponent,
  MdlListItemSecondaryContentComponent,
  MdlListItemSecondaryInfoComponent,
  MdlListItemSubTitleComponent,
  MdlListItemTextBodyComponent
} from './mdl-list.component';

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
  public static forRoot(): ModuleWithProviders<MdlListModule> {
    return {
      ngModule: MdlListModule,
      providers: []
    };
  }
}

export * from './mdl-list.component';
