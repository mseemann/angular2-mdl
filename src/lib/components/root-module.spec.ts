import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MdlRootModule } from './index';

describe('NgModule: MdlRootModule', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlRootModule ],
      declarations: [ MdlTestComponent ],
    });
  });

  it('should create the component from the mdlrootmodule', () => {

    let fixture = TestBed.createComponent(MdlTestComponent);

    expect(fixture.componentInstance).toBeDefined();
  });


});


@Component({
  selector: 'test-component',
  template: '<mdl-icon>x</mdl-icon>'
})
class MdlTestComponent {}
