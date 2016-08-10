import {
  inject,
  TestComponentBuilder
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {  MdlLayoutHeaderRowComponent } from './mdl-layout-header-row.component';

describe('Component: MdlLayoutHeaderRow', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-layout__header-row to the header element', () => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-layout-header-row>x</mdl-layout-header-row>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let headerEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(headerEl.classList.contains('mdl-layout__header-row')).toBe(true);

      });
  });


});


@Component({
  selector: 'test',
  template: 'replaced by the test',
  directives: [MdlLayoutHeaderRowComponent]
})
class MdlTestComponent {}
