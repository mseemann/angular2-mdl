import {
  inject,
  TestBed,
  TestComponentBuilder,
  async
} from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';
import { Component } from '@angular/core';
import {  } from '@angular/compiler/testing';
import { MdlIconToggleComponent } from './mdl-icon-toggle.component';
import { disableDeprecatedForms, provideForms, FormsModule} from '@angular/forms';
import {DeprecatedFormsModule} from '@angular/common';

describe('Component: MdlIconToggle', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  describe('with deprecated forms api', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [DeprecatedFormsModule],
        declarations: [],
      });

      TestBed.compileComponents();
    }));

    beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
      builder = tcb;
      doc = document;
    }));

    it('should add the css class mdl-icon-toggle to the host element', () => {

      return builder
        .createAsync(MdlTestIconToggleComponent).then( (fixture) => {

          fixture.detectChanges();

          let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
          expect(checkboxEl.classList.contains('mdl-icon-toggle')).toBe(true);

        });
    });
  });

  describe('with new forms api', () => {

    beforeEach( () => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [],
      });
    });

    beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
      builder = tcb;
      doc = document;
    }));

    it('should create the testcomponent', ( done ) => {

      return builder
        .createAsync(MdlTestIconToggleComponent).then( (fixture) => {

          fixture.detectChanges();

          done();

        });
    });

  });

});


@Component({
  selector: 'test-icon',
  template: '<mdl-icon-toggle [(ngModel)]="checkboxValue1" mdl-ripple>format_bold</mdl-icon-toggle>',
  directives: [MdlIconToggleComponent]
})
class MdlTestIconToggleComponent {
}
