import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdlChipModule, MdlChipComponent } from './mdl-chip.component';

describe('Component: MdlChip', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlChipModule ],
      declarations: [ MdlTestComponent ],
    });
  });

  it('should add the css classmdl-chip to the host element', () => {

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

});


@Component({
  selector: 'test-chip',
  template: '<mdl-chip mdl-label="test"></mdl-chip>'
})
class MdlTestComponent {}
