import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component, Optional, DebugElement } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MdlCheckboxComponent } from './mdl-checkbox.component';

describe('Component: MdlCheckbox', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
    builder = tcb;
    doc = document;
  }));

  it('should add the css class mdl-checkbox to the host element', () => {

    return builder
      .createAsync(MdlTestCheckboxComponent).then( (fixture) => {

        fixture.detectChanges();

        let checkboxEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(checkboxEl.classList.contains('mdl-checkbox')).toBe(true);

      })
  });

  it('should support ngModel', () => {
    return builder
      .createAsync(MdlTestCheckboxComponent).then( (fixture) => {

          fixture.detectChanges();

          let instance = fixture.componentInstance;
          let component = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).componentInstance;
          let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

          instance.checkboxValue1 = true;
          fixture.detectChanges();
          expect(el.checked).toEqual(true);

          component.value = false;
          fixture.detectChanges();
          expect(el.checked).toEqual(false);

      })
  })

  it('should change the value on click', () => {
    return builder
      .createAsync(MdlTestCheckboxComponent).then( (fixture) => {
        fixture.detectChanges();

          let instance = fixture.componentInstance;
          let component = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).componentInstance;
          let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

          instance.checkboxValue1 = false;
          fixture.detectChanges();

          expect(el.checked).toEqual(false);

          fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement.click();
          fixture.detectChanges();

          expect(el.checked).toEqual(true);

      })
  })

  it('should mark the component as focused and blured', () => {
    return builder
      .createAsync(MdlTestCheckboxComponent).then( (fixture) => {
        fixture.detectChanges();

          let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

          var evt = doc.createEvent('HTMLEvents');
          evt.initEvent('focus', true, true);
          inputEl.dispatchEvent(evt);

          fixture.detectChanges();

          let checkboxEl:HTMLElement = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement;
          expect(checkboxEl.classList.contains('is-focused')).toBe(true);

          var evtBlur = doc.createEvent('HTMLEvents');
          evtBlur.initEvent('blur', true, true);
          inputEl.dispatchEvent(evtBlur);

          fixture.detectChanges();
          expect(checkboxEl.classList.contains('is-focused')).toBe(false);

      })
  })

});


@Component({
  selector: 'test-icon',
  template: '<mdl-checkbox [(ngModel)]="checkboxValue1" mdl-ripple>checkbox label</mdl-checkbox>',
  directives: [MdlCheckboxComponent]
})
class MdlTestCheckboxComponent {
  checkboxValue1 = false;
}
