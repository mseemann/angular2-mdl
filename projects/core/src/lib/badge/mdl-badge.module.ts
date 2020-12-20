import { ModuleWithProviders, NgModule } from "@angular/core";
import {
  MdlBadgeDirective,
  MdlBadgeNoBackgroundDirective,
  MdlBadgeOverlapDirective,
} from "./mdl-badge.directive";

const MDL_BADGE_DIRECTIVES = [
  MdlBadgeDirective,
  MdlBadgeOverlapDirective,
  MdlBadgeNoBackgroundDirective,
];

@NgModule({
  imports: [],
  exports: MDL_BADGE_DIRECTIVES,
  declarations: MDL_BADGE_DIRECTIVES,
})
export class MdlBadgeModule {
  public static forRoot(): ModuleWithProviders<MdlBadgeModule> {
    return {
      ngModule: MdlBadgeModule,
      providers: [],
    };
  }
}

export * from "./mdl-badge.directive";
