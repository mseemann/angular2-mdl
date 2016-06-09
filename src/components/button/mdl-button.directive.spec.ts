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

    })
  });
});


@Component({
  selector: 'test-button',
  template: "<button></button>",
  directives: [MdlButtonDirective]
})
class MdlTestButtonComponent {}
