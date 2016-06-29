import { Component } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

export interface TableDataItem {
  material:string;
  quantity: number;
  unitPrice: number;
}

@Component({
  moduleId: module.id,
  selector: 'table-demo',
  templateUrl: 'table.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
})
export class TableDemo {

  tableData:[TableDataItem] = [
    {material:'Acrylic (Transparent)', quantity:25, unitPrice:2.90},
    {material:'Plywood (Birch)', quantity:50, unitPrice:1.25},
    {material:'Laminate (Gold on Blue)', quantity:10, unitPrice:2.35}
  ];
  
}
