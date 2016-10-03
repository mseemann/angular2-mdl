import {
  MdlDefaultTableModel
} from './mdl-table.component';

describe('Component: MdlTableModel', () => {

  var tableModel;

  beforeEach(() => {
    tableModel = new MdlDefaultTableModel([
      {key: 'key', name: 'name', sortable: true, numeric: false}
    ]);
  });

  it('should be possible to access the columns', () => {

    expect(tableModel.columns.length).toBe(1);

  });

  it('should be possible to add tabel data', () => {
    tableModel.addAll([{selected: true}]);

    expect(tableModel.data.length).toBe(1);
  });
});
