import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MdlLayoutModule} from './mdl-layout.module';


@Component({
  // eslint-disable-next-line
  selector: 'test',
  template: '<mdl-layout-title>x</mdl-layout-title>'
})
class MdlTestComponent {
}

describe('Component: MdlLayoutTitle', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlLayoutModule],
      declarations: [MdlTestComponent]
    });
  });
  it('should add the css class mdl-layout-title to the header element', () => {

    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const titleEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(titleEl.classList.contains('mdl-layout-title')).toBe(true);

  });


});
