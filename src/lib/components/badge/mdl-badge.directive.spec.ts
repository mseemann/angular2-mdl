import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MdlBadgeModule } from './mdl-badge.directive';


describe('Directive: MdlBadge', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlBadgeModule],
      declarations: [MdlTestBadgeComponent],
    });
  });

  it('should add the css class mdl-badge and the attribute data-badge to the host element', () => {

   TestBed.overrideComponent(MdlTestBadgeComponent, { set: {
      template: '<span mdl-badge="3"></span>' }
    });
    let fixture = TestBed.createComponent(MdlTestBadgeComponent);
    fixture.detectChanges();

    let spanEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spanEl.classList.contains('mdl-badge')).toBe(true);

    expect(spanEl.getAttribute('data-badge')).toBe('3');

  });

  it('should add the class mdl-badge--overlap and mdl-badge-no-background to the host element', () => {

    TestBed.overrideComponent(MdlTestBadgeComponent, { set: {
      template: '<span mdl-badge="3" mdl-badge-no-background mdl-badge-overlap></span>' }
    });

    let fixture = TestBed.createComponent(MdlTestBadgeComponent);
    fixture.detectChanges();

    let spanEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spanEl.classList.contains('mdl-badge')).toBe(true);
    expect(spanEl.classList.contains('mdl-badge--overlap')).toBe(true);
    expect(spanEl.classList.contains('mdl-badge--no-background')).toBe(true);

  });

});


@Component({
  selector: 'test-badge',
  template: 'replaced by the test'
})
class MdlTestBadgeComponent {}
