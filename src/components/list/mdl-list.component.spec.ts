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
import { TestComponentBuilder } from '@angular/compiler/testing';
import { MDL_LIST_DIRECTIVES } from './mdl-list.component';

describe('Components: MdlList*', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-list to the element', () => {

    return builder
      .createAsync(TestApp).then( (fixture) => {

        fixture.detectChanges();

        let mdlCardElement = fixture.debugElement.query(By.css('mdl-list'));
        expect(mdlCardElement.nativeElement.classList.contains('mdl-list')).toBe(true);

      })
  });

  it('should throw if mdl-list-item has no mdl-list parent', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-list-item></mdl-list-item>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      })
  })

});

@Component({
  selector: 'test-app',
  template: `
    <mdl-list>
      <mdl-list-item></mdl-list-item>
    </mdl-list>
  `,
  directives: [MDL_LIST_DIRECTIVES]
})
class TestApp {
}

