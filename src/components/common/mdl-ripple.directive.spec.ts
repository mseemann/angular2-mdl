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
import { MDL_COMMON_DIRECTIVES } from './../common/mdl-ripple.directive';
import {MDL_LIST_DIRECTIVES, MdlListItemComponent} from './../list/mdl-list.component';

describe('Directive: MdlRipple', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  function getSpan1IfAny(fixture) {

    let rippleTarget = fixture.debugElement.query(By.css('[ng-reflect-ripple-active]')).nativeElement;
    if (rippleTarget.children.length === 0) {
      return null;
    }
    let span0 = rippleTarget.children.item(0);
    return span0.children.item(0);
  }

  it('should add the ripple span elements if mdl-ripple is empty', ( done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-button mdl-ripple></mdl-button>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);

        done();
      });
  });

  it('should add the ripple if mdl-ripple is set to true', ( done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-button [mdl-ripple]="true"></mdl-button>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);

        done();
      });
  });

  it('should not add ripple if mdl-ripple is set to false', ( done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-button [mdl-ripple]="false"></mdl-button>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1).toBeNull();

        done();
      });
  });

  it('should remove the ripple if mdl-ripple is set to false', ( done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-checkbox [mdl-ripple]="doRipple"></mdl-checkbox>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        expect(getSpan1IfAny(fixture).classList.contains('mdl-ripple')).toBe(true);

        fixture.debugElement.componentInstance.doRipple = false;

        fixture.detectChanges();

        expect(getSpan1IfAny(fixture)).toBeNull();

        done();
      });
  });

  it('should add the ripple to mdl-radio', ( done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-radio mdl-ripple></mdl-radio>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);

        done();
      });
  });

  it('should add the ripple to mdl-icon-toggle', (done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-icon-toggle mdl-ripple></mdl-icon-toggle>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);

        done();
      });
  });

  it('should add the ripple to mdl-switch', ( done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-switch mdl-ripple></mdl-switch>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);

        done();
      });
  });

  it('should add the ripple to mdl-menu-item', ( done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-menu>
            <mdl-menu-item mdl-ripple></mdl-menu-item>
          </mdl-menu>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);

        done();
      });
  });

  it('should add the ripple to anchor tag for tabs', ( done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
            <a mdl-ripple></a>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);

        done();
      });
  });

  it('should add the ripple to mdl-list-item tag for tabs', ( done ) => {
    builder
      .overrideTemplate(MdlTestRippleComponent, `
         <mdl-list>
            <mdl-list-item mdl-ripple></mdl-list-item>
          </mdl-list>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);

        done();
      });
  });

  it('should make the mdl-list-items css style position to relative', ( done ) => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
         <mdl-list>
            <mdl-list-item [mdl-ripple]="true"></mdl-list-item>
          </mdl-list>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let mdlListItemElement: HTMLElement = fixture.debugElement
          .query(By.directive(MdlListItemComponent)).nativeElement;

        expect(mdlListItemElement.style.position).toBe('relative');

        done();
      });
  });

  it('should add the ripple toa tag for', ( done ) => {
    builder
      .overrideTemplate(MdlTestRippleComponent, `
           <a [mdl-ripple]="true"></a>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

      fixture.detectChanges();

      let span1 = getSpan1IfAny(fixture);

      expect(span1.classList.contains('mdl-ripple')).toBe(true);

      done();
    });
  });

});


@Component({
  selector: 'test-ripple',
  template: 'replaced by the test',
  directives: [ MDL_COMMON_DIRECTIVES, MDL_LIST_DIRECTIVES]
})
class MdlTestRippleComponent {
  protected doRipple = true;
}
