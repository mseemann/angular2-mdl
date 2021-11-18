import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MdlModule } from "@angular-mdl/core";
import { MdlPopoverModule } from "@angular-mdl/popover";
import { MdlFabMenuComponent } from "./fab-menu.component";
import { MdlFabMenuItemComponent } from "./fab-menu-item";

export * from "./fab-menu.component";
export * from "./fab-menu-item";

@NgModule({
  imports: [CommonModule, MdlModule, MdlPopoverModule],
  exports: [MdlFabMenuComponent, MdlFabMenuItemComponent],
  declarations: [MdlFabMenuComponent, MdlFabMenuItemComponent],
})
export class MdlFabMenuModule {
  static forRoot(): ModuleWithProviders<MdlFabMenuModule> {
    return {
      ngModule: MdlFabMenuModule,
      providers: [],
    };
  }
}
