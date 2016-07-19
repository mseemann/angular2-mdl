import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {
  MdlLayoutDrawerComponent,
  MdlLayoutComponent
} from './index';

describe('Component: MdlLayoutDrawer', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-layout__header to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestLayoutComponent, `
          <mdl-layout-drawer>x</mdl-layout-drawer>
        `)
      .createAsync(MdlTestLayoutComponent).then( (fixture) => {

        fixture.detectChanges();

        let layoutEl: HTMLElement = fixture.debugElement.query(By.directive(MdlLayoutDrawerComponent)).nativeElement;
        expect(layoutEl.classList.contains('mdl-layout__drawer')).toBe(true);

        done();
      });
  });


});


@Component({
  selector: 'test-layout',
  template: 'replaced by the test',
  directives: [MdlLayoutDrawerComponent],
  providers: [ MdlLayoutComponent ]
})
class MdlTestLayoutComponent {}
