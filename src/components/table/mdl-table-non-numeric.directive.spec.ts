import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Optional } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MdlTableDirective } from './mdl-table.directive';
import { MdlTableNonNumericDirective } from './mdl-table-non-numeric.directive';

describe('Component: MdlTableNonNumeric', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class material-icons to the host element', () => {

    return builder
      .overrideTemplate(MdlTestTableComponent, `
          <table mdl-table>
            <tr>
               <td mdl-table-non-numeric></td>
             </tr>
          </table>
        `)
      .createAsync(MdlTestTableComponent).then( (fixture) => {

        fixture.detectChanges();

        let table:HTMLElement = fixture.debugElement.query(By.directive(MdlTableNonNumericDirective)).nativeElement;
        expect(table.classList.contains('mdl-data-table__cell--non-numeric')).toBe(true);

      })
  });


});


@Component({
  selector: 'test-table',
  template: "replaced by the test",
  directives: [MdlTableNonNumericDirective, MdlTableDirective]
})
class MdlTestTableComponent {}
