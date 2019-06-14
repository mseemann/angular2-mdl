import {ModuleWithProviders, NgModule} from '@angular/core';
import {
  MdlCardActionsComponent,
  MdlCardBorderDirective,
  MdlCardComponent,
  MdlCardExpandDirective,
  MdlCardMediaComponent,
  MdlCardMenuComponent,
  MdlCardSupportingTextComponent,
  MdlCardTitleComponent,
  MdlCardTitleTextDirective
} from './mdl-card.component';


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

export * from './mdl-card.component';
