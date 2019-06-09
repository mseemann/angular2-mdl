import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MdlBadgeModule} from './mdl-badge.module';


describe('Directive: MdlBadge', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlBadgeModule.forRoot()],
      declarations: [MdlTestBadgeComponent],
    });
  });

  it('should add the css class mdl-badge and the attribute data-badge to the host element', () => {

    TestBed.overrideComponent(MdlTestBadgeComponent, {
      set: {
        template: '<span mdl-badge="3"></span>'
      }
    });
    let fixture = TestBed.createComponent(MdlTestBadgeComponent);
    fixture.detectChanges();

    let spanEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spanEl.classList.contains('mdl-badge')).toBe(true);

    expect(spanEl.getAttribute('data-badge')).toBe('3');

  });

  it('should add the class mdl-badge--overlap and mdl-badge-no-background to the host element', () => {

    TestBed.overrideComponent(MdlTestBadgeComponent, {
      set: {
        template: '<span mdl-badge="3" mdl-badge-no-background mdl-badge-overlap></span>'
      }
    });

    let fixture = TestBed.createComponent(MdlTestBadgeComponent);
    fixture.detectChanges();

    let spanEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spanEl.classList.contains('mdl-badge')).toBe(true);
    expect(spanEl.classList.contains('mdl-badge--overlap')).toBe(true);
    expect(spanEl.classList.contains('mdl-badge--no-background')).toBe(true);

  });


  it('should rmeove the data-badge attribute if the badge value is null or undefined', () => {

    TestBed.overrideComponent(MdlTestBadgeComponent, {
      set: {
        template: '<span [mdl-badge]="badgeCount"></span>'
      }
    });

    let fixture = TestBed.createComponent(MdlTestBadgeComponent);
    fixture.detectChanges();

    let spanEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spanEl.hasAttribute('data-badge')).toBe(true, 'value 1');

    fixture.componentInstance.badgeCount = 0;
    fixture.detectChanges();
    expect(spanEl.hasAttribute('data-badge')).toBe(true, 'value 0');


    fixture.componentInstance.badgeCount = null;
    fixture.detectChanges();
    expect(spanEl.hasAttribute('data-badge')).toBe(false, 'value null');

    fixture.componentInstance.badgeCount = undefined;
    fixture.detectChanges();
    expect(spanEl.hasAttribute('data-badge')).toBe(false, 'value undefined');
  });

});


@Component({
  selector: 'test-badge',
  template: 'replaced by the test'
})
class MdlTestBadgeComponent {
  badgeCount = 1;
}
