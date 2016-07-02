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
import { MdlMenuComponent } from './mdl-menu.component';

describe('Component: MdlMenu', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-menu to the host element', () => {

    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-menu>x</mdl-menu>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let menuEl:HTMLElement = fixture.debugElement.query(By.directive(MdlMenuComponent)).nativeElement;
        expect(menuEl.classList.contains('mdl-menu')).toBe(true);

      })
  });


});


@Component({
  selector: 'test-menu',
  template: "replaced by the test",
  directives: [MdlMenuComponent]
})
class MdlTestIconComponent {}
