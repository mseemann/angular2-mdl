import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import {  MdlLayoutModule } from './index';

describe('Component: MdlLayoutTitle', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlLayoutModule ],
      declarations: [ MdlTestComponent ]
    });
  });
  it('should add the css class mdl-layout-title to the header element', () => {

    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let titleEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(titleEl.classList.contains('mdl-layout-title')).toBe(true);

  });


});


@Component({
  selector: 'test',
  template: '<mdl-layout-title>x</mdl-layout-title>'
})
class MdlTestComponent {}
