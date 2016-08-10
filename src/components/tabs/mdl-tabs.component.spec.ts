import {
  inject,
  TestComponentBuilder
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  MdlTabsComponent,
  MdlTabPanelComponent,
  MdlTabPanelTitleComponent
} from './index';

describe('Component: MdlTabs', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-tabs to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-tabs>x</mdl-tabs>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let tabsEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(tabsEl.classList.contains('mdl-tabs')).toBe(true);

        done();
      });

  });

  it('should activate the first tab if no index is set', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-tabs><mdl-tab-panel></mdl-tab-panel></mdl-tabs>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();
        
        let mdlTabsComponent: MdlTabsComponent =
          fixture.debugElement.query(By.directive(MdlTabsComponent)).componentInstance;
        
        expect(mdlTabsComponent.selectedIndex).toBe(0);

        done();
      });

  });

  it('should be possible to listen to chanegs to the active tab', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-tabs [mdl-tab-active-index]="1" (mdl-tab-active-changed)="tabChanged($event)">
            <mdl-tab-panel></mdl-tab-panel>
            <mdl-tab-panel></mdl-tab-panel>
          </mdl-tabs>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

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

        done();
      });
  });

  it('should be possible to create rich tabs', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
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
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

          fixture.detectChanges();

          // the tab is now a div tag and not an a tag.
          let testElement = fixture.debugElement.query(By.css('.mdl-tabs__tab'));
          expect(testElement.nativeElement.nodeName).toBe('DIV');

          done();
      });

  });
});


@Component({
  selector: 'test',
  template: 'replaced by the test',
  directives: [MdlTabsComponent, MdlTabPanelComponent, MdlTabPanelTitleComponent]
})
class MdlTestComponent {

  public selectedIndexOutput: number;

  public tabChanged($event) {
    this.selectedIndexOutput = $event.index;
  }
}
