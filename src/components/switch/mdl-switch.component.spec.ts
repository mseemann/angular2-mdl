import {
  describe,
  expect,
  it,
  inject,
  injectAsync,
  fakeAsync,
  tick,
  beforeEach
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component, Optional } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MdlSwitchComponent } from './mdl-switch.component';

describe('Component: MdlSwitch', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
    builder = tcb;
    doc = document;
  }));

  it('should add the css class mdl-switch to the host element', () => {

    return builder
      .createAsync(MdlTestSwitchComponent).then( (fixture) => {

        fixture.detectChanges();

        let checkboxEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(checkboxEl.classList.contains('mdl-switch')).toBe(true);

      })
  });

});


@Component({
  selector: 'test-icon',
  template: '<mdl-switch [(ngModel)]="checkboxValue1" mdl-ripple>switch</mdl-switch>',
  directives: [MdlSwitchComponent]
})
class MdlTestSwitchComponent {
}
