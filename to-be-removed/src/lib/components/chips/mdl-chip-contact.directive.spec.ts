import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdlChipModule, MdlChipComponent, MdlChipContactDirective } from './index';

describe('Component: MdlChip', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlChipModule ],
      declarations: [ MdlTestComponent ],
    });
  });

  it('should add the css class mdl-chip__contact to the host element and mdl-chip--contact to the mdl-chip', () => {

    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let el: HTMLElement = fixture.debugElement.query(By.directive(MdlChipContactDirective)).nativeElement;
    expect(el.classList.contains('mdl-chip__contact')).toBe(true);

    let elChip: HTMLElement = fixture.debugElement.query(By.directive(MdlChipComponent)).nativeElement;
    expect(elChip.classList.contains('mdl-chip--contact')).toBe(true);
  });

  it('should throw if mdl-chip-contact is used outside mdl-chip', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<span mdl-chip-contact>A</span>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);

    expect( () => fixture.detectChanges() )
      .toThrow();
  });

});


@Component({
  selector: 'test-chip',
  template: `
    <mdl-chip mdl-label="test">
      <span mdl-chip-contact>A</span>
    </mdl-chip>
  `
})
class MdlTestComponent {
}
