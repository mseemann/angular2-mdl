

export interface IMdlTableColumn {
  key:string;
  name:string;
  sortable?:boolean;
  numeric?:boolean;
}

export interface IMdlTableModelItem {
  selected:boolean;
}

export interface IMdlTableModel {

  columns:[IMdlTableColumn];
  data:Array<IMdlTableModelItem>;
}

export class MdlDefaultTableModel implements IMdlTableModel{

  columns:[IMdlTableColumn];
  data:Array<IMdlTableModelItem> = new Array<IMdlTableModelItem>();

  constructor(columns:[IMdlTableColumn]){
    this.columns = columns;
  }

  addAll(data:[IMdlTableModelItem]){
    this.data.push(...data);
  }

}