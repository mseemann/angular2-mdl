import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MdlNonRootModule } from './index';

describe('NgModule: MdlNonRootModule', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlNonRootModule.forRoot() ],
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
