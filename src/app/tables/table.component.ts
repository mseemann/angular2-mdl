import {
  Component,
  OnInit
} from '@angular/core';
import {
  IMdlTableModelItem,
  MdlDefaultTableModel
} from '../../components';

export interface ITableItem extends IMdlTableModelItem {
  material: string;
  quantity: number;
  unitPrice: number;
}


@Component({
  moduleId: module.id,
  selector: 'table-demo',
  templateUrl: 'table.component.html'
})
export class TableDemo implements OnInit {

  private tableData: [ITableItem] = [
    {material: 'Acrylic (Transparent)', quantity: 25, unitPrice: 2.90, selected: true},
    {material: 'Plywood (Birch)', quantity: 50, unitPrice: 1.25, selected: false},
    {material: 'Laminate (Gold on Blue)', quantity: 10, unitPrice: 2.35, selected: false}
  ];

  protected selected: Array<ITableItem> = new Array<ITableItem>();

  public tableModel = new MdlDefaultTableModel([
    {key: 'material', name: 'Material', sortable: true},
    {key: 'quantity', name: 'Quantity', sortable: true, numeric: true},
    {key: 'unitPrice', name: 'Unit price', numeric: true}
  ]);

  public ngOnInit() {
    this.tableModel.addAll(this.tableData);
    this.selected = this.tableData.filter( data => data.selected);
  }

  protected selectionChanged($event) {
    this.selected = $event.value;
  }

}
