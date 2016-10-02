import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlLayoutModule, MdlLayoutTabPanelComponent } from './index';

describe('Component: MdlLayoutTabPanel', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlLayoutModule ],
      declarations: [ MdlTestComponent ]
    });
  });

  it('should add the css class mdl-layout__tab-panel to the host element', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-layout-tab-panel>x</mdl-layout-tab-panel>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let tabPanelEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(tabPanelEl.classList.contains('mdl-layout__tab-panel')).toBe(true);

  });

  it('should add the css class isActive to the host element if the panel is active', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-layout-tab-panel>x</mdl-layout-tab-panel>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let tabPanelComponent = fixture.debugElement.query(By.directive(MdlLayoutTabPanelComponent)).componentInstance;

    tabPanelComponent.isActive = true;
    fixture.detectChanges();

    let tabPanelEl: HTMLElement = fixture.nativeElement.children.item(0);

    expect(tabPanelEl.classList.contains('is-active')).toBe(true);

  });

});


@Component({
  selector: 'test',
  template: 'replaced by the test'
})
class MdlTestComponent {}
