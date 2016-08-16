import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import {
  MdlLayoutDrawerComponent,
  MdlLayoutModule
} from './index';

describe('Component: MdlLayoutDrawer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlLayoutModule ],
      declarations: [ MdlTestLayoutComponent ],
    });
  });

  it('should add the css class mdl-layout__header to the host element', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    let layoutEl: HTMLElement = fixture.debugElement.query(By.directive(MdlLayoutDrawerComponent)).nativeElement;
    expect(layoutEl.classList.contains('mdl-layout__drawer')).toBe(true);

    done();

  });


});


@Component({
  selector: 'test-layout',
  template: '<mdl-layout-drawer>x</mdl-layout-drawer>'
})
class MdlTestLayoutComponent {}
