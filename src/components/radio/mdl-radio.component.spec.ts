import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlRadioComponent, MdlRadioModule } from './mdl-radio.component';
import { FormsModule } from '@angular/forms';


describe('Component: MdlRadio', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlRadioModule, FormsModule ],
      declarations: [ MdlTestRadioComponent ],
    });
  });

  it('should add the css class mdl-radio to the host element', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-radio')).toBe(true);

    done();
  });

  it('should support ngModel', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;
    let component = fixture.debugElement.queryAll(By.directive(MdlRadioComponent))[0];

    instance.radioValue = '1';
    fixture.detectChanges();
    fixture.whenStable().then( () => {

      expect(component.componentInstance.optionValue).toEqual('1');

      let component2 = fixture.debugElement.queryAll(By.directive(MdlRadioComponent))[1];
      component2.nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then( () => {
        expect(component.componentInstance.optionValue).toEqual('2');
        done();
      });
    });


  });

  it('should mark the component as focused and blured', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;

    inputEl.focus();

    fixture.detectChanges();

    let radioEl: HTMLElement = fixture.debugElement.queryAll(By.directive(MdlRadioComponent))[0].nativeElement;
    expect(radioEl.classList.contains('is-focused')).toBe(true);

    inputEl.blur();

    fixture.detectChanges();
    expect(radioEl.classList.contains('is-focused')).toBe(false);

    done();

  });


});


@Component({
  selector: 'test-icon',
  template: `
    <mdl-radio name="r" [(ngModel)]="radioValue" value="1" mdl-ripple>radio label 1</mdl-radio>
    <mdl-radio name="r" [(ngModel)]="radioValue" value="2" mdl-ripple>radio label 2</mdl-radio>
  `
})
class MdlTestRadioComponent {
  public radioValue = '2';
}
