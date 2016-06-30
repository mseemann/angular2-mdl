import {
  Component,
  Provider,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  Attribute
} from '@angular/core';
import {
  IMdlTableModel,
  IMdlTableColumn,
  IMdlTableModelItem
} from './mdl-table'

import { MDL_CHECKBOX_DIRECTIVES } from './../checkbox/mdl-checkbox.component';
import { MDL_COMMON_DIRECTIVES } from './../common/mdl-ripple.directive'

@Component({
  moduleId: module.id,
  selector: 'mdl-table-selectable',
  templateUrl: 'mdl-table.html',
  styles: [
    `
    :host{
      display:inline-block;
    }
    `
  ],
  directives: [MDL_CHECKBOX_DIRECTIVES, MDL_COMMON_DIRECTIVES]
})
export class MdlTableComponent {

  @Input('table-model') model:IMdlTableModel;
  @Input('table-model-selected') selected:Array<IMdlTableModelItem>;
  @Output('table-model-selectionChanged') selectionChange = new EventEmitter();

  selectable = true;
  allSelected = false;

  isAllSelected(){
    return this.model.data.every( data => data.selected);
  }

  toogleAll(){
    let selected = !this.isAllSelected();
    this.model.data.forEach( data => data.selected = selected);
    this.updateSelected();
  }

  updateSelected(){
    this.selected = this.model.data.filter( data => data.selected);
    this.selectionChange.emit({value:this.selected});
  }

  selectionChanged(data){
    this.updateSelected();
  }

}