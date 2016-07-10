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
import {
  MDL_LAYOUT_DIRECTIVES,
  MdlLayoutHeaderComponent,
  MdlLayoutComponent} from './index';
import { MdlAnchorRippleDirective } from './../common/mdl-ripple.directive';

describe('Component: MdlLayoutHeader', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-layout__header to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestLayoutComponent, `
           <mdl-layout>
            <mdl-layout-header>x</mdl-layout-header>
          </mdl-layout>
        `)
      .createAsync(MdlTestLayoutComponent).then( (fixture) => {

        fixture.detectChanges();

        let layoutEl: HTMLElement = fixture.debugElement.query(By.directive(MdlLayoutHeaderComponent)).nativeElement;
        expect(layoutEl.classList.contains('mdl-layout__header')).toBe(true);

        done();
      });
  });

  it('should decompact the header if the header is compact in waterfall mode', ( done ) => {

    return builder
      .overrideTemplate(MdlTestLayoutComponent, `
         <mdl-layout mdl-layout-mode="waterfall">
            <mdl-layout-header>x</mdl-layout-header>
            <mdl-layout-content></mdl-layout-content>
         </mdl-layout>
          
        `)
      .createAsync(MdlTestLayoutComponent).then( (fixture) => {

        fixture.detectChanges();

        let headerDebugElement = fixture.debugElement.query(By.directive(MdlLayoutHeaderComponent));
        let header = headerDebugElement.componentInstance;
        header.isCompact = false;
        
        header.el.click();
        expect(header.isCompact).toBe(false);

        header.isCompact = true;
        expect(header.isCompact).toBe(true);
        header.el.click();
        expect(header.isCompact).toBe(false);

        done();
      });

  });

  it('should set animating to false if the transisition ends', ( done ) => {
    return builder
      .overrideTemplate(MdlTestLayoutComponent, `
         <mdl-layout mdl-layout-mode="waterfall">
            <mdl-layout-header>x</mdl-layout-header>
            <mdl-layout-content></mdl-layout-content>
         </mdl-layout>
          
        `)
      .createAsync(MdlTestLayoutComponent).then( (fixture) => {

        fixture.detectChanges();

        let headerDebugElement = fixture.debugElement.query(By.directive(MdlLayoutHeaderComponent));
        let header = headerDebugElement.componentInstance;
        header.isAnimating = true;

        header.el.dispatchEvent(new CustomEvent('transitionend'));

        expect(header.isAnimating).toBe(false);

        done();
      });
  });

  it('should compact the header if the content is scrolled down and not compact on the contrary', ( done ) => {
    return builder
      .overrideTemplate(MdlTestLayoutComponent, `
         <mdl-layout mdl-layout-mode="waterfall">
            <mdl-layout-header>x</mdl-layout-header>
            <mdl-layout-content></mdl-layout-content>
         </mdl-layout>
          
        `)
      .createAsync(MdlTestLayoutComponent).then( (fixture) => {

        fixture.detectChanges();

        let mdlLayout = fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

        let headerDebugElement = fixture.debugElement.query(By.directive(MdlLayoutHeaderComponent));

        mdlLayout.onScroll(600);
        expect(headerDebugElement.componentInstance.isCompact).toBe(true);

        // simulate animating is over
        headerDebugElement.componentInstance.isAnimating = false;
        mdlLayout.onScroll(0);


        expect(headerDebugElement.componentInstance.isCompact).toBe(false);

        done();

      });
  });

  it('should not animate the header if the screen is samll', ( done ) => {
    return builder
      .overrideTemplate(MdlTestLayoutComponent, `
         <mdl-layout mdl-layout-mode="waterfall">
            <mdl-layout-header>x</mdl-layout-header>
            <mdl-layout-content></mdl-layout-content>
         </mdl-layout>
          
        `)
      .createAsync(MdlTestLayoutComponent).then( (fixture) => {

        fixture.detectChanges();

        let mdlLayout = fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

        let headerDebugElement = fixture.debugElement.query(By.directive(MdlLayoutHeaderComponent));
        mdlLayout.isSmallScreen = true;
        mdlLayout.onScroll(600);

        expect(headerDebugElement.componentInstance.isAnimating).toBe(false);


        mdlLayout.onScroll(0);
        expect(headerDebugElement.componentInstance.isAnimating).toBe(false);

        done();

      });
  });

  it('should not run any scroll code if the header is not in waterfall mode or is animating', ( done ) => {
    return builder
      .overrideTemplate(MdlTestLayoutComponent, `
         <mdl-layout>
            <mdl-layout-header>x</mdl-layout-header>
            <mdl-layout-content></mdl-layout-content>
         </mdl-layout>
          
        `)
      .createAsync(MdlTestLayoutComponent).then( (fixture) => {

        fixture.detectChanges();

        let mdlLayout = fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;
        mdlLayout.mode = 'standard';

        let headerDebugElement = fixture.debugElement.query(By.directive(MdlLayoutHeaderComponent));

        mdlLayout.onScroll(600);
        expect(headerDebugElement.componentInstance.isCompact).toBe(false);


        mdlLayout.mode = 'waterfall';
        headerDebugElement.componentInstance.isAnimating = true;

        mdlLayout.onScroll(600);
        expect(headerDebugElement.componentInstance.isCompact).toBe(false);

        done();

      });
  });
});


@Component({
  selector: 'test-layout',
  template: 'replaced by the test',
  directives: [MDL_LAYOUT_DIRECTIVES, MdlAnchorRippleDirective]
})
class MdlTestLayoutComponent {}
