import {
  inject,
  TestComponentBuilder
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {  MdlLayoutSpacerComponent } from './mdl-layout-spacer.component';

describe('Component: MdlLayoutSpacer', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-layout-sapcer to the host element', () => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-layout-spacer>x</mdl-layout-spacer>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let spacerEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(spacerEl.classList.contains('mdl-layout-spacer')).toBe(true);

      });
  });


});


@Component({
  selector: 'test',
  template: 'replaced by the test',
  directives: [MdlLayoutSpacerComponent]
})
class MdlTestComponent {}
