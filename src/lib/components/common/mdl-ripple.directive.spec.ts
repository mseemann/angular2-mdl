import {
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlRippleModule } from './mdl-ripple.directive';
import { MdlListModule, MdlListItemComponent } from '../list/mdl-list.component';
import { MdlMenuModule } from '../menu/index';

function getFiytureForTemplate(template) {
  TestBed.overrideComponent(MdlTestRippleComponent, { set: { template: template }});
  let fixture = TestBed.createComponent(MdlTestRippleComponent);
  fixture.detectChanges();
  return fixture;
}

describe('Directive: MdlRipple', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlRippleModule, MdlListModule, MdlMenuModule.forRoot()],
      declarations: [MdlTestRippleComponent],
    });
  });

  function getSpan1IfAny(fixture, elementName: string) {

    let rippleTarget = fixture.debugElement.query(By.css(elementName)).nativeElement;
    if (rippleTarget.children.length === 0) {
      return null;
    }
    let span0 = rippleTarget.children.item(0);
    return span0.children.item(0);
  }

  it('should add the ripple span elements if mdl-ripple is empty', () => {

    let fixture = getFiytureForTemplate('<mdl-button mdl-ripple></mdl-button>');

    let span1 = getSpan1IfAny(fixture, 'mdl-button');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });

  it('should add the ripple if mdl-ripple is set to true', () => {

    let fixture = getFiytureForTemplate('<mdl-button [mdl-ripple]="true"></mdl-button>');

    let span1 = getSpan1IfAny(fixture, 'mdl-button');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });


  it('should not add ripple if mdl-ripple is set to false', () => {
    let fixture = getFiytureForTemplate('<mdl-button [mdl-ripple]="false"></mdl-button>');

    let span1 = getSpan1IfAny(fixture, 'mdl-button');

    expect(span1).toBeNull();

  });

  it('should remove the ripple if mdl-ripple is set to false', () => {

    let fixture = getFiytureForTemplate('<mdl-checkbox [mdl-ripple]="doRipple"></mdl-checkbox>');

    expect(getSpan1IfAny(fixture, 'mdl-checkbox').classList.contains('mdl-ripple')).toBe(true);

    fixture.debugElement.componentInstance.doRipple = false;

    fixture.detectChanges();

    expect(getSpan1IfAny(fixture, 'mdl-checkbox')).toBeNull();

  });

  it('should add the ripple to button', () => {

    let fixture = getFiytureForTemplate('<button mdl-ripple></button>');

    let span1 = getSpan1IfAny(fixture, 'button');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);
  });

  it('should add the ripple to mdl-radio', () => {

    let fixture = getFiytureForTemplate('<mdl-radio mdl-ripple></mdl-radio>');

    let span1 = getSpan1IfAny(fixture, 'mdl-radio');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);
  });

  it('should add the ripple to mdl-icon-toggle', () => {

    let fixture = getFiytureForTemplate('<mdl-icon-toggle mdl-ripple></mdl-icon-toggle>');

    let span1 = getSpan1IfAny(fixture, 'mdl-icon-toggle');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });

  it('should add the ripple to mdl-switch', () => {

    let fixture = getFiytureForTemplate(' <mdl-switch mdl-ripple></mdl-switch>');

    let span1 = getSpan1IfAny(fixture, 'mdl-switch');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });

  it('should add the ripple to mdl-menu-item', () => {
    let fixture = getFiytureForTemplate(`
          <mdl-menu>
            <mdl-menu-item mdl-ripple></mdl-menu-item>
          </mdl-menu>
        `);

    let span1 = getSpan1IfAny(fixture, 'mdl-menu-item');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);
  });

  it('should add the ripple to anchor tag for tabs', () => {

    let fixture = getFiytureForTemplate('<a mdl-ripple></a>');

    let span1 = getSpan1IfAny(fixture, 'a');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);

  });

  it('should add the ripple tag for a', () => {

    let fixture = getFiytureForTemplate(`
         <a [mdl-ripple]="true"></a>
        `);

    let span1 = getSpan1IfAny(fixture, 'a');

    expect(span1.classList.contains('mdl-ripple')).toBe(true);
  });

});


@Component({
  selector: 'test-ripple',
  template: 'replaced by the test'
})
class MdlTestRippleComponent {
  protected doRipple = true;
}
