import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MdlIconModule } from "../icon/mdl-icon.module";
import { MdlChipComponent } from "./mdl-chip.component";
import { MdlChipContactDirective } from "./mdl-chip-contact.directive";

export * from "./mdl-chip.component";
export * from "./mdl-chip-contact.directive";

const DIRECTIVES = [MdlChipComponent, MdlChipContactDirective];

@NgModule({
  imports: [MdlIconModule, CommonModule],
  exports: DIRECTIVES,
  declarations: DIRECTIVES,
})
export class MdlChipModule {
  public static forRoot(): ModuleWithProviders<MdlChipModule> {
    return {
      ngModule: MdlChipModule,
      providers: [],
    };
  }
}
