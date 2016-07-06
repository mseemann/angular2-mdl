import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {  MdlLayoutTitleComponent } from './mdl-layout-title.component';

describe('Component: MdlLayoutTitle', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-layout-title to the header element', () => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-layout-title>x</mdl-layout-title>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let titleEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(titleEl.classList.contains('mdl-layout-title')).toBe(true);

      });
  });


});


@Component({
  selector: 'test',
  template: 'replaced by the test',
  directives: [MdlLayoutTitleComponent]
})
class MdlTestComponent {}
