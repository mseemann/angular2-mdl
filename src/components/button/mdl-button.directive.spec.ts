import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MDL_BUTTON_DIRECTIVES } from './mdl-button.directive';
import { MDL_COMMON_DIRECTIVES } from './../common/mdl-ripple.directive';

describe('Directive: MdlButton', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-button to the host element', () => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <button mdl-button mdl-ripple></button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture:ComponentFixture<MdlTestButtonComponent>) => {

        fixture.detectChanges();


        let button = fixture.debugElement.query(By.css('.mdl-button'));
        expect(button).not.toBeNull();

        // second approach

        let btnEl:HTMLElement = button.nativeElement;
        expect(btnEl.classList.contains('mdl-button')).toBe(true);

        fixture.debugElement.triggerEventHandler('mouseup', null);

      })
  });
});


@Component({
  selector: 'test-button',
  template: "replaced by the test",
  directives: [MDL_COMMON_DIRECTIVES, MDL_BUTTON_DIRECTIVES]
})
class MdlTestButtonComponent {}
