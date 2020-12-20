import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdlChipComponent, MdlChipModule} from './mdl-chip.module';


@Component({
  // eslint-disable-next-line
  selector: 'test-chip',
  template: '<mdl-chip mdl-label="test" mdl-action-icon="cancel" (action-click)="onAction()"></mdl-chip>'
})
class MdlTestComponent {

  public onAction() {
  }

}

describe('Component: MdlChip', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlChipModule.forRoot()],
      declarations: [MdlTestComponent],
    });
  });

  it('should add the css class mdl-chip to the host element', () => {

    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.query(By.directive(MdlChipComponent)).nativeElement;
    expect(el.classList.contains('mdl-chip')).toBe(true);

  });


  it('should contain the label text if present', () => {
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.query(By.css('.mdl-chip__text')).nativeElement;
    expect(el.textContent).toBe('test');
  });

  it('should contain the delete button if mdl-delete-icon is set', () => {
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.query(By.css('.mdl-chip__action')).nativeElement;
    expect(el.nodeName).toBe('BUTTON');
  });

  it('should call the action method on click', () => {
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const testComponent = fixture.componentInstance;
    spyOn(testComponent, 'onAction');

    const el: HTMLElement = fixture.debugElement.query(By.css('.mdl-chip__action')).nativeElement;
    el.click();

    expect(testComponent.onAction).toHaveBeenCalled();

  });
});

