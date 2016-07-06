import {
  Component,
  Input,
  Output,
  EventEmitter,
  ComponentMetadata
} from '@angular/core';
import {
  IMdlTableModel,
  IMdlTableModelItem
} from './mdl-table';

import { MDL_CHECKBOX_DIRECTIVES } from './../checkbox/mdl-checkbox.component';
import { MDL_COMMON_DIRECTIVES } from './../common/mdl-ripple.directive';

let tableComponentMeta = new ComponentMetadata({
    moduleId: module.id,
    selector: 'mdl-table',
    templateUrl: 'mdl-table.html',
    styles: [
      `
    :host{
      display:inline-block;
    }
    `
    ],
    directives: [MDL_CHECKBOX_DIRECTIVES, MDL_COMMON_DIRECTIVES]
});
@Component(tableComponentMeta)
export class MdlTableComponent {

  @Input('table-model') public model: IMdlTableModel;

  protected selectable = false;
}

tableComponentMeta.selector = 'mdl-table-selectable';
@Component(tableComponentMeta)
export class MdlSelectableTableComponent extends MdlTableComponent {

  @Input('table-model') public model: IMdlTableModel;
  @Input('table-model-selected') public selected: Array<IMdlTableModelItem>;
  @Output('table-model-selectionChanged') public selectionChange = new EventEmitter();

  protected selectable = true;
  protected allSelected = false;

  public isAllSelected() {
    return this.model.data.every( data => data.selected);
  }

  protected toogleAll() {
    let selected = !this.isAllSelected();
    this.model.data.forEach( data => data.selected = selected);
    this.updateSelected();
  }

  private updateSelected() {
    this.selected = this.model.data.filter( data => data.selected);
    this.selectionChange.emit({value: this.selected});
  }

  protected selectionChanged(data) {
    this.updateSelected();
  }

}
