import {
  MdlTableDirective,
  MdlTableSelectableDirective
} from './mdl-table.directive';
import { MdlTableNonNumericDirective } from './mdl-table-non-numeric.directive';

export * from './mdl-table.directive';
export * from './mdl-table-non-numeric.directive';


export const MDL_TABLE_DIRECTIVES = [
  MdlTableDirective,
  MdlTableSelectableDirective,
  MdlTableNonNumericDirective
];