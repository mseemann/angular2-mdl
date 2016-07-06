import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { MdlShadowDirective } from './mdl-shadow.directive';

describe('Directive: MdlShadow', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-shadow--2dp to the host element', () => {

    return builder
      .overrideTemplate(MdlTestShadowComponent, `
          <span mdl-shadow="2"></span>
        `)
      .createAsync(MdlTestShadowComponent).then( (fixture) => {

        fixture.detectChanges();

        let spanEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(spanEl.classList.contains('mdl-shadow--2dp')).toBe(true);

      });
  });

  it('should change the class from mdl-shadow--2dp to mdl-shadow--4dp if the directive value changes', () => {

    return builder
      .overrideTemplate(MdlTestShadowComponent, `
          <span [mdl-shadow]="shadow"></span>
        `)
      .createAsync(MdlTestShadowComponent).then( (fixture) => {

        fixture.detectChanges();

        let spanEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(spanEl.classList.contains('mdl-shadow--2dp')).toBe(true);


        fixture.componentInstance.shadow = 4;
        fixture.detectChanges();
        expect(spanEl.classList.contains('mdl-shadow--4dp')).toBe(true);

      });
  });

  it('should throw if an unsupported shadow value is provided', () => {

    return builder
      .overrideTemplate(MdlTestShadowComponent, `
          <span mdl-shadow="200"></span>
        `)
      .createAsync(MdlTestShadowComponent).then( (fixture) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      });

  });

});


@Component({
  selector: 'test-shadow',
  template: 'replaced by the test',
  directives: [MdlShadowDirective]
})
class MdlTestShadowComponent {
  protected shadow = 2;
}
