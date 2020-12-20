import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MdlLayoutModule} from './mdl-layout.module';


@Component({
  // eslint-disable-next-line
  selector: 'test',
  template: '<mdl-layout-spacer>x</mdl-layout-spacer>'
})
class MdlTestComponent {
}

describe('Component: MdlLayoutSpacer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlLayoutModule],
      declarations: [MdlTestComponent]
    });
  });

  it('should add the css class mdl-layout-sapcer to the host element', () => {

    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const spacerEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(spacerEl.classList.contains('mdl-layout-spacer')).toBe(true);

  });

});
