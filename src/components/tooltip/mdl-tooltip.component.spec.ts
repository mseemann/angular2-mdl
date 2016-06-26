import {
  describe,
  expect,
  it,
  inject,
  tick,
  flushMicrotasks,
  beforeEach,
  fakeAsync
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component, Optional } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import {
  MDL_TOOLTIP_DIRECTIVES,
  MdlTooltipComponent,
  MdlSimpleTooltipComponent,
  MdlTooltipDirective
} from './mdl-tooltip.component';

describe('Component: MdlIcon', () => {

  var builder: TestComponentBuilder;
  var doc:HTMLDocument;

  beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
    builder = tcb;
    doc = document;
  }));

  it('should add the css class mdl-tooltip to the host element', () => {

    return builder
      .overrideTemplate(MdlTestTooltipComponent, `
          <mdl-tooltip>x</mdl-tooltip>
        `)
      .createAsync(MdlTestTooltipComponent).then( (fixture) => {

        fixture.detectChanges();

        let tooltipEl:HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;
        expect(tooltipEl.classList.contains('mdl-tooltip')).toBe(true);

      })
  });

  it('should add the css class mdl-tooltip--large to the host element', () => {

    return builder
      .overrideTemplate(MdlTestTooltipComponent, `
          <div [mdl-tooltip-large]="t"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `)
      .createAsync(MdlTestTooltipComponent).then( (fixture) => {

        fixture.detectChanges();


        let tooltipEl:HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;
        expect(tooltipEl.classList.contains('mdl-tooltip--large')).toBe(true);

      })
  });

  it('should add create a simpletooltipcomponent for the mdl-tooltip directive with text', ( done ) => {

    return builder
      .overrideTemplate(MdlTestTooltipComponent, `
          <div mdl-tooltip="test"></div>
        `)
      .createAsync(MdlTestTooltipComponent).then((fixture) => {

        fixture.detectChanges();

        // wait for async component creation
        setTimeout( ()=>{
          // let angular prepare the tooltip with class and text
          fixture.detectChanges();
          // check the result
          let tooltipEl:HTMLElement = fixture.debugElement.query(By.directive(MdlSimpleTooltipComponent)).nativeElement;
          expect(tooltipEl.classList.contains('mdl-tooltip')).toBe(true);

          done();
        }, 0);

      })
  });

  it('should add the css class is-active if the mous enters the directive element', () => {

    return builder
      .overrideTemplate(MdlTestTooltipComponent, `
          <div [mdl-tooltip]="t" mdl-tooltip-position="left"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `)
      .createAsync(MdlTestTooltipComponent).then( (fixture) => {

        fixture.detectChanges();

        let tooltipTriggerElement = fixture.debugElement.query(By.directive(MdlTooltipDirective)).nativeElement;

        var evt = doc.createEvent('HTMLEvents');
        evt.initEvent('mouseenter', true, true);
        tooltipTriggerElement.dispatchEvent(evt);

        let tooltipEl:HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;
        expect(tooltipEl.classList.contains('is-active')).toBe(true);
      })
  });

  it('should remove the css class is-active if the mous leaves the directive element', () => {

    return builder
      .overrideTemplate(MdlTestTooltipComponent, `
          <div [mdl-tooltip]="t"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `)
      .createAsync(MdlTestTooltipComponent).then( (fixture) => {

        fixture.detectChanges();

        let tooltipTriggerElement = fixture.debugElement.query(By.directive(MdlTooltipDirective)).nativeElement;

        let evt = doc.createEvent('HTMLEvents');
        evt.initEvent('mouseleave', true, true);
        tooltipTriggerElement.dispatchEvent(evt);

        let tooltipEl:HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;
        expect(tooltipEl.classList.contains('is-active')).toBe(false);
      })
  });

  it('should add the css class mdl-tooltip--right if the position is set to right', () => {

    return builder
      .overrideTemplate(MdlTestTooltipComponent, `
          <div [mdl-tooltip]="t" mdl-tooltip-position="right"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `)
      .createAsync(MdlTestTooltipComponent).then( (fixture) => {

        fixture.detectChanges();

        let tooltipTriggerElement = fixture.debugElement.query(By.directive(MdlTooltipDirective)).nativeElement;
        // simulate mouse enter to run the special "right" code
        var evt = doc.createEvent('HTMLEvents');
        evt.initEvent('mouseenter', true, true);
        tooltipTriggerElement.dispatchEvent(evt);

        let tooltipEl:HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;
        expect(tooltipEl.classList.contains('mdl-tooltip--right')).toBe(true);
      })
  });

  it('should add the css class mdl-tooltip--top if the position is set to top', () => {

    return builder
      .overrideTemplate(MdlTestTooltipComponent, `
          <div [mdl-tooltip]="t" mdl-tooltip-position="top"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `)
      .createAsync(MdlTestTooltipComponent).then( (fixture) => {

        fixture.detectChanges();

        let tooltipTriggerElement = fixture.debugElement.query(By.directive(MdlTooltipDirective)).nativeElement;
        // simulate mouse enter to run the special "right" code
        var evt = doc.createEvent('HTMLEvents');
        evt.initEvent('mouseenter', true, true);
        tooltipTriggerElement.dispatchEvent(evt);

        let tooltipEl:HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;
        expect(tooltipEl.classList.contains('mdl-tooltip--top')).toBe(true);
      })
  });

  it('should add the css class mdl-tooltip--bottom if the position is set to bottom', () => {

    return builder
      .overrideTemplate(MdlTestTooltipComponent, `
          <div [mdl-tooltip]="t" mdl-tooltip-position="bottom"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `)
      .createAsync(MdlTestTooltipComponent).then( (fixture) => {

        fixture.detectChanges();

        let tooltipTriggerElement = fixture.debugElement.query(By.directive(MdlTooltipDirective)).nativeElement;
        // simulate mouse enter to run the special "right" code
        var evt = doc.createEvent('HTMLEvents');
        evt.initEvent('mouseenter', true, true);
        tooltipTriggerElement.dispatchEvent(evt);

        let tooltipEl:HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;
        expect(tooltipEl.classList.contains('mdl-tooltip--bottom')).toBe(true);
      })
  });
});


@Component({
  selector: 'test-icon',
  template: "replaced by the test",
  directives: [MDL_TOOLTIP_DIRECTIVES]
})
class MdlTestTooltipComponent {}
