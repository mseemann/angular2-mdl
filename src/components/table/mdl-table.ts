

export interface IMdlTableColumn {
  key: string;
  name: string;
  sortable?: boolean;
  numeric?: boolean;
}

export interface IMdlTableModelItem {
  selected: boolean;
}

export interface IMdlTableModel {

  columns: [IMdlTableColumn];
  data: Array<IMdlTableModelItem>;
}

export class MdlDefaultTableModel implements IMdlTableModel {

  public columns: [IMdlTableColumn];
  public data: Array<IMdlTableModelItem> = new Array<IMdlTableModelItem>();

  constructor(columns: [IMdlTableColumn]) {
    this.columns = columns;
  }

  public addAll(data: [IMdlTableModelItem]) {
    this.data.push(...data);
  }

}
