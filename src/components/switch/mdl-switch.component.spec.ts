import {
  describe,
  expect,
  it,
  inject,
  beforeEach,
  addProviders
} from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { MdlSwitchComponent } from './mdl-switch.component';
import { disableDeprecatedForms, provideForms} from '@angular/forms';

describe('Component: MdlSwitch', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  describe('with deprecated forms api', () => {

    beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
      builder = tcb;
      doc = document;
    }));

    it('should add the css class mdl-switch to the host element', () => {

      return builder
        .createAsync(MdlTestSwitchComponent).then( (fixture) => {

          fixture.detectChanges();

          let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
          expect(checkboxEl.classList.contains('mdl-switch')).toBe(true);

        });
    });

  });

  describe('with new forms api', () => {

    beforeEach( () => {
      addProviders([
        disableDeprecatedForms(),
        provideForms()
      ]);
    });

    beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
      builder = tcb;
      doc = document;
    }));

    it('should be possible to create the test component', ( done ) => {

      return builder
        .createAsync(MdlTestSwitchComponent).then( (fixture) => {

          fixture.detectChanges();

          done();

        });
    });

  });

});


@Component({
  selector: 'test-icon',
  template: '<mdl-switch [(ngModel)]="checkboxValue1" mdl-ripple>switch</mdl-switch>',
  directives: [MdlSwitchComponent]
})
class MdlTestSwitchComponent {
}
