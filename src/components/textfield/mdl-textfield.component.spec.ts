import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlTextFieldComponent, MdlTextFieldModule } from './mdl-textfield.component';
import { MdlButtonComponent, MdlButtonModule } from './../button/mdl-button.component';
import { FormsModule } from '@angular/forms';

describe('Component: MdlTextField', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlTextFieldModule, MdlButtonModule, FormsModule],
      declarations: [MdlTestComponent],
    });
  });


  it('should add the css class mdl-textfield to the host element', ( done ) => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." ></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let tfEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(tfEl.classList.contains('mdl-textfield')).toBe(true);

    done();
  });

  it('should support ngModel', ( done ) => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." [(ngModel)]="text1"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      let instance = fixture.componentInstance;
      let component = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).componentInstance;

      instance.text1 = 'text1';
      fixture.detectChanges();
      fixture.whenStable().then( () => {
        expect(component.value).toEqual('text1');

        component.value = 'text2';
        fixture.detectChanges();
        expect(instance.text1).toEqual('text2');

        done();
      });
    });

  });

  it('should mark the component as focused and blured', ( done ) => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." [(ngModel)]="text1"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let hostEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('focus', true, true);
    inputEl.dispatchEvent(evt);

    fixture.detectChanges();

    expect(hostEl.classList.contains('is-focused')).toBe(true);

    var evtBlur = document.createEvent('HTMLEvents');
    evtBlur.initEvent('blur', true, true);
    inputEl.dispatchEvent(evtBlur);

    fixture.detectChanges();
    expect(hostEl.classList.contains('is-focused')).toBe(false);

    done();
  });

  it('should mark the component as invalid ngModel', ( done ) => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." [(ngModel)]="text1" pattern="a"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let hostEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    el.value = 'b';
    fixture.detectChanges();

    fixture.whenStable().then( () => {
      expect(hostEl.classList.contains('is-invalid')).toBe(true);

      done();
    });
  });

  it('should create a textare if row is specified', ( done ) => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." rows="3"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('textarea'));

    expect(el).toBeDefined();

    done();

  });

  it('should restrict the line count if maxrows is present', ( done ) => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." rows="3" [maxrows]="1"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
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

  it('should not restrict the line count if maxrows is -1', ( done ) => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: ' <mdl-textfield type="text" label="Text..." rows="3" [maxrows]="-1"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
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

  it('should create an expandable textfield if icon is present', ( done ) => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" icon="search"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;

    expect(el.classList.contains('mdl-textfield--expandable')).toBe(true);

    done();
  });

  it('should activate the expandable if the icon button is clicked', ( done ) => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" icon="search"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let btnEl = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
    btnEl.click();
    fixture.detectChanges();


    let el = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
    expect(el.classList.contains('is-focused')).toBe(true);

    done();

  });


});


@Component({
  selector: 'test',
  template: 'replaced by the test'
})
class MdlTestComponent {
  public text1 = '';
}
