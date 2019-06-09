import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MdlTableComponent,
  MdlSelectableTableComponent
} from './mdl-table.component';
import { MdlCheckboxModule } from '../checkbox/mdl-checkbox.component';
import { MdlRippleModule } from '../common/mdl-ripple.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export * from './mdl-table.component';


const MDL_TABLE_DIRECTIVES = [
  MdlTableComponent,
  MdlSelectableTableComponent
];

@NgModule({
  imports: [MdlCheckboxModule, MdlRippleModule, CommonModule, FormsModule],
  exports: MDL_TABLE_DIRECTIVES,
  declarations: MDL_TABLE_DIRECTIVES,
})
export class MdlTableModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlTableModule,
      providers: []
    };
  }
}
