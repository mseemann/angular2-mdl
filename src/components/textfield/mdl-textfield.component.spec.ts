import {
  inject,
  TestComponentBuilder,
  TestBed,
  async
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlTextFieldComponent } from './mdl-textfield.component';
import { MdlButtonComponent } from './../button/mdl-button.component';
import { FormsModule } from '@angular/forms';
import { DeprecatedFormsModule } from '@angular/common';

describe('Component: MdlTextField', () => {

  var builder: TestComponentBuilder;
  var doc: HTMLDocument;

  describe('with deprecated forms api', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [DeprecatedFormsModule],
        declarations: [],
      });

      TestBed.compileComponents();
    }));

    beforeEach(inject([TestComponentBuilder, DOCUMENT], function (tcb: TestComponentBuilder, document) {
      builder = tcb;
      doc = document;
    }));

    it('should add the css class mdl-textfield to the host element', ( done ) => {

      return builder
        .overrideTemplate(MdlTestComponent, `
            <mdl-textfield type="text" label="Text..." ></mdl-textfield>
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
            <mdl-textfield type="text" label="Text..." [(ngModel)]="text1"></mdl-textfield>
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
            <mdl-textfield type="text" label="Text..." [(ngModel)]="text1"></mdl-textfield>
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
            <mdl-textfield type="text" label="Text..." [(ngModel)]="text1" pattern="a"></mdl-textfield>
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

    it('should create a textare if row is specified', ( done ) => {

      return builder
        .overrideTemplate(MdlTestComponent, `
            <mdl-textfield type="text" label="Text..." rows="3"></mdl-textfield>
          `)
        .createAsync(MdlTestComponent).then( (fixture) => {

          fixture.detectChanges();

          let el = fixture.debugElement.query(By.css('textarea'));

          expect(el).toBeDefined();

          done();
        });
    });

    it('should restrict the line count if maxrows is present', ( done ) => {

      return builder
        .overrideTemplate(MdlTestComponent, `
            <mdl-textfield type="text" label="Text..." rows="3" [maxrows]="1"></mdl-textfield>
          `)
        .createAsync(MdlTestComponent).then( (fixture) => {

          fixture.detectChanges();

          let el = fixture.debugElement.query(By.css('textarea')).nativeElement;

          el.value = 'a';

          var e = <any>new Event('keydown');
          e.keyCode = 13;

          spyOn(e, 'preventDefault');

          el.dispatchEvent(e);

          expect(e.preventDefault).toHaveBeenCalled();


          done();
        });
    });

    it('should not restrict the line count if maxrows is -1', ( done ) => {

      return builder
        .overrideTemplate(MdlTestComponent, `
            <mdl-textfield type="text" label="Text..." rows="3" [maxrows]="-1"></mdl-textfield>
          `)
        .createAsync(MdlTestComponent).then( (fixture) => {

          fixture.detectChanges();

          let el = fixture.debugElement.query(By.css('textarea')).nativeElement;

          el.value = 'a';

          var e = <any>new Event('keydown');
          e.keyCode = 13;
          el.dispatchEvent(e);

          spyOn(e, 'preventDefault');

          expect(e.preventDefault).not.toHaveBeenCalled();

          done();
        });
    });

    it('should create an expandable textfield if icon is present', ( done ) => {
      return builder
        .overrideTemplate(MdlTestComponent, `
            <mdl-textfield type="text" icon="search"></mdl-textfield>
          `)
        .createAsync(MdlTestComponent).then( (fixture) => {

          fixture.detectChanges();

          let el = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;

          expect(el.classList.contains('mdl-textfield--expandable')).toBe(true);

          done();
        });
    });

    it('should activate the expandable if the icon button is clicked', ( done ) => {
      return builder
        .overrideTemplate(MdlTestComponent, `
            <mdl-textfield type="text" icon="search"></mdl-textfield>
          `)
        .createAsync(MdlTestComponent).then( (fixture) => {

          fixture.detectChanges();

          let btnEl = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
          btnEl.click();
          fixture.detectChanges();


          let el = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
          expect(el.classList.contains('is-focused')).toBe(true);

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

    it('should create the test component', ( done ) => {

      return builder
        .overrideTemplate(MdlTestComponent, `
            <mdl-textfield type="text" label="Text..." [(ngModel)]="text1" pattern="a"></mdl-textfield>
          `)
        .createAsync(MdlTestComponent).then( (fixture) => {

          fixture.detectChanges();

          done();
        });
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
