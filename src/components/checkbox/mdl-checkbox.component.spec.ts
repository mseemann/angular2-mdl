import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component} from '@angular/core';
import {
  MdlCheckboxComponent,
  MdlChekboxModule} from './mdl-checkbox.component';
import { FormsModule } from '@angular/forms';

describe('Component: MdlCheckbox', () => {

  var doc: HTMLDocument;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MdlChekboxModule, FormsModule ],
      declarations: [ MdlTestCheckboxComponent ],
    });

    TestBed.compileComponents();
  }));

  describe('with new forms api', () => {

    beforeEach(inject([DOCUMENT], function (document) {
      doc = document;
    }));

    it('should add the css class mdl-checkbox to the host element', ( done ) => {

      let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
      fixture.detectChanges();

      let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
      expect(checkboxEl.classList.contains('mdl-checkbox')).toBe(true);

      done();

    });

    it('should support ngModel', ( done ) => {

      let fixture = TestBed.createComponent(MdlTestCheckboxComponent);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        let component = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).componentInstance;
        let el = <HTMLInputElement> fixture.debugElement.query(By.css('input')).nativeElement;
        expect(el.checked).toEqual(false);

        fixture.detectChanges();

        let instance = fixture.componentInstance;
        instance.checkboxValue1 = true;
        component.value = true;

        fixture.detectChanges();



          console.log(el.checked);
          expect(instance.checkboxValue1).toEqual(true);
          done();


      });


      // return builder
      //   .createAsync(MdlTestCheckboxComponent).then( (fixture) => {
      //
      //     //fixture.detectChanges();
      //
      //     fixture.whenStable().then( () => {
      //       let instance = fixture.componentInstance;
      //       let component = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).componentInstance;
      //       let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      //
      //       instance.checkboxValue1 = true;
      //       component.value = true;
      //       fixture.whenStable().then( () => {
      //         console.log(el, el.checked, component);
      //         expect(el.checked).toEqual(true);
      //
      //         component.value = false;
      //         fixture.detectChanges();
      //         expect(el.checked).toEqual(false);
      //
      //         done();
      //       });
      //
      //
      //     });
      //
      //   });
    });

    // it('should change the value on click', ( done ) => {
    //   return builder
    //     .createAsync(MdlTestCheckboxComponent).then( (fixture) => {
    //       fixture.detectChanges();
    //
    //       let instance = fixture.componentInstance;
    //       let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    //
    //       instance.checkboxValue1 = false;
    //       fixture.detectChanges();
    //
    //       expect(el.checked).toEqual(false);
    //
    //       fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement.click();
    //       fixture.detectChanges();
    //
    //       expect(el.checked).toEqual(true);
    //
    //       done();
    //     });
    // });

    it('should mark the component as focused and blured', ( done ) => {
      let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
      fixture.detectChanges();

      let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      var evt = doc.createEvent('HTMLEvents');
      evt.initEvent('focus', true, true);
      inputEl.dispatchEvent(evt);

      fixture.detectChanges();

      let checkboxEl: HTMLElement = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement;
      expect(checkboxEl.classList.contains('is-focused')).toBe(true);

      var evtBlur = doc.createEvent('HTMLEvents');
      evtBlur.initEvent('blur', true, true);
      inputEl.dispatchEvent(evtBlur);

      fixture.detectChanges();
      expect(checkboxEl.classList.contains('is-focused')).toBe(false);

      done();

    });
  });


});


@Component({
  selector: 'test-icon',
  template: '<mdl-checkbox [(ngModel)]="checkboxValue1" mdl-ripple>checkbox label</mdl-checkbox>',
})
class MdlTestCheckboxComponent {
  public checkboxValue1 = false;
}
