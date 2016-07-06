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
import { MDL_MENU_DIRECTIVES, MdlMenuItemComponent } from './index';

describe('Component: MdlMenuItem-Directive', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-menu__item--full-bleed-divider to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestMenuItemComponent, `
          <mdl-menu><mdl-menu-item mdl-menu-item-full-bleed-divider>x</mdl-menu-item></mdl-menu>
        `)
      .createAsync(MdlTestMenuItemComponent).then( (fixture) => {

        fixture.detectChanges();

        let item: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;
        expect(item.classList.contains('mdl-menu__item--full-bleed-divider')).toBe(true);

        done();
      });
  });


});


@Component({
  selector: 'test-menu',
  template: 'replaced by the test',
  directives: [MDL_MENU_DIRECTIVES]
})
class MdlTestMenuItemComponent {}
