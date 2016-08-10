import {
  inject,
  fakeAsync,
  tick,
  TestComponentBuilder,
  TestBed,
  async
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlSliderComponent } from './mdl-slider.component';
import { FormsModule } from '@angular/forms';
import { DeprecatedFormsModule } from '@angular/common';

describe('Component: MdlSlider', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  describe('with deprecated forms api', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ DeprecatedFormsModule ],
        declarations: [],
      });

      TestBed.compileComponents();
    }));

    beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
      builder = tcb;
      doc = document;
    }));

    it('should add the css class mdl-slider__container to the host element', () => {

      return builder
        .createAsync(MdlTestSliderComponent).then( (fixture) => {

          fixture.detectChanges();

          let iconEl: HTMLElement = fixture.nativeElement.children.item(0);
          expect(iconEl.classList.contains('mdl-slider__container')).toBe(true);

        });
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
        });
    });

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

        });
    });

    it('should propagate mousedown events on the host to the input element', ( done ) => {
      return builder
        .createAsync(MdlTestSliderComponent).then( (fixture) => {
          fixture.detectChanges();

          let hostElement = fixture.debugElement.query(By.css('mdl-slider')).nativeElement;

          let inputElement =  fixture.debugElement.query(By.css('input')).nativeElement;

          spyOn(inputElement, 'dispatchEvent').and.callThrough();

          var evt = doc.createEvent('HTMLEvents');
          evt.initEvent('mousedown', true, true);
          hostElement.dispatchEvent(evt);

          fixture.detectChanges();

          expect(inputElement.dispatchEvent).toHaveBeenCalledTimes(1);

          done();
        });
    });


    it('should not propagate mousedown events to the input element on other elements than the host', ( done ) => {
      return builder
        .createAsync(MdlTestSliderComponent).then( (fixture) => {
          fixture.detectChanges();

          let inputElement =  fixture.debugElement.query(By.css('input')).nativeElement;

          spyOn(inputElement, 'dispatchEvent').and.callThrough();

          var evt = doc.createEvent('HTMLEvents');
          evt.initEvent('mousedown', true, true);
          inputElement.dispatchEvent(evt);

          fixture.detectChanges();

          // if it would be propagated dispatchEvent would have been called 2 times.
          expect(inputElement.dispatchEvent).toHaveBeenCalledTimes(1);

          done();
        });
    });
  });

  describe('with new forms api', () => {

    beforeEach( () => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [],
      });
    });

    beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
      builder = tcb;
      doc = document;
    }));

    it('should be possible to create the test component', ( done ) => {

      return builder
        .createAsync(MdlTestSliderComponent).then( (fixture) => {

          fixture.detectChanges();

          done();

        });
    });

  });

});


@Component({
  selector: 'test-icon',
  template: "<mdl-slider [min]='min' [max]='max' [(ngModel)]='currentValue'></mdl-slider>",
  directives: [MdlSliderComponent]
})
class MdlTestSliderComponent {
  public min = 0;
  public max = 100;
  public currentValue = 50;
}
