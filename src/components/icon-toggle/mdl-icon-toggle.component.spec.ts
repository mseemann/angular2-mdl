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
import { MdlIconToggleComponent } from './mdl-icon-toggle.component';

describe('Component: MdlIconToggle', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
    builder = tcb;
    doc = document;
  }));

  it('should add the css class mdl-icon-toggle to the host element', () => {

    return builder
      .createAsync(MdlTestIconToggleComponent).then( (fixture) => {

        fixture.detectChanges();

        let checkboxEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(checkboxEl.classList.contains('mdl-icon-toggle')).toBe(true);

      })
  });

});


@Component({
  selector: 'test-icon',
  template: '<mdl-icon-toggle [(ngModel)]="checkboxValue1" mdl-ripple>format_bold</mdl-icon-toggle>',
  directives: [MdlIconToggleComponent]
})
class MdlTestIconToggleComponent {
}
