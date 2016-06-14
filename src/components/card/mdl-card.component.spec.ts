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
import { MdlCardComponent } from './mdl-card.component';

describe('Directive: MdlCard', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-card ato the element', () => {

    return builder
      .createAsync(TestApp).then( (fixture) => {

        fixture.detectChanges();

        let mdlCardElement = fixture.debugElement.query(By.css('mdl-card'));

        expect(mdlCardElement.nativeElement.classList.contains('mdl-card')).toBe(true);

      })
  });


});

@Component({
  selector: 'test-app',
  template: `
    <mdl-card></mdl-card>
  `,
  directives: [MdlCardComponent]
})
class TestApp {
}

