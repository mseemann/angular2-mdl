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
import { MDL_CARD_DIRECTIVES } from './mdl-card.component';

describe('Components: MdlCard*', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-card to the element', () => {

    return builder
      .createAsync(TestApp).then( (fixture) => {

        fixture.detectChanges();

        let mdlCardElement = fixture.debugElement.query(By.css('mdl-card'));
        expect(mdlCardElement.nativeElement.classList.contains('mdl-card')).toBe(true);

        let mdlCardTitleElement = fixture.debugElement.query(By.css('mdl-card-title'));
        expect(mdlCardTitleElement.nativeElement.classList.contains('mdl-card__title')).toBe(true);

        let mdlCardSupportingTextElement = fixture.debugElement.query(By.css('mdl-card-supporting-text'));
        expect(mdlCardSupportingTextElement.nativeElement.classList.contains('mdl-card__supporting-text')).toBe(true);

        let mdlCardActionsElement = fixture.debugElement.query(By.css('mdl-card-actions'));
        expect(mdlCardActionsElement.nativeElement.classList.contains('mdl-card__actions')).toBe(true);

        let mdlCardMenuElement = fixture.debugElement.query(By.css('mdl-card-menu'));
        expect(mdlCardMenuElement.nativeElement.classList.contains('mdl-card__menu')).toBe(true);

        let mdlCardTitleTextElement = fixture.debugElement.query(By.css('[mdl-card-title-text]'));
        expect(mdlCardTitleTextElement.nativeElement.classList.contains('mdl-card__title-text')).toBe(true);

        let mdlCardBorderElement = fixture.debugElement.query(By.css('[mdl-card-border]'));
        expect(mdlCardBorderElement.nativeElement.classList.contains('mdl-card--border')).toBe(true);

        let mdlCardExpandElement = fixture.debugElement.query(By.css('[mdl-card-expand]'));
        expect(mdlCardExpandElement.nativeElement.classList.contains('mdl-card--expand')).toBe(true);

      });
  });

  it('should throw if mdl-card-title has no mdl-card parent', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-card-title></mdl-card-title>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should throw if mdl-card-supporting-text has no mdl-card parent', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-card-supporting-text></mdl-card-supporting-text>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should throw if mdl-card-actions has no mdl-card parent', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-card-actions></mdl-card-actions>
        `)
      .createAsync(TestApp).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });
  });

  it('should throw if mdl-card-menu has no mdl-card parent', () => {
    return builder
      .overrideTemplate(TestApp, `
          <mdl-card-menu></mdl-card-menu>
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
    <mdl-card>
      <mdl-card-title mdl-card-expand><div mdl-card-title-text>test</div></mdl-card-title>
      <mdl-card-supporting-text></mdl-card-supporting-text>
      <mdl-card-actions mdl-card-border></mdl-card-actions>
      <mdl-card-menu></mdl-card-menu>
    </mdl-card>
  `,
  directives: [MDL_CARD_DIRECTIVES]
})
class TestApp {
}

