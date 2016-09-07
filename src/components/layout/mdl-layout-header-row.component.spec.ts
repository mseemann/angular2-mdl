import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import {  MdlLayoutModule } from './index';

describe('Component: MdlLayoutHeaderRow', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlLayoutModule ],
      declarations: [ MdlTestComponent ],
    });
  });

  it('should add the css class mdl-layout__header-row to the header element', () => {

    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let headerEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(headerEl.classList.contains('mdl-layout__header-row')).toBe(true);

  });


});


@Component({
  selector: 'test',
  template: '<mdl-layout-header-row>x</mdl-layout-header-row>'
})
class MdlTestComponent {}
