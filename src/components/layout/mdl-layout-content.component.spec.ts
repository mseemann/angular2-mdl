import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { MdlLayoutContentComponent } from './mdl-layout-content.component';

describe('Component: MdlLayoutContent', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-layout__content to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestLayoutComponent, `
          <mdl-layout-content>x</mdl-layout-content>
        `)
      .createAsync(MdlTestLayoutComponent).then( (fixture) => {

        fixture.detectChanges();

        let layoutEl: HTMLElement = fixture.debugElement.query(By.directive(MdlLayoutContentComponent)).nativeElement;
        expect(layoutEl.classList.contains('mdl-layout__content')).toBe(true);

        done();
      });
  });


});


@Component({
  selector: 'test-layout',
  template: 'replaced by the test',
  directives: [MdlLayoutContentComponent]
})
class MdlTestLayoutComponent {}
