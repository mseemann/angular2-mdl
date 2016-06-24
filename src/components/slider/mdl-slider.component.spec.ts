import {
  describe,
  expect,
  it,
  inject,
  fakeAsync,
  tick,
  beforeEach
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component, Optional } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MdlSliderComponent } from './mdl-slider.component';

describe('Component: MdlSlider', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
    builder = tcb;
    doc = document;
  }));

  it('should add the css class mdl-slider__container to the host element', () => {

    return builder
      .createAsync(MdlTestSliderComponent).then( (fixture) => {

        fixture.detectChanges();

        let iconEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(iconEl.classList.contains('mdl-slider__container')).toBe(true);

      })
  });

  it('should support ngModel', () => {
    return builder
      .createAsync(MdlTestSliderComponent).then( (fixture) => {
        fixture.detectChanges();

        fakeAsync(() => {

          let instance = fixture.componentInstance;
          let component = fixture.debugElement.query(By.directive(MdlSliderComponent)).componentInstance;
          let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

          instance.currentValue = 67;
          fixture.detectChanges();
          tick();
          expect(el.value).toEqual('67');

          component.value = 88;
          fixture.detectChanges();
          tick();
          expect(el.value).toEqual('88');
        })();
      })
  })

  it('should call blur on mouseup events on the host element', () => {
    return builder
      .createAsync(MdlTestSliderComponent).then( (fixture) => {
        fixture.detectChanges();

        let hostElement = fixture.debugElement.query(By.css('mdl-slider')).nativeElement;

        spyOn(hostElement, 'blur');

        var evt = doc.createEvent('HTMLEvents');
        evt.initEvent('mouseup', true, true);
        hostElement.dispatchEvent(evt);

        fixture.detectChanges();

        expect(hostElement.blur).toHaveBeenCalled();

      })
  })


});


@Component({
  selector: 'test-icon',
  template: "<mdl-slider [min]='min' [max]='max' [(ngModel)]='currentValue'></mdl-slider>",
  directives: [MdlSliderComponent]
})
class MdlTestSliderComponent {
  min = 0;
  max = 100;
  currentValue = 50;
}
