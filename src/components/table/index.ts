import {
  IMdlTableColumn,
  IMdlTableModel,
  MdlDefaultTableModel,
  IMdlTableModelItem
} from './mdl-table';
import {
  MdlTableComponent,
  MdlSelectableTableComponent
} from './mdl-table.component'

export * from './mdl-table';
export * from './mdl-table.component';

export const MDL_TABLE_DIRECTIVES = [
  MdlTableComponent,
  MdlSelectableTableComponent
];