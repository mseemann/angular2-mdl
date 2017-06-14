import { TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, SimpleChange } from '@angular/core';
import {
  MdlTooltipModule,
  MdlTooltipComponent,
  MdlSimpleTooltipComponent,
  MdlTooltipDirective
} from './index';

import { MdlTooltipPositionService } from './mdl-tooltip-position.service';

describe('Component: MdlTooltip', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlTooltipModule],
      declarations: [MdlTestTooltipComponent],
    });
  });

  it('should add the css class mdl-tooltip to the host element', () => {

    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: '<mdl-tooltip>x</mdl-tooltip>' }
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();

    let tooltipEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;
    expect(tooltipEl.classList.contains('mdl-tooltip')).toBe(true);

  });

  it('should add the css class mdl-tooltip--large to the host element', () => {

    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: `
          <div [mdl-tooltip-large]="t"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `}
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();

    let tooltipEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;
    expect(tooltipEl.classList.contains('mdl-tooltip--large')).toBe(true);

  });

  it('should add create a simpletooltipcomponent for the mdl-tooltip directive with text', async(() => {

    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: `
           <div mdl-tooltip="test"></div>
        `}
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();

    // wait for async component creation
    setTimeout( () => {
      // let angular prepare the tooltip with class and text
      fixture.detectChanges();
      // check the result
      let tooltipEl: HTMLElement = fixture.debugElement
        .query(By.directive(MdlSimpleTooltipComponent)).nativeElement;
      expect(tooltipEl.classList.contains('mdl-tooltip')).toBe(true);

    }, 0);

  }));

  it('should add the css class is-active if the mouse enters the directive element', () => {

    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: `
          <div [mdl-tooltip]="t" mdl-tooltip-position="left"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `}
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();

    let tooltipTriggerElement = fixture.debugElement.query(By.directive(MdlTooltipDirective)).nativeElement;

    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('mouseenter', true, true);
    tooltipTriggerElement.dispatchEvent(evt);

    let tooltipDebugEl = fixture.debugElement.query(By.directive(MdlTooltipComponent));
    let tooltipEl: HTMLElement = tooltipDebugEl.nativeElement;
    expect(tooltipEl.classList.contains('is-active')).toBe(true);

    expect(tooltipDebugEl.componentInstance.isActive()).toBe(true);

  });

  it('should add the css class is-active after 1 sec if the mouse enters the directive element', (cb) => {

    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: `
           <div [mdl-tooltip]="t" mdl-tooltip-position="left"></div>
          <mdl-tooltip #t="mdlTooltip" [delay]="1000">x</mdl-tooltip>
        `}
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();

    let tooltipTriggerElement = fixture.debugElement.query(By.directive(MdlTooltipDirective)).nativeElement;

    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('mouseenter', true, true);
    tooltipTriggerElement.dispatchEvent(evt);

    let tooltipDebugEl = fixture.debugElement.query(By.directive(MdlTooltipComponent));
    let tooltipEl: HTMLElement = tooltipDebugEl.nativeElement;


    expect(tooltipEl.classList.contains('is-active')).toBe(false);
    expect(tooltipDebugEl.componentInstance.isActive()).toBe(false);

    setTimeout(() => {
        expect(tooltipEl.classList.contains('is-active')).toBe(true);
        expect(tooltipDebugEl.componentInstance.isActive()).toBe(true);
        cb();
    }, 1010);

  });

  it('should cancel the delay timeout on mouseleave', () => {
    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: `
           <div [mdl-tooltip]="t" mdl-tooltip-position="left"></div>
          <mdl-tooltip #t="mdlTooltip" [delay]="1000">x</mdl-tooltip>
        `}
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();

    let tooltipTriggerElement = fixture.debugElement.query(By.directive(MdlTooltipDirective)).nativeElement;

    spyOn(window, 'clearTimeout').and.callThrough();

    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('mouseenter', true, true);
    tooltipTriggerElement.dispatchEvent(evt);

    var evt2 = document.createEvent('HTMLEvents');
    evt2.initEvent('mouseleave', true, true);
    tooltipTriggerElement.dispatchEvent(evt2);

    expect(window.clearTimeout).toHaveBeenCalled();

  });

  it('should remove the css class is-active if the mouse leaves the directive element', () => {

    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: `
           <div [mdl-tooltip]="t"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `}
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();

    let tooltipTriggerElement = fixture.debugElement.query(By.directive(MdlTooltipDirective)).nativeElement;

    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('mouseleave', true, true);
    tooltipTriggerElement.dispatchEvent(evt);

    let tooltipEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;

    expect(tooltipEl.classList.contains('is-active')).toBe(false);

  });

  it('should add the css class mdl-tooltip--{position} if the position is set to {position}', () => {

    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: `
          <div [mdl-tooltip]="t" mdl-tooltip-position="left"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `}
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();

    ['bottom', 'top', 'left', 'right'].forEach( (position) => {

      let debugElement = fixture.debugElement.query(By.directive(MdlTooltipComponent));

      debugElement.componentInstance.position = position;

      fixture.detectChanges();

      let tooltipEl: HTMLElement = debugElement.nativeElement;
      expect(tooltipEl.classList.contains(`mdl-tooltip--${position}`)).toBe(true);

    });

  });

  it('should update position on change', () => {
    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: `
          <div [mdl-tooltip]="t" [mdl-tooltip-position]="position"></div>
          <mdl-tooltip #t="mdlTooltip">x</mdl-tooltip>
        `}
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();
    inject([MdlTooltipPositionService], (posSvc) => {
      let tooltipTriggerElement: HTMLElement = fixture.debugElement
        .query(By.directive(MdlTooltipDirective))
        .nativeElement;
      let tooltipEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTooltipComponent)).nativeElement;

      spyOn(posSvc, 'calcStyle');

      var evt1 = document.createEvent('HTMLEvents');
      evt1.initEvent('mouseenter', true, true);
      tooltipTriggerElement.dispatchEvent(evt1);

      var evt2 = document.createEvent('HTMLEvents');
      evt2.initEvent('mouseleave', true, true);
      tooltipTriggerElement.dispatchEvent(evt2);

      expect(posSvc.calcStyle).toHaveBeenCalledWith(
        jasmine.any(Number),
        jasmine.any(Number),
        jasmine.any(ClientRect),
        'bottom'
      );

      fixture.componentInstance.position = 'left';
      fixture.detectChanges();

      var evt3 = document.createEvent('HTMLEvents');
      evt3.initEvent('mouseenter', true, true);
      tooltipTriggerElement.dispatchEvent(evt3);

      var evt4 = document.createEvent('HTMLEvents');
      evt4.initEvent('mouseleave', true, true);
      tooltipTriggerElement.dispatchEvent(evt4);

      expect(posSvc.calcStyle).toHaveBeenCalledWith(
        jasmine.any(Number),
        jasmine.any(Number),
        jasmine.any(ClientRect),
        'left'
      );
    });
    let ttDirective = fixture.debugElement.query(By.directive(MdlTooltipDirective)).injector.get(MdlTooltipDirective);
    fixture.componentInstance.position = 'right';
    fixture.detectChanges();
    expect(ttDirective['tooltipComponent'].position).toBe('right');
    ttDirective.ngOnChanges({ position: new SimpleChange(null, 'top', true) });
    expect(fixture.componentInstance.position).toBe('right');
  });

  it('should change the tooltip text if the text is changed', () => {
    TestBed.overrideComponent(MdlTestTooltipComponent, { set: {
      template: `
           <div [mdl-tooltip]="tooltipText"></div>
        `}
    });
    let fixture = TestBed.createComponent(MdlTestTooltipComponent);
    fixture.detectChanges();

    let tooltipEl: HTMLElement = fixture.debugElement
        .query(By.directive(MdlSimpleTooltipComponent)).nativeElement;

    expect(tooltipEl.textContent).toBe('test');

    fixture.componentInstance.tooltipText = 'chnaged';
    fixture.detectChanges();

    expect(tooltipEl.textContent).toBe('chnaged');
  });
});


@Component({
  selector: 'test-icon',
  template: 'replaced by the test'
})
class MdlTestTooltipComponent {
  public position = 'bottom';
  public tooltipText = 'test';
}
