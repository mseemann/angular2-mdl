import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {MdlTabsComponent, MdlTabsModule} from './mdl-tabs.module';
import {MdlAnchorRippleDirective} from '../ripple/mdl-ripple.directive';
import {MdlTabPanelComponent} from './mdl-tab-panel.component';
import {Component} from '@angular/core';


@Component({
  // eslint-disable-next-line
  selector: 'test',
  template: 'replaced by the test'
})
class MdlTestComponent {

  public selectedIndexOutput: number;

  public tabs = ['1', '2'];

  public tabChanged($event) {
    this.selectedIndexOutput = $event.index;
  }
}

describe('Component: MdlTabs', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlTabsModule.forRoot()],
      declarations: [MdlTestComponent],
    });
  });

  it('should add the css class mdl-tabs to the host element', () => {

    TestBed.overrideComponent(MdlTestComponent, {
      set: {
        template: '<mdl-tabs>x</mdl-tabs>'
      }
    });
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const tabsEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(tabsEl.classList.contains('mdl-tabs')).toBe(true);

  });

  it('should activate the first tab if no index is set', () => {

    TestBed.overrideComponent(MdlTestComponent, {
      set: {
        template: '<mdl-tabs><mdl-tab-panel></mdl-tab-panel></mdl-tabs>'
      }
    });
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const mdlTabsComponent: MdlTabsComponent =
      fixture.debugElement.query(By.directive(MdlTabsComponent)).componentInstance;

    expect(mdlTabsComponent.selectedIndex).toBe(0);

  });

  it('should be possible to listen to chanegs to the active tab', () => {

    TestBed.overrideComponent(MdlTestComponent, {
      set: {
        template: `
          <mdl-tabs [mdl-tab-active-index]="1" (mdl-tab-active-changed)="tabChanged($event)">
            <mdl-tab-panel></mdl-tab-panel>
            <mdl-tab-panel></mdl-tab-panel>
          </mdl-tabs>
        `
      }
    });
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const testComponent = fixture.componentInstance;

    const mdlTabsComponent: MdlTabsComponent =
      fixture.debugElement.query(By.directive(MdlTabsComponent)).componentInstance;

    expect(mdlTabsComponent.selectedIndex).toBe(1);
    const aDebugElements = fixture.debugElement.queryAll(By.css('a'));

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

    TestBed.overrideComponent(MdlTestComponent, {
      set: {
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
        `
      }
    });
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    // the tab is now a div tag and not an a tag.
    const testElement = fixture.debugElement.query(By.css('.mdl-tabs__tab'));

    expect(testElement.nativeElement.nodeName).toBe('DIV');
  });

  it('should recognize enabled/disabled tabs', () => {
    TestBed.overrideComponent(MdlTestComponent, {
      set: {
        template: `
          <mdl-tabs [mdl-tab-active-index]="1" (mdl-tab-active-changed)="tabChanged($event)">
            <mdl-tab-panel></mdl-tab-panel>
            <mdl-tab-panel [disabled]="true"></mdl-tab-panel>
          </mdl-tabs>
        `
      }
    });


    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    const testElement = fixture.nativeElement.querySelector('.mdl-tabs__tab.disabled');

    expect(testElement.nodeName).toBe('A');
  });


  it('should not bepossible to to select a disabled tab', () => {

    TestBed.overrideComponent(MdlTestComponent, {
      set: {
        template: `
          <mdl-tabs [mdl-tab-active-index]="0" (mdl-tab-active-changed)="tabChanged($event)">
            <mdl-tab-panel></mdl-tab-panel>
            <mdl-tab-panel></mdl-tab-panel>
            <mdl-tab-panel [disabled]="true"></mdl-tab-panel>
            <mdl-tab-panel [disabled]="true">
              <mdl-tab-panel-title>
                <span class="test">Test</span>
              </mdl-tab-panel-title>
            </mdl-tab-panel>
          </mdl-tabs>
        `
      }
    });
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const mdlTabsComponent: MdlTabsComponent =
      fixture.debugElement.query(By.directive(MdlTabsComponent)).componentInstance;

    const aDebugElements = fixture.debugElement.queryAll(By.css('a.disabled'));

    aDebugElements[0].nativeElement.click();

    fixture.detectChanges();

    expect(mdlTabsComponent.selectedIndex).toBe(0);


    const titleDebugElements = fixture.debugElement.queryAll(By.css('div.disabled'));

    titleDebugElements[0].nativeElement.click();

    fixture.detectChanges();

    expect(mdlTabsComponent.selectedIndex).toBe(0);
  });

  it('should be possible to create a ripple tab', () => {

    TestBed.overrideComponent(MdlTestComponent, {
      set: {
        template: '<mdl-tabs mdl-ripple="true"><mdl-tab-panel></mdl-tab-panel></mdl-tabs>'
      }
    });
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const rippleDirective = fixture.debugElement.query(By.directive(MdlAnchorRippleDirective));

    expect(rippleDirective).toBeDefined();
  });

  it('should be possible to change the tab count', () => {

    TestBed.overrideComponent(MdlTestComponent, {
      set: {
        template: `
          <mdl-tabs>
            <mdl-tab-panel *ngFor="let tab of tabs">{{tab}}</mdl-tab-panel>
          </mdl-tabs>
        `
      }
    });
    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const testComponent = fixture.componentInstance;

    let debugElements = fixture.debugElement.queryAll(By.directive(MdlTabPanelComponent));
    expect(debugElements.length).toBe(2);

    testComponent.tabs.push('3');

    fixture.detectChanges();

    debugElements = fixture.debugElement.queryAll(By.directive(MdlTabPanelComponent));
    expect(debugElements.length).toBe(3);
  });

});
