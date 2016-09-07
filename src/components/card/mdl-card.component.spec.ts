import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlCardModule } from './mdl-card.component';

describe('Components: MdlCard*', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlCardModule],
      declarations: [TestApp],
    });
  });


  it('should add the css class mdl-card to the element', () => {

    let fixture = TestBed.createComponent(TestApp);
    fixture.detectChanges();

    let mdlCardElement = fixture.debugElement.query(By.css('mdl-card'));
    expect(mdlCardElement.nativeElement.classList.contains('mdl-card')).toBe(true);

    let mdlCardTitleElement = fixture.debugElement.query(By.css('mdl-card-title'));
    expect(mdlCardTitleElement.nativeElement.classList.contains('mdl-card__title')).toBe(true);

    let mdlCardMediaElement = fixture.debugElement.query(By.css('mdl-card-media'));
    expect(mdlCardMediaElement.nativeElement.classList.contains('mdl-card__media')).toBe(true);

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

  it('should throw if mdl-card-title has no mdl-card parent', () => {

    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-card-title></mdl-card-title>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() )
      .toThrow();

  });

  it('should throw if mdl-card-supporting-text has no mdl-card parent', () => {

    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-card-supporting-text></mdl-card-supporting-text>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() )
      .toThrow();

  });

  it('should throw if mdl-card-actions has no mdl-card parent', () => {

    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-card-actions></mdl-card-actions>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() )
      .toThrow();

  });

  it('should throw if mdl-card-menu has no mdl-card parent', () => {

    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-card-menu></mdl-card-menu>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() )
      .toThrow();

  });

  it('should throw if mdl-card-media has no mdl-card parent', () => {

    TestBed.overrideComponent(TestApp, { set: {
      template: '<mdl-card-media></mdl-card-media>' }
    });
    let fixture = TestBed.createComponent(TestApp);

    expect( () => fixture.detectChanges() )
      .toThrow();

  });

});

@Component({
  selector: 'test-app',
  template: `
    <mdl-card>
      <mdl-card-title mdl-card-expand><div mdl-card-title-text>test</div></mdl-card-title>
      <mdl-card-media></mdl-card-media>
      <mdl-card-supporting-text></mdl-card-supporting-text>
      <mdl-card-actions mdl-card-border></mdl-card-actions>
      <mdl-card-menu></mdl-card-menu>
    </mdl-card>
  `,
})
class TestApp {
}

