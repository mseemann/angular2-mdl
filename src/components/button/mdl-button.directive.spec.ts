import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder} from '@angular/compiler/testing';
import { MdlButtonDirective } from './mdl-button.directive';

describe('Directive: MdlButton', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-button to the host element', () => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <button mdl-button></button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture) => {

        fixture.detectChanges();

        let button = fixture.debugElement.query(By.css('.mdl-button'));
        expect(button).not.toBeNull();

        // second approach

        let btnEl:HTMLElement = button.nativeElement;
        expect(btnEl.classList.contains('mdl-button')).toBe(true);

      })
  });
});


@Component({
  selector: 'test-button',
  template: "replaced by the test",
  directives: [MdlButtonDirective]
})
class MdlTestButtonComponent {}
