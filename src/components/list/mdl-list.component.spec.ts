import {
  inject,
  TestComponentBuilder
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MDL_LIST_DIRECTIVES } from './mdl-list.component';

describe('Components: MdlList*', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-list to the element', () => {

    return builder
      .createAsync(TestApp).then( (fixture) => {

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
  });

  it('should throw if mdl-list-item has no mdl-list parent', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-list-item></mdl-list-item>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should throw if mdl-list-item-primary-content has no mdl-list-item parent', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-list-item-primary-content></mdl-list-item-primary-content>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should throw if mdl-list-item-secondary-content has no mdl-list-item parent', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-list-item-secondary-content></mdl-list-item-secondary-content>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should throw if mdl-list-item-secondary-action has no mdl-list-item parent', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-list-item-secondary-action></mdl-list-item-secondary-action>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should throw if mdl-list-item-sub-title has no mdl-list-item-primary-content', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-list-item-sub-title></mdl-list-item-sub-title>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should throw if mdl-list-item-secondary-info has no mdl-list-item-secondary-content', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-list-item-secondary-info></mdl-list-item-secondary-info>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should throw if mdl-list-item-text-body has no mdl-list-item', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-list-item-text-body></mdl-list-item-text-body>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should only support max 3 lines', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-list-item lines="4"></mdl-list-item>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
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
  `,
  directives: [MDL_LIST_DIRECTIVES]
})
class TestApp {
}

