import {
  describe,
  expect,
  it,
  inject,
  tick,
  beforeEach
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Optional } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MdlBadgeDirective, MdlBadgeNoBackgroundDirective, MdlBadgeOverlapDirective } from './mdl-badge.directive';

describe('Directive: MdlBadge', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-badge and the attribute data-badge to the host element', () => {

    return builder
      .overrideTemplate(MdlTestBadgeComponent, `
          <span mdl-badge="3"></span>
        `)
      .createAsync(MdlTestBadgeComponent).then( (fixture) => {

        fixture.detectChanges();

        let spanEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(spanEl.classList.contains('mdl-badge')).toBe(true);

        expect(spanEl.getAttribute('data-badge')).toBe("3");

      })
  });

  it('should add the class mdl-badge--overlap and mdl-badge-no-background to the host element', () => {
    return builder
      .overrideTemplate(MdlTestBadgeComponent, `
          <span mdl-badge="3" mdl-badge-no-background mdl-badge-overlap></span>
        `)
      .createAsync(MdlTestBadgeComponent).then( (fixture) => {

        fixture.detectChanges();

        let spanEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(spanEl.classList.contains('mdl-badge')).toBe(true);
        expect(spanEl.classList.contains('mdl-badge--overlap')).toBe(true);
        expect(spanEl.classList.contains('mdl-badge--no-background')).toBe(true);


      })
  })


});


@Component({
  selector: 'test-badge',
  template: "replaced by the test",
  directives: [MdlBadgeDirective, MdlBadgeNoBackgroundDirective, MdlBadgeOverlapDirective]
})
class MdlTestBadgeComponent {}
