import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MdlLayoutModule} from './mdl-layout.module';

@Component({
  // eslint-disable-next-line
  selector: 'test',
  template: '<mdl-layout-header-row>x</mdl-layout-header-row>'
})
class MdlTestComponent {
}


describe('Component: MdlLayoutHeaderRow', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlLayoutModule],
      declarations: [MdlTestComponent],
    });
  });

  it('should add the css class mdl-layout__header-row to the header element', () => {

    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const headerEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(headerEl.classList.contains('mdl-layout__header-row')).toBe(true);

  });


});
