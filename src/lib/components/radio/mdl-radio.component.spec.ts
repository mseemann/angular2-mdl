import { TestBed, async, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import {MdlRadioComponent, MdlRadioModule, MdlRadioGroupRegisty} from './mdl-radio.component';
import {FormsModule, FormControl, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';


describe('Component: MdlRadio', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MdlRadioModule.forRoot(), FormsModule, ReactiveFormsModule ],
      declarations: [ MdlTestRadioComponent, MdlTestUseSameRadioInGroupsComponent ],
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

  it('should not change its current state if it is already checked', async(() => {

    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let cbDebugElem1 = fixture.debugElement.queryAll(By.directive(MdlRadioComponent))[0];
    let cbInputEl = cbDebugElem1.query(By.css('input'));

    expect(cbDebugElem1.componentInstance.checked).toBe(false);

    cbInputEl.triggerEventHandler('keyup.space', {});
    fixture.detectChanges();
    expect(cbDebugElem1.componentInstance.checked).toBe(false);

  }));


  it('should be possible to use the same radio buttons in different groups', () => {
    let fixture = TestBed.createComponent(MdlTestUseSameRadioInGroupsComponent);
    fixture.detectChanges();

    let g1t1Elem = fixture.debugElement.query(By.css('#g1t1')).nativeElement;
    let g1t2Elem = fixture.debugElement.query(By.css('#g1t2')).nativeElement;
    let g2t1Elem = fixture.debugElement.query(By.css('#g2t1')).nativeElement;

    g1t1Elem.click();
    fixture.detectChanges();

    expect(g1t1Elem.classList.contains('is-checked')).toBe(true, 'the clicked one should be selected');
    expect(g2t1Elem.classList.contains('is-checked')).toBe(false, 'the not clicked one should not be selected');

    g1t2Elem.click();
    fixture.detectChanges();

    expect(g1t1Elem.classList.contains('is-checked')).toBe(false, 'the not clicked one should not be selected');
    expect(g2t1Elem.classList.contains('is-checked')).toBe(false, 'the not clicked one should not be selected');


  });

  it('should be possible to set a tabindex', () => {

    TestBed.overrideComponent(MdlTestRadioComponent, { set: {
      template: '<mdl-radio tabindex="2"></mdl-radio>' }
    });

    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let btnEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(btnEl.tabIndex).toBe(2);

  });

  it('should not set a default tabindex', () => {

    TestBed.overrideComponent(MdlTestRadioComponent, { set: {
      template: '<mdl-radio></mdl-radio>' }
    });

    let fixture = TestBed.createComponent(MdlTestRadioComponent);
    fixture.detectChanges();

    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(el.getAttribute('tabindex')).toEqual(null);

  });
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


@Component({
  selector: 'test-radio',
  template: `
    <form [formGroup]="testForm">
      <div formGroupName="group1" mdl-radio-group>
        <mdl-radio formControlName="type" value="type1" id="g1t1"></mdl-radio>
        <mdl-radio formControlName="type" value="type2" id="g1t2"></mdl-radio>
      </div>
      <div formGroupName="group2">
        <mdl-radio formControlName="type" value="type1" id="g2t1"></mdl-radio>
        <mdl-radio formControlName="type" value="type2" id="g2t2"></mdl-radio>
      </div>
    </form>
  `
})
class MdlTestUseSameRadioInGroupsComponent implements OnInit {

  public testForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.testForm = new FormGroup({
      group1: new FormGroup({
        type: new FormControl('')
      }),
      group2: new FormGroup({
        type: new FormControl('')
      })
    });
  }

}
