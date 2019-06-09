import {Component, OnInit} from '@angular/core';

import {flyInOutTrigger, hostConfig} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';
import {IMdlTableModelItem, MdlDefaultTableModel} from '@angular-mdl/core';

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

  public tableModel = new MdlDefaultTableModel([
    {key: 'material', name: 'Material'},
    {key: 'quantity', name: 'Quantity', numeric: true},
    {key: 'unitPrice', name: 'Unit price', numeric: true}
  ]);

  selected: ITableItem[] = [];
  private tableData: ITableItem[] = [
    {material: 'Acrylic <b>(Transparent)</b>', quantity: 25, unitPrice: 2.90, selected: true},
    {material: 'Plywood (Birch)', quantity: 50, unitPrice: 1.25, selected: false},
    {material: 'Laminate (Gold on Blue)', quantity: 10, unitPrice: 2.35, selected: false}
  ];

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.tableModel.addAll(this.tableData);
    this.selected = this.tableData.filter(data => data.selected);
  }

  selectionChanged($event) {
    this.selected = $event.value;
  }

}
