import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MdlCommonsModule} from '../common/mdl-common.module';
import {MdlRippleModule} from './mdl-ripple.module';
import {MdlListModule} from '../list/mdl-list.module';
import {MdlMenuModule} from '../menu/mdl-menu.module';


@Component({
  // eslint-disable-next-line
  selector: 'test-ripple',
  template: 'replaced by the test'
})
class MdlTestRippleComponent {
  protected doRipple = true;
}


const getFiytureForTemplate = (template) => {
  TestBed.overrideComponent(MdlTestRippleComponent, {set: {template}});
  const fixture = TestBed.createComponent(MdlTestRippleComponent);
  fixture.detectChanges();
  return fixture;
};

describe('Directive: MdlRipple', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlCommonsModule, MdlListModule, MdlMenuModule.forRoot(), MdlRippleModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [MdlTestRippleComponent],
    });
  });

  const getSpan1IfAny = (fixture, elementName: string) => {

    const rippleTarget = fixture.debugElement.query(By.css(elementName)).nativeElement;
    if (rippleTarget.children.length === 0) {
      return null;
    }
    const span0 = rippleTarget.children.item(0);
    return span0.children.item(0);
  };

  it('should add the ripple span elements if mdl-ripple is empty', () => {

    const fixture = getFiytureForTemplate('<mdl-button mdl-ripple></mdl-button>');

    const span1 = getSpan1IfAny(fixture, 'mdl-button');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });

  it('should add the ripple if mdl-ripple is set to true', () => {

    const fixture = getFiytureForTemplate('<mdl-button [mdl-ripple]="true"></mdl-button>');

    const span1 = getSpan1IfAny(fixture, 'mdl-button');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });


  it('should not add ripple if mdl-ripple is set to false', () => {
    const fixture = getFiytureForTemplate('<mdl-button [mdl-ripple]="false"></mdl-button>');

    const span1 = getSpan1IfAny(fixture, 'mdl-button');

    expect(span1).toBeNull();

  });

  it('should remove the ripple if mdl-ripple is set to false', () => {

    const fixture = getFiytureForTemplate('<mdl-checkbox [mdl-ripple]="doRipple"></mdl-checkbox>');

    expect(getSpan1IfAny(fixture, 'mdl-checkbox').classList.contains('mdl-ripple')).toBe(true);

    fixture.debugElement.componentInstance.doRipple = false;

    fixture.detectChanges();

    expect(getSpan1IfAny(fixture, 'mdl-checkbox')).toBeNull();

  });

  it('should add the ripple to button', () => {

    const fixture = getFiytureForTemplate('<button mdl-ripple></button>');

    const span1 = getSpan1IfAny(fixture, 'button');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);
  });

  it('should add the ripple to mdl-radio', () => {

    const fixture = getFiytureForTemplate('<mdl-radio mdl-ripple></mdl-radio>');

    const span1 = getSpan1IfAny(fixture, 'mdl-radio');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);
  });

  it('should add the ripple to mdl-icon-toggle', () => {

    const fixture = getFiytureForTemplate('<mdl-icon-toggle mdl-ripple></mdl-icon-toggle>');

    const span1 = getSpan1IfAny(fixture, 'mdl-icon-toggle');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });

  it('should add the ripple to mdl-switch', () => {

    const fixture = getFiytureForTemplate(' <mdl-switch mdl-ripple></mdl-switch>');

    const span1 = getSpan1IfAny(fixture, 'mdl-switch');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });

  it('should add the ripple to mdl-menu-item', () => {
    const fixture = getFiytureForTemplate(`
          <mdl-menu>
            <mdl-menu-item mdl-ripple></mdl-menu-item>
          </mdl-menu>
        `);

    const span1 = getSpan1IfAny(fixture, 'mdl-menu-item');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);
  });

  it('should add the ripple to anchor tag for tabs', () => {

    const fixture = getFiytureForTemplate('<a mdl-ripple></a>');

    const span1 = getSpan1IfAny(fixture, 'a');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });

  it('should add the ripple tag for a', () => {

    const fixture = getFiytureForTemplate(`
         <a [mdl-ripple]="true"></a>
        `);

    const span1 = getSpan1IfAny(fixture, 'a');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);
  });

});
