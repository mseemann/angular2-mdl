import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlListModule } from './mdl-list.component';

describe('Components: MdlList*', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlListModule],
      declarations: [ TestApp ],
    });
  });

  it('should add the css class mdl-list to the element', () => {

    let fixture = TestBed.createComponent(TestApp);
    fixture.detectChanges();

    let mdlListElement = fixture.debugElement.query(By.css('mdl-list'));
    expect(mdlListElement
      .nativeElement.classList.contains('mdl-list')).toBe(true);

    let mdlListItemElement = fixture.debugElement.query(By.css('mdl-list-item'));
    expect(mdlListItemElement
      .nativeElement.classList.contains('mdl-list__item')).toBe(true);

    let mdlListItemPrimaryContentElement = fixture.debugElement.query(By.css('mdl-list-item-primary-content'));
    expect(mdlListItemPrimaryContentElement
      .nativeElement.classList.contains('mdl-list__item-primary-content')).toBe(true);

    let mdlListItemSecondaryContentElement = fixture.debugElement.query(By.css('mdl-list-item-secondary-content'));
    expect(mdlListItemSecondaryContentElement
      .nativeElement.classList.contains('mdl-list__item-secondary-content')).toBe(true);

    let mdlListIconElement = fixture.debugElement.query(By.css('#icon1'));
    expect(mdlListIconElement
      .nativeElement.classList.contains('mdl-list__item-icon')).toBe(true);

    let mdlListIconAvatarElement = fixture.debugElement.query(By.css('#icon2'));
    expect(mdlListIconAvatarElement
      .nativeElement.classList.contains('mdl-list__item-avatar')).toBe(true);

    let mdlListItemSecondaryActionElement = fixture.debugElement.query(By.css('mdl-list-item-secondary-action'));
    expect(mdlListItemSecondaryActionElement
      .nativeElement.classList.contains('mdl-list__item-secondary-action')).toBe(true);

    let mdlListItemSubTitleElement = fixture.debugElement.query(By.css('mdl-list-item-sub-title'));
    expect(mdlListItemSubTitleElement
      .nativeElement.classList.contains('mdl-list__item-sub-title')).toBe(true);

    let mdlListItemSecondaryInfoElement = fixture.debugElement.query(By.css('mdl-list-item-secondary-info'));
    expect(mdlListItemSecondaryInfoElement
      .nativeElement.classList.contains('mdl-list__item-secondary-info')).toBe(true);

    let mdlListItemtextBodyElement = fixture.debugElement.query(By.css('mdl-list-item-text-body'));
    expect(mdlListItemtextBodyElement
      .nativeElement.classList.contains('mdl-list__item-text-body')).toBe(true);

  });

  it('should throw if mdl-list-item has no mdl-list parent', () => {

    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-list-item></mdl-list-item>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() ).toThrow();

  });

  it('should throw if mdl-list-item-primary-content has no mdl-list-item parent', () => {
    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-list-item-primary-content></mdl-list-item-primary-content>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() ).toThrow();

  });

  it('should throw if mdl-list-item-secondary-content has no mdl-list-item parent', () => {
    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-list-item-secondary-content></mdl-list-item-secondary-content>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() ).toThrow();

  });

  it('should throw if mdl-list-item-secondary-action has no mdl-list-item parent', () => {
    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-list-item-secondary-action></mdl-list-item-secondary-action>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() ).toThrow();

  });

  it('should throw if mdl-list-item-sub-title has no mdl-list-item-primary-content', () => {
    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-list-item-sub-title></mdl-list-item-sub-title>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() ).toThrow();

  });

  it('should throw if mdl-list-item-secondary-info has no mdl-list-item-secondary-content', () => {
    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-list-item-secondary-info></mdl-list-item-secondary-info>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() ).toThrow();

  });

  it('should throw if mdl-list-item-text-body has no mdl-list-item', () => {
    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-list-item-text-body></mdl-list-item-text-body>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() ).toThrow();

  });

  it('should only support max 3 lines', () => {
    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-list-item lines="4"></mdl-list-item>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() ).toThrow();
  });

});

@Component({
  selector: 'test-app',
  template: `
    <mdl-list>
      <mdl-list-item lines="3">
        <mdl-list-item-primary-content>
          <mdl-icon mdl-list-item-icon id="icon1"></mdl-icon>
          <mdl-icon mdl-list-item-avatar id="icon2"></mdl-icon>
          <mdl-list-item-sub-title></mdl-list-item-sub-title>
          <mdl-list-item-text-body></mdl-list-item-text-body>
        </mdl-list-item-primary-content>
        <mdl-list-item-secondary-content>
          <mdl-list-item-secondary-info></mdl-list-item-secondary-info>
        </mdl-list-item-secondary-content>
        <mdl-list-item-secondary-action>
        
        </mdl-list-item-secondary-action>
      </mdl-list-item>
    </mdl-list>
  `
})
class TestApp {
}

