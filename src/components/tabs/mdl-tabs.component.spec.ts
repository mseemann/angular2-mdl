import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  MdlTabsModule,
  MdlTabsComponent
} from './index';

describe('Component: MdlTabs', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlTabsModule],
      declarations: [MdlTestComponent],
    });
  });

  it('should add the css class mdl-tabs to the host element', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-tabs>x</mdl-tabs>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let tabsEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(tabsEl.classList.contains('mdl-tabs')).toBe(true);

  });

  it('should activate the first tab if no index is set', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-tabs><mdl-tab-panel></mdl-tab-panel></mdl-tabs>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
        
    let mdlTabsComponent: MdlTabsComponent =
      fixture.debugElement.query(By.directive(MdlTabsComponent)).componentInstance;

    expect(mdlTabsComponent.selectedIndex).toBe(0);

  });

  it('should be possible to listen to chanegs to the active tab', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-tabs [mdl-tab-active-index]="1" (mdl-tab-active-changed)="tabChanged($event)">
            <mdl-tab-panel></mdl-tab-panel>
            <mdl-tab-panel></mdl-tab-panel>
          </mdl-tabs>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let testComponent = fixture.componentInstance;

    let mdlTabsComponent: MdlTabsComponent =
      fixture.debugElement.query(By.directive(MdlTabsComponent)).componentInstance;

    expect(mdlTabsComponent.selectedIndex).toBe(1);
    let aDebugElements = fixture.debugElement.queryAll(By.css('a'));

    // select the first tab
    aDebugElements[0].nativeElement.click();

    fixture.detectChanges();

    expect(mdlTabsComponent.selectedIndex).toBe(0);


    expect(testComponent.selectedIndexOutput).toBe(0);

    // click again should change nothing
    aDebugElements[0].nativeElement.click();
    expect(mdlTabsComponent.selectedIndex).toBe(0);

  });

  it('should be possible to create rich tabs', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-tabs [mdl-tab-active-index]="1" (mdl-tab-active-changed)="tabChanged($event)">
            <mdl-tab-panel>
              <mdl-tab-panel-title>
                <span class="test">Test</span>
              </mdl-tab-panel-title>
              <mdl-tab-panel-content>
                <span class="content">The content</span>
              </mdl-tab-panel-content>
            </mdl-tab-panel>
          </mdl-tabs>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    // the tab is now a div tag and not an a tag.
    let testElement = fixture.debugElement.query(By.css('.mdl-tabs__tab'));

    expect(testElement.nativeElement.nodeName).toBe('DIV');
  });
});


@Component({
  selector: 'test',
  template: 'replaced by the test'
})
class MdlTestComponent {

  public selectedIndexOutput: number;

  public tabChanged($event) {
    this.selectedIndexOutput = $event.index;
  }
}
