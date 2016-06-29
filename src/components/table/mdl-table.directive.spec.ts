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
import {MdlTableDirective, MdlTableSelectableDirective} from './mdl-table.directive';

describe('Component: MdlTable*', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-data-table to the host element', () => {

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

  it('should add the css class mdl-data-table__selectabele to the host element', () => {

    return builder
      .overrideTemplate(MdlTestTableComponent, `
          <table mdl-table-selectable></table>
        `)
      .createAsync(MdlTestTableComponent).then( (fixture) => {

        fixture.detectChanges();

        let table:HTMLElement = fixture.debugElement.query(By.directive(MdlTableSelectableDirective)).nativeElement;
        expect(table.classList.contains('mdl-data-table--selectable')).toBe(true);

      })
  });


});


@Component({
  selector: 'test-table',
  template: "replaced by the test",
  directives: [MdlTableDirective, MdlTableSelectableDirective]
})
class MdlTestTableComponent {}
