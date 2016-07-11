import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { MdlTextFieldComponent } from './mdl-text-field.component';

describe('Component: MdlTextField', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
    builder = tcb;
    doc = document;
  }));

  it('should add the css class mdl-textfield to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-text-field type="text" label="Text..." ></mdl-text-field>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let tfEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(tfEl.classList.contains('mdl-textfield')).toBe(true);

        done();
      });
  });

  it('should support ngModel', ( done ) => {
    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-text-field type="text" label="Text..." [(ngModel)]="text1"></mdl-text-field>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let instance = fixture.componentInstance;
        let component = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).componentInstance;
        let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

        instance.text1 = 'text1';
        fixture.detectChanges();
        expect(el.value).toEqual('text1');

        component.value = 'text2';
        fixture.detectChanges();
        expect(el.value).toEqual('text2');

        done();

      });
  });

  it('should mark the component as focused and blured', () => {
    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-text-field type="text" label="Text..." [(ngModel)]="text1"></mdl-text-field>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {
        fixture.detectChanges();

        let hostEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
        let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

        var evt = doc.createEvent('HTMLEvents');
        evt.initEvent('focus', true, true);
        inputEl.dispatchEvent(evt);

        fixture.detectChanges();

        expect(hostEl.classList.contains('is-focused')).toBe(true);

        var evtBlur = doc.createEvent('HTMLEvents');
        evtBlur.initEvent('blur', true, true);
        inputEl.dispatchEvent(evtBlur);

        fixture.detectChanges();
        expect(hostEl.classList.contains('is-focused')).toBe(false);

      });
  });

  it('should mark the component as invalid ngModel', ( done ) => {
    return builder
      .overrideTemplate(MdlTestComponent, `
          <mdl-text-field type="text" label="Text..." [(ngModel)]="text1" pattern="a"></mdl-text-field>
        `)
      .createAsync(MdlTestComponent).then( (fixture) => {

        fixture.detectChanges();

        let hostEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
        let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

        el.value = 'b';
        fixture.detectChanges();

        expect(hostEl.classList.contains('is-invalid')).toBe(true);

        done();

      });
  });

});


@Component({
  selector: 'test',
  template: 'replaced by the test',
  directives: [MdlTextFieldComponent]
})
class MdlTestComponent {
  public text1 = '';
}
