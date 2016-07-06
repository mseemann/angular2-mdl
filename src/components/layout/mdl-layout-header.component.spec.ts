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
import { MdlLayoutHeaderComponent } from './mdl-layout-header.component';

describe('Component: MdlLayoutHeader', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-layout__header to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestLayoutComponent, `
          <mdl-layout-header>x</mdl-layout-header>
        `)
      .createAsync(MdlTestLayoutComponent).then( (fixture) => {

        fixture.detectChanges();

        let layoutEl: HTMLElement = fixture.debugElement.query(By.directive(MdlLayoutHeaderComponent)).nativeElement;
        expect(layoutEl.classList.contains('mdl-layout__header')).toBe(true);

        done();
      });
  });


});


@Component({
  selector: 'test-layout',
  template: 'replaced by the test',
  directives: [MdlLayoutHeaderComponent]
})
class MdlTestLayoutComponent {}
