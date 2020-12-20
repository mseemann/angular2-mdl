import { ModuleWithProviders, NgModule } from "@angular/core";
import { MdlMenuComponent, MdlMenuRegisty } from "./mdl-menu.component";
import { MdlMenuItemComponent } from "./mdl-menu-item.component";
import { MdlMenuItemFullBleedDeviderDirective } from "./mdl-menu-item.directive";
import { CommonModule } from "@angular/common";
import { MdlToggleMenuDirective } from "./mdl-toggle-menu.directive";

const MDL_MENU_DIRECTIVES = [
  MdlMenuComponent,
  MdlMenuItemComponent,
  MdlMenuItemFullBleedDeviderDirective,
  MdlToggleMenuDirective,
];

export * from "./mdl-menu.component";
export * from "./mdl-menu-item.component";
export * from "./mdl-menu-item.directive";
export * from "./mdl-toggle-menu.directive";

@NgModule({
  imports: [CommonModule],
  exports: MDL_MENU_DIRECTIVES,
  declarations: MDL_MENU_DIRECTIVES,
})
export class MdlMenuModule {
  static forRoot(): ModuleWithProviders<MdlMenuModule> {
    return {
      ngModule: MdlMenuModule,
      providers: [MdlMenuRegisty],
    };
  }
}
