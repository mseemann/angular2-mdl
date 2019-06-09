import {
  Component,
  OnInit
} from '@angular/core';
import {
  IMdlTableModelItem,
  MdlDefaultTableModel
} from '../../../lib/components';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';

export interface ITableItem extends IMdlTableModelItem {
  material: string;
  quantity: number;
  unitPrice: number;
}


@Component({
  selector: 'table-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'table.component.html'
})
export class TableDemo extends AbstractDemoComponent implements OnInit {

  private tableData: ITableItem[] = [
    {material: 'Acrylic <b>(Transparent)</b>', quantity: 25, unitPrice: 2.90, selected: true},
    {material: 'Plywood (Birch)', quantity: 50, unitPrice: 1.25, selected: false},
    {material: 'Laminate (Gold on Blue)', quantity: 10, unitPrice: 2.35, selected: false}
  ];

  protected selected: ITableItem[] = [];

  public tableModel = new MdlDefaultTableModel([
    {key: 'material', name: 'Material'},
    {key: 'quantity', name: 'Quantity', numeric: true},
    {key: 'unitPrice', name: 'Unit price', numeric: true}
  ]);

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.tableModel.addAll(this.tableData);
    this.selected = this.tableData.filter( data => data.selected);
  }

  protected selectionChanged($event) {
    this.selected = $event.value;
  }

}
