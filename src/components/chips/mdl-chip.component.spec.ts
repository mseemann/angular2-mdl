import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdlChipModule, MdlChipComponent } from './index';

describe('Component: MdlChip', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlChipModule ],
      declarations: [ MdlTestComponent ],
    });
  });

  it('should add the css class mdl-chip to the host element', () => {

    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let el: HTMLElement = fixture.debugElement.query(By.directive(MdlChipComponent)).nativeElement;
    expect(el.classList.contains('mdl-chip')).toBe(true);

  });


  it('should contain the label text if present', () => {
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let el: HTMLElement = fixture.debugElement.query(By.css('.mdl-chip__text')).nativeElement;
    expect(el.textContent).toBe('test');
  });

  it('should contain the delete button if mdl-delete-icon is set', () => {
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let el: HTMLElement = fixture.debugElement.query(By.css('.mdl-chip__action')).nativeElement;
    expect(el.nodeName).toBe('BUTTON');
  });

  it('should call the action method on click', () => {
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const testComponent = fixture.componentInstance;
    spyOn(testComponent, 'onAction');

    let el: HTMLElement = fixture.debugElement.query(By.css('.mdl-chip__action')).nativeElement;
    el.click();

    expect(testComponent.onAction).toHaveBeenCalled();

  });
});


@Component({
  selector: 'test-chip',
  template: '<mdl-chip mdl-label="test" mdl-action-icon="cancel" (action-click)="onAction()"></mdl-chip>'
})
class MdlTestComponent {

  public onAction() {}

}
