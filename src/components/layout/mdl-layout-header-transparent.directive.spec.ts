import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {  MdlLayoutHeaderTransparentDirective } from './mdl-layout-header-transparent.directive';

describe('Component: MdlLayoutHeaderTransparent', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-layout__header--transparent to the header element', () => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-layout-header mdl-layout-header-transparent>x</mdl-layout-header>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let headerEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(headerEl.classList.contains('mdl-layout__header--transparent')).toBe(true);

      });
  });


});


@Component({
  selector: 'test-icon',
  template: 'replaced by the test',
  directives: [MdlLayoutHeaderTransparentDirective]
})
class MdlTestComponent {}
