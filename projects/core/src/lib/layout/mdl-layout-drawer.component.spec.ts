import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {MdlLayoutDrawerComponent, MdlLayoutModule} from './mdl-layout.module';


@Component({
  // eslint-disable-next-line
  selector: 'test-layout',
  template: '<mdl-layout-drawer>x</mdl-layout-drawer>'
})
class MdlTestLayoutComponent {
}


describe('Component: MdlLayoutDrawer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlLayoutModule],
      declarations: [MdlTestLayoutComponent],
    });
  });

  it('should add the css class mdl-layout__header to the host element', () => {

    const fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    const layoutEl: HTMLElement = fixture.debugElement.query(By.directive(MdlLayoutDrawerComponent)).nativeElement;
    expect(layoutEl.classList.contains('mdl-layout__drawer')).toBe(true);

  });


});
