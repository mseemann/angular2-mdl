import { TestBed, inject, async } from '@angular/core/testing';
import { DOCUMENT, By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlIconToggleModule, MdlIconToggleComponent } from './mdl-icon-toggle.component';
import { FormsModule} from '@angular/forms';


describe('Component: MdlIconToggle', () => {

  var doc: HTMLDocument;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MdlIconToggleModule],
      declarations: [ MdlTestIconToggleComponent ],
    });

  }));

  beforeEach(async(inject([DOCUMENT], function (document) {
    doc = document;
  })));

  it('should add the css class mdl-icon-toggle to the host element', () => {

    let fixture = TestBed.createComponent(MdlTestIconToggleComponent);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-icon-toggle')).toBe(true);

  });

  it('should fire a change event if the state changed', async(() => {
    let fixture = TestBed.createComponent(MdlTestIconToggleComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;

    spyOn(instance, 'onChange');

    fixture.debugElement.query(By.directive(MdlIconToggleComponent)).nativeElement.click();

    expect(instance.onChange).toHaveBeenCalledWith(true);
  }));

  // the following test, tests implicity that annotation are inherited (@Input @BooleanPorperty is defined in the
  // class MdlCheckboxComponent and not in MdlTestIconToggleComponent
  it('should be possible to disable the icon toggle', async(() => {
    let fixture = TestBed.createComponent(MdlTestIconToggleComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;
    let cbDebugElem = fixture.debugElement.query(By.directive(MdlIconToggleComponent));

    cbDebugElem.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = cbDebugElem.nativeElement;
    expect(checkboxEl.classList.contains('is-disabled')).toBe(true, 'should have css is-disabled');

    // should not change on click
    cbDebugElem.nativeElement.click();
    expect(instance.checkboxValue1).toEqual(false);

  }));
});


@Component({
  selector: 'test-icon',
  template: `
    <mdl-icon-toggle [disabled]="false" [(ngModel)]="checkboxValue1" mdl-ripple (change)="onChange($event)">
    format_bold
    </mdl-icon-toggle>
  `
})
class MdlTestIconToggleComponent {

  public checkboxValue1 = false;
  public onChange(v: boolean) {}
}
