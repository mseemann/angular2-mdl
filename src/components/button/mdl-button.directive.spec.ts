import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  tick
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
          <button mdl-button></button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture:ComponentFixture<MdlTestButtonComponent>) => {

        fixture.detectChanges();

        let btnEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(btnEl.classList.contains('mdl-button')).toBe(true);

      })
  });

  it('should throw if an unsupported buttontype is provided', () => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <button mdl-button="didNotExist"></button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture:ComponentFixture<MdlTestButtonComponent>) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      })

  });

  it('should throw if an unsupported colored type is provided', () => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <button mdl-button mdl-colored="didNotExist"></button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture:ComponentFixture<MdlTestButtonComponent>) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      })

  });

});


@Component({
  selector: 'test-button',
  template: "replaced by the test",
  directives: [MDL_COMMON_DIRECTIVES, MDL_BUTTON_DIRECTIVES]
})
class MdlTestButtonComponent {}
