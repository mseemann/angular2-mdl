import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

export interface IMdlTableColumn {
  key: string;
  name: string;
  numeric?: boolean;
}

export interface IMdlTableModelItem {
  selected: boolean;
}

export interface IMdlTableModel {

  columns: IMdlTableColumn[];
  data: IMdlTableModelItem[];
}

export class MdlDefaultTableModel implements IMdlTableModel {

  public columns: IMdlTableColumn[];
  public data: IMdlTableModelItem[] = [];

  constructor(columns: IMdlTableColumn[]) {
    this.columns = columns;
  }

  public addAll(data: IMdlTableModelItem[]) {
    this.data.push(...data);
  }

}


const template = `
        <table class="mdl-data-table">
           <thead>
           <tr>
              <th *ngIf="selectable">
                 <mdl-checkbox mdl-ripple [ngModel]="isAllSelected()" (ngModelChange)="toogleAll()"></mdl-checkbox>
              </th>
              <th *ngFor="let column of model.columns"
                  [ngClass]="{'mdl-data-table__cell--non-numeric': !column.numeric}">
                 {{column.name}}
              </th>
           </tr>
           </thead>
           <tbody>
           <tr *ngFor="let data of model.data; let i = index" [ngClass]="{'is-selected': selectable && data.selected}">
              <td *ngIf="selectable">
                 <mdl-checkbox mdl-ripple
                      [(ngModel)]="data.selected"
                      (ngModelChange)="selectionChanged(data)"></mdl-checkbox>
              </td>
              <td *ngFor="let column of model.columns"
                  [ngClass]="{'mdl-data-table__cell--non-numeric': !column.numeric}"
                  [innerHTML]="data[column.key]">
              </td>
           </tr>
           </tbody>
        </table>
    `;

const styles =
  `
    :host{
      display:inline-block;
    }
    `;

@Component({
  selector: 'mdl-table',
  template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class MdlTableComponent {

  // eslint-disable-next-line
  @Input('table-model') public model: IMdlTableModel;

  public selectable = false;

  public isAllSelected() {
    return false;
  }

  toogleAll() {

  }

  selectionChanged(data) {

  }
}


@Component({
  selector: 'mdl-table-selectable',
  template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class MdlSelectableTableComponent extends MdlTableComponent {

  // eslint-disable-next-line
  @Input('table-model') public model: IMdlTableModel;
  // eslint-disable-next-line
  @Input('table-model-selected') public selected: IMdlTableModelItem[];
  // eslint-disable-next-line
  @Output('table-model-selectionChanged') public selectionChange = new EventEmitter();

  public selectable = true;
  public allSelected = false;

  public isAllSelected() {
    return this.model.data.every(data => data.selected);
  }

  toogleAll() {
    const selected = !this.isAllSelected();
    this.model.data.forEach(data => data.selected = selected);
    this.updateSelected();
  }

  selectionChanged(data) {
    this.updateSelected();
  }

  private updateSelected() {
    this.selected = this.model.data.filter(data => data.selected);
    this.selectionChange.emit({value: this.selected});
  }

}
