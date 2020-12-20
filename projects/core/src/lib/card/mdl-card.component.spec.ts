import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {MdlCardModule} from './mdl-card.module';


@Component({
  // eslint-disable-next-line
  selector: 'test-app',
  template: `
    <mdl-card>
      <mdl-card-title mdl-card-expand>
        <div mdl-card-title-text>test</div>
      </mdl-card-title>
      <mdl-card-media></mdl-card-media>
      <mdl-card-supporting-text></mdl-card-supporting-text>
      <mdl-card-actions mdl-card-border></mdl-card-actions>
      <mdl-card-menu></mdl-card-menu>
    </mdl-card>
  `,
})
class TestAppComponent {
}


describe('Components: MdlCard*', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlCardModule.forRoot()],
      declarations: [TestAppComponent],
    });
  });


  it('should add the css class mdl-card to the element', () => {

    const fixture = TestBed.createComponent(TestAppComponent);
    fixture.detectChanges();

    const mdlCardElement = fixture.debugElement.query(By.css('mdl-card'));
    expect(mdlCardElement.nativeElement.classList.contains('mdl-card')).toBe(true);

    const mdlCardTitleElement = fixture.debugElement.query(By.css('mdl-card-title'));
    expect(mdlCardTitleElement.nativeElement.classList.contains('mdl-card__title')).toBe(true);

    const mdlCardMediaElement = fixture.debugElement.query(By.css('mdl-card-media'));
    expect(mdlCardMediaElement.nativeElement.classList.contains('mdl-card__media')).toBe(true);

    const mdlCardSupportingTextElement = fixture.debugElement.query(By.css('mdl-card-supporting-text'));
    expect(mdlCardSupportingTextElement.nativeElement.classList.contains('mdl-card__supporting-text')).toBe(true);

    const mdlCardActionsElement = fixture.debugElement.query(By.css('mdl-card-actions'));
    expect(mdlCardActionsElement.nativeElement.classList.contains('mdl-card__actions')).toBe(true);

    const mdlCardMenuElement = fixture.debugElement.query(By.css('mdl-card-menu'));
    expect(mdlCardMenuElement.nativeElement.classList.contains('mdl-card__menu')).toBe(true);

    const mdlCardTitleTextElement = fixture.debugElement.query(By.css('[mdl-card-title-text]'));
    expect(mdlCardTitleTextElement.nativeElement.classList.contains('mdl-card__title-text')).toBe(true);

    const mdlCardBorderElement = fixture.debugElement.query(By.css('[mdl-card-border]'));
    expect(mdlCardBorderElement.nativeElement.classList.contains('mdl-card--border')).toBe(true);

    const mdlCardExpandElement = fixture.debugElement.query(By.css('[mdl-card-expand]'));
    expect(mdlCardExpandElement.nativeElement.classList.contains('mdl-card--expand')).toBe(true);

  });

  it('should throw if mdl-card-title has no mdl-card parent', () => {

    TestBed.overrideComponent(TestAppComponent, {
      set: {
        template: '<mdl-card-title></mdl-card-title>'
      }
    });
    const fixture = TestBed.createComponent(TestAppComponent);

    expect(() => fixture.detectChanges())
      .toThrow();

  });

  it('should throw if mdl-card-supporting-text has no mdl-card parent', () => {

    TestBed.overrideComponent(TestAppComponent, {
      set: {
        template: '<mdl-card-supporting-text></mdl-card-supporting-text>'
      }
    });
    const fixture = TestBed.createComponent(TestAppComponent);

    expect(() => fixture.detectChanges())
      .toThrow();

  });

  it('should throw if mdl-card-actions has no mdl-card parent', () => {

    TestBed.overrideComponent(TestAppComponent, {
      set: {
        template: '<mdl-card-actions></mdl-card-actions>'
      }
    });
    const fixture = TestBed.createComponent(TestAppComponent);

    expect(() => fixture.detectChanges())
      .toThrow();

  });

  it('should throw if mdl-card-menu has no mdl-card parent', () => {

    TestBed.overrideComponent(TestAppComponent, {
      set: {
        template: '<mdl-card-menu></mdl-card-menu>'
      }
    });
    const fixture = TestBed.createComponent(TestAppComponent);

    expect(() => fixture.detectChanges())
      .toThrow();

  });

  it('should throw if mdl-card-media has no mdl-card parent', () => {

    TestBed.overrideComponent(TestAppComponent, {
      set: {
        template: '<mdl-card-media></mdl-card-media>'
      }
    });
    const fixture = TestBed.createComponent(TestAppComponent);

    expect(() => fixture.detectChanges())
      .toThrow();

  });

});

