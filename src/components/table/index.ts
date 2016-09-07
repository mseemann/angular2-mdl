import { NgModule } from '@angular/core';
import {
  MdlTableComponent,
  MdlSelectableTableComponent
} from './mdl-table.component';
import { MdlChekboxModule } from './../checkbox/mdl-checkbox.component';
import { MdlRippleModule } from './../common/mdl-ripple.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export * from './mdl-table';
export * from './mdl-table.component';


const MDL_TABLE_DIRECTIVES = [
  MdlTableComponent,
  MdlSelectableTableComponent
];

@NgModule({
  imports: [MdlChekboxModule, MdlRippleModule, CommonModule, FormsModule],
  exports: MDL_TABLE_DIRECTIVES,
  declarations: MDL_TABLE_DIRECTIVES,
})
export class MdlTableModule {}
