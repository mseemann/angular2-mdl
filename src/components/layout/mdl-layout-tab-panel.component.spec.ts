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
import { MdlLayoutTabPanelComponent } from './mdl-layout-tab-panel.component';

describe('Component: MdlLayoutTabPanel', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-layout__tab-panel to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-layout-tab-panel>x</mdl-layout-tab-panel>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let tabPanelEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(tabPanelEl.classList.contains('mdl-layout__tab-panel')).toBe(true);

        done();
      });

  });

  it('should add the css class isActive to the host element if the panel is active', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-layout-tab-panel>x</mdl-layout-tab-panel>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let tabPanelComponent = fixture.debugElement.query(By.directive(MdlLayoutTabPanelComponent)).componentInstance;

        tabPanelComponent.isActive = true;
        fixture.detectChanges();

        let tabPanelEl: HTMLElement = fixture.nativeElement.children.item(0);

        expect(tabPanelEl.classList.contains('is-active')).toBe(true);

        done();
      });

  });

});


@Component({
  selector: 'test',
  template: 'replaced by the test',
  directives: [MdlLayoutTabPanelComponent]
})
class MdlTestComponent {}
