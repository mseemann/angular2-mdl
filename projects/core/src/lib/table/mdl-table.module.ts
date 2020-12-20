import { ModuleWithProviders, NgModule } from "@angular/core";
import {
  MdlSelectableTableComponent,
  MdlTableComponent,
} from "./mdl-table.component";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MdlCommonsModule } from "../common/mdl-common.module";
import { MdlCheckboxModule } from "../checkbox/mdl-checkbox.module";

export * from "./mdl-table.component";

const MDL_TABLE_DIRECTIVES = [MdlTableComponent, MdlSelectableTableComponent];

@NgModule({
  imports: [MdlCheckboxModule, MdlCommonsModule, CommonModule, FormsModule],
  exports: MDL_TABLE_DIRECTIVES,
  declarations: MDL_TABLE_DIRECTIVES,
})
export class MdlTableModule {
  public static forRoot(): ModuleWithProviders<MdlTableModule> {
    return {
      ngModule: MdlTableModule,
      providers: [],
    };
  }
}
