import {
  describe,
  expect,
  it,
  inject,
  injectAsync,
  fakeAsync,
  tick,
  beforeEach
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component, Optional } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MdlRadioComponent } from './mdl-radio.component';

describe('Component: MdlRadio', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
    builder = tcb;
    doc = document;
  }));

  it('should add the css class mdl-radio to the host element', () => {

    return builder
      .createAsync(MdlTestRadioComponent).then( (fixture) => {

        fixture.detectChanges();

        let checkboxEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(checkboxEl.classList.contains('mdl-radio')).toBe(true);

      })
  });

  it('should support ngModel', () => {
    return builder
      .createAsync(MdlTestRadioComponent).then( (fixture) => {
        fixture.detectChanges();

        fakeAsync(() => {

          let instance = fixture.componentInstance;
          let component = fixture.debugElement.queryAll(By.directive(MdlRadioComponent))[0];
          let el: HTMLInputElement = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;

          instance.radioValue = '1';
          fixture.detectChanges();
          tick();
          expect(component.nativeElement.classList.contains('is-checked')).toEqual(true);

          let component2 = fixture.debugElement.queryAll(By.directive(MdlRadioComponent))[1];
          component2.nativeElement.click();
          fixture.detectChanges();
          tick();
          expect(instance.radioValue).toEqual('2');
        })();
      })
  })

  it('should mark the component as focused and blured', () => {
    return builder
      .createAsync(MdlTestRadioComponent).then( (fixture) => {
        fixture.detectChanges();

        let inputEl: HTMLInputElement = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;

        inputEl.focus();

        fixture.detectChanges();

        let radioEl:HTMLElement = fixture.debugElement.queryAll(By.directive(MdlRadioComponent))[0].nativeElement;
        expect(radioEl.classList.contains('is-focused')).toBe(true);
        
        inputEl.blur();

        fixture.detectChanges();
        expect(radioEl.classList.contains('is-focused')).toBe(false);

      })
  })

});


@Component({
  selector: 'test-icon',
  template: `
    <mdl-radio name="r" [(ngModel)]="radioValue" value="1" mdl-ripple>radio label 1</mdl-radio>
    <mdl-radio name="r" [(ngModel)]="radioValue" value="2" mdl-ripple>radio label 2</mdl-radio>
  `,
  directives: [MdlRadioComponent]
})
class MdlTestRadioComponent {
  radioValue = '2';
}
