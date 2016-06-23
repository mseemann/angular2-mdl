import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MDL_COMMON_DIRECTIVES } from './../common/mdl-ripple.directive';

describe('Directive: MdlRipple', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  function getSpan1IfAny(fixture){
    let button = fixture.nativeElement.children.item(0);
    if(button.children.length === 0){
      return null;
    }
    let span0 = button.children.item(0);
    return span0.children.item(0);
  }

  it('should add the ripple span elements if mdl-ripple is empty', () => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <button mdl-ripple></button>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();


        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);
      })
  });

  it('should add the ripple if mdl-ripple is set to true', () => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <button [mdl-ripple]="true"></button>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);
      })
  })

  it('should not add ripple if mdl-ripple is set to false', () => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <button [mdl-ripple]="false"></button>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1).toBeNull();
      })
  })

  it('should remove the ripple if mdl-ripple is set to false', () => {
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
      })
  })

  it('should add the ripple to mdl-radio', () => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-radio mdl-ripple></mdl-radio>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);
      })
  });

  it('should add the ripple to mdl-icon-toggle', () => {
    return builder
      .overrideTemplate(MdlTestRippleComponent, `
          <mdl-icon-toggle mdl-ripple></mdl-icon-toggle>
        `)
      .createAsync(MdlTestRippleComponent).then( (fixture) => {

        fixture.detectChanges();

        let span1 = getSpan1IfAny(fixture);

        expect(span1.classList.contains('mdl-ripple')).toBe(true);
      })
  });
});


@Component({
  selector: 'test-ripple',
  template: "replaced by the test",
  directives: [MDL_COMMON_DIRECTIVES]
})
class MdlTestRippleComponent {
  doRipple = true;
}
