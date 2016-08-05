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
import {
  MdlTabPanelComponent,
  MdlTabsComponent,
  MDL_TABS_DIRECTIVES
} from './index';

describe('Component: MdlTabsPanel', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-tabs__panel to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-tab-panel>x</mdl-tab-panel>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let tabPanelEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(tabPanelEl.classList.contains('mdl-tabs__panel')).toBe(true);

        done();
      });

  });

  it('should add the css class isActive to the host element if the panel is active', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-tab-panel>x</mdl-tab-panel>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let tabPanelComponent = fixture.debugElement.query(By.directive(MdlTabPanelComponent)).componentInstance;

        tabPanelComponent.isActive = true;
        fixture.detectChanges();

        let tabPanelEl: HTMLElement = fixture.nativeElement.children.item(0);

        expect(tabPanelEl.classList.contains('is-active')).toBe(true);

        done();
      });

  });

  it('should activate the selected tab if the selectedIndex changed programmatically', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-tabs [mdl-tab-active-index]="activeIndex" >
               <mdl-tab-panel mdl-tab-panel-title="t1"></mdl-tab-panel>
               <mdl-tab-panel mdl-tab-panel-titlex="t2"></mdl-tab-panel>
          </mdl-tabs>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        expect(fixture.componentInstance.activeIndex).toBe(0);

        fixture.componentInstance.activeIndex = 1;

        fixture.detectChanges();

        let mdlLayoutComponent: MdlTabsComponent =
          fixture.debugElement.query(By.directive(MdlTabsComponent)).componentInstance;

        expect(mdlLayoutComponent.selectedIndex).toBe(1);

        done();
      });

  });

});


@Component({
  selector: 'test',
  template: 'replaced by the test',
  directives: [MDL_TABS_DIRECTIVES]
})
class MdlTestComponent {
  public activeIndex = 0;
}
