import {
  inject,
  TestComponentBuilder,
  TestBed,
  async
} from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlSwitchComponent } from './mdl-switch.component';
import { FormsModule } from '@angular/forms';
import { DeprecatedFormsModule } from '@angular/common';

describe('Component: MdlSwitch', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  describe('with deprecated forms api', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ DeprecatedFormsModule ],
        declarations: [],
      });

      TestBed.compileComponents();
    }));

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
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [],
      });
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
