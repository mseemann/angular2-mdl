import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {IMdlTableModelItem, MdlDefaultTableModel, MdlTableModule} from './mdl-table.module';
import {MdlCheckboxComponent} from '../checkbox/mdl-checkbox.component';
import {FormsModule} from '@angular/forms';


interface ITableItem extends IMdlTableModelItem {
  material: string;
  quantity: number;
  unitPrice: number;
}

@Component({
  // eslint-disable-next-line
  selector: 'test-icon',
  template: `
    <mdl-table-selectable mdl-shadow="2"
                          [table-model]="tableModel"
                          [table-model-selected]="selected"
                          (table-model-selectionChanged)="selectionChanged($event)">
    </mdl-table-selectable>
  `,
})
class MdlTestTableComponent implements OnInit {
  tableData: ITableItem[] = [
    {material: 'Acrylic (Transparent)', quantity: 25, unitPrice: 2.90, selected: true},
    {material: 'Plywood (Birch)', quantity: 50, unitPrice: 1.25, selected: false},
    {material: 'Laminate (Gold on Blue)', quantity: 10, unitPrice: 2.35, selected: false}
  ];

  selected: Array<ITableItem> = new Array<ITableItem>();

  tableModel = new MdlDefaultTableModel([
    {key: 'material', name: 'Material'},
    {key: 'quantity', name: 'Quantity', numeric: true},
    {key: 'unitPrice', name: 'Unit price', numeric: true}
  ]);

  ngOnInit(): void {
    this.tableModel.addAll(this.tableData);
    this.selected = this.tableData.filter(data => data.selected);
  }

  selectionChanged($event): void {
    this.selected = $event.value;
  }
}


describe('Component: MdlTableComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlTableModule.forRoot(), FormsModule],
      declarations: [MdlTestTableComponent],
    });
  });

  it('should create a table with class "mdl-data-table', () => {

    const fixture = TestBed.createComponent(MdlTestTableComponent);
    fixture.detectChanges();

    const tableEl: HTMLInputElement = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(tableEl.classList.contains('mdl-data-table')).toBe(true);

  });


  it('should select all items if the toggleAll checkbox is clicked', () => {

    const fixture = TestBed.createComponent(MdlTestTableComponent);
    fixture.detectChanges();

    const firstCheckboxEl: HTMLInputElement = fixture.debugElement
      .query(By.directive(MdlCheckboxComponent)).nativeElement;
    firstCheckboxEl.click();

    fixture.detectChanges();

    expect(fixture.componentInstance.selected.length).toBe(fixture.componentInstance.tableData.length);

  });

  it('should change the selection to the last table row if the last checkbox is clickt', () => {

    const fixture = TestBed.createComponent(MdlTestTableComponent);
    fixture.detectChanges();

    const checkboxes = fixture.debugElement.queryAll(By.directive(MdlCheckboxComponent));
    const firstCheckboxEl: HTMLInputElement = checkboxes[checkboxes.length - 1].nativeElement;
    firstCheckboxEl.click();

    fixture.detectChanges();

    // one is already selected so we have to selected items
    expect(fixture.componentInstance.selected.length).toBe(2);

  });

});
