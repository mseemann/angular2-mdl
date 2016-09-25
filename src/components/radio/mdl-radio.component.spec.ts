import { TestBed, async, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import {MdlRadioComponent, MdlRadioModule, MdlRadioGroupRegisty} from './mdl-radio.component';
import {FormsModule, FormControl, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';


describe('Component: MdlRadio', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MdlRadioModule, FormsModule, ReactiveFormsModule ],
      declarations: [ MdlTestRadioComponent ],
    });
  }));

  it('should add the css class mdl-radio to the host element', ( ) => {

    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-radio')).toBe(true);


  });

  it('should support ngModel', async(() => {

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

      });
    });


  }));

  it('should mark the component as focused and blured', () => {

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

  });

  it('should throw if name and formcontrolname are different', async(() => {
    TestBed.overrideComponent(MdlTestRadioComponent, { set: {
      template: `
        <mdl-radio name="r" formControlName="test" value="1" mdl-ripple>radio label 1</mdl-radio>
        <mdl-radio name="r" formControlName="test" value="2" mdl-ripple>radio label 2</mdl-radio>
      `
    }});
    let fixture = TestBed.createComponent(MdlTestRadioComponent);

    expect(() => { fixture.detectChanges(); } ).toThrow();

  }));

  it('should take the name from formcontrolname if no name os provided', async(() => {
    TestBed.overrideComponent(MdlTestRadioComponent, { set: {
      template: `
        <form [formGroup]="form">
          <mdl-radio formControlName="test" value="1" mdl-ripple>radio label 1</mdl-radio>
        </form>
      `
    }});
    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let radioComponent = fixture.debugElement.query(By.directive(MdlRadioComponent)).componentInstance;
    expect(radioComponent.name).toEqual('test');
  }));

  it('should remove mdl-radio if the component is destroyed', async(() => {

      TestBed.overrideComponent(MdlTestRadioComponent, { set: {
        template: `
      <form [formGroup]="form">
        <mdl-radio formControlName="test" value="1" mdl-ripple>radio label 1</mdl-radio>
        <mdl-radio *ngIf="radioVisible" formControlName="test" value="2" mdl-ripple>radio label 3</mdl-radio>
      </form>
    `
      }});
      let fixture = TestBed.createComponent(MdlTestRadioComponent);
      fixture.detectChanges();

      let registry = getTestBed().get(MdlRadioGroupRegisty);

      spyOn(registry, 'remove').and.callThrough();

      fixture.componentInstance.radioVisible = false;

      fixture.detectChanges();

      expect(registry.remove).toHaveBeenCalled();

  }));


  it('should fire a change event if the state changed', async(() => {
    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;

    spyOn(instance, 'onChange');

    let component2 = fixture.debugElement.queryAll(By.directive(MdlRadioComponent))[1];
    component2.nativeElement.click();

    expect(instance.onChange).toHaveBeenCalledWith('2');
  }));

  it('should be possible to disable the radio input', async(() => {
    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;
    let cbDebugElem = fixture.debugElement.queryAll(By.directive(MdlRadioComponent))[0];

    cbDebugElem.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = cbDebugElem.nativeElement;
    expect(checkboxEl.classList.contains('is-disabled')).toBe(true, 'should have css is-disabled');

    let value = instance.radioValue;
    // should not change on click
    cbDebugElem.nativeElement.click();
    expect(instance.radioValue).toEqual(value);

  }));

});


@Component({
  selector: 'test-radio',
  template: `
    <mdl-radio name="r" [(ngModel)]="radioValue" value="1" mdl-ripple 
          (change)="onChange($event)">radio label 1</mdl-radio>
    <mdl-radio name="r" [(ngModel)]="radioValue" value="2" mdl-ripple 
          (change)="onChange($event)">radio label 2</mdl-radio>
  `
})
class MdlTestRadioComponent implements OnInit {
  public radioValue = '2';
  public radioVisible = true;
  public form: FormGroup;
  public test = new FormControl('');

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.form = this.fb.group({
      'test': this.test
    });
  }


  public onChange(v: boolean) {}
}


