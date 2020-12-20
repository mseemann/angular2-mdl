import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdlLayoutHeaderComponent, MdlLayoutModule} from './mdl-layout.module';


@Component({
  // eslint-disable-next-line
  selector: 'test-component',
  template: '<mdl-layout><mdl-layout-header mdl-layout-header-transparent>x</mdl-layout-header></mdl-layout>'
})
class MdlTestComponent {
}

describe('Component: MdlLayoutHeaderTransparent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlLayoutModule.forRoot()],
      declarations: [MdlTestComponent]
    });
  });


  it('should add the css class mdl-layout__header--transparent to the header element', () => {

    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const headerDebugElement = fixture.debugElement.query(By.directive(MdlLayoutHeaderComponent)).nativeElement;
    expect(headerDebugElement.classList.contains('mdl-layout__header--transparent')).toBe(true);

  });

});
