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
import { MdlIconComponent } from './mdl-icon.component';

describe('Component: MdlIcon', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class material-icons to the host element', () => {

    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-icon>x</mdl-icon>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let iconEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(iconEl.classList.contains('material-icons')).toBe(true);

      })
  });


});


@Component({
  selector: 'test-icon',
  template: "replaced by the test",
  directives: [MdlIconComponent]
})
class MdlTestIconComponent {}
