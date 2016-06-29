import {
  describe,
  expect,
  it,
  inject,
  tick,
  beforeEach
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Optional } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MdlTableDirective } from './mdl-table.directive';

describe('Component: MdlTable*', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class material-icons to the host element', () => {

    return builder
      .overrideTemplate(MdlTestTableComponent, `
          <table mdl-table></table>
        `)
      .createAsync(MdlTestTableComponent).then( (fixture) => {

        fixture.detectChanges();

        let table:HTMLElement = fixture.debugElement.query(By.directive(MdlTableDirective)).nativeElement;
        expect(table.classList.contains('mdl-data-table')).toBe(true);

      })
  });


});


@Component({
  selector: 'test-table',
  template: "replaced by the test",
  directives: [MdlTableDirective]
})
class MdlTestTableComponent {}
