import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import {
  MdlTabPanelComponent,
  MdlTabsComponent,
  MdlTabsModule
} from './index';

describe('Component: MdlTabsPanel', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlTabsModule ],
      declarations: [ MdlTestComponent ],
    });
  });

  it('should add the css class mdl-tabs__panel to the host element', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-tab-panel>x</mdl-tab-panel>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let tabPanelEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(tabPanelEl.classList.contains('mdl-tabs__panel')).toBe(true);

  });

  it('should add the css class isActive to the host element if the panel is active', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-tab-panel>x</mdl-tab-panel>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let tabPanelComponent = fixture.debugElement.query(By.directive(MdlTabPanelComponent)).componentInstance;

    tabPanelComponent.isActive = true;
    fixture.detectChanges();

    let tabPanelEl: HTMLElement = fixture.nativeElement.children.item(0);

    expect(tabPanelEl.classList.contains('is-active')).toBe(true);

  });

  it('should activate the selected tab if the selectedIndex changed programmatically', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-tabs [mdl-tab-active-index]="activeIndex" >
               <mdl-tab-panel mdl-tab-panel-title="t1"></mdl-tab-panel>
               <mdl-tab-panel mdl-tab-panel-titlex="t2"></mdl-tab-panel>
          </mdl-tabs>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.activeIndex).toBe(0);

    fixture.componentInstance.activeIndex = 1;

    fixture.detectChanges();

    let mdlLayoutComponent: MdlTabsComponent =
      fixture.debugElement.query(By.directive(MdlTabsComponent)).componentInstance;

    expect(mdlLayoutComponent.selectedIndex).toBe(1);

  });

});


@Component({
  selector: 'test',
  template: 'replaced by the test'
})
class MdlTestComponent {
  public activeIndex = 0;
}
