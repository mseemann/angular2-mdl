import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlTextFieldComponent, MdlTextFieldModule, DISABLE_NATIVE_VALIDITY_CHECKING } from './mdl-textfield.component';
import { MdlButtonComponent, MdlButtonModule } from '../button/mdl-button.component';
import { FormsModule } from '@angular/forms';

describe('Component: MdlTextField', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlTextFieldModule, MdlButtonModule, FormsModule],
      declarations: [MdlTestComponent],
    });
  });


  it('should add the css class mdl-textfield to the host element', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." ></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let tfEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(tfEl.classList.contains('mdl-textfield')).toBe(true);

  });

  it('should support ngModel', async(() => {

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

      });
    });

  }));

  it('should mark the component as focused and blured', () => {

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

  });

  it('should mark the component as invalid ngModel (pattern)', async(() => {

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
    });
  }));

  it('should mark the component as invalid ngModel (min)', async(() => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="number" label="Text..." [(ngModel)]="text1" min="2"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let hostEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    el.value = '1';
    fixture.detectChanges();

    fixture.whenStable().then( () => {
      expect(hostEl.classList.contains('is-invalid')).toBe(true);
    });
  }));

  it('should mark the component as invalid ngModel (max)', async(() => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="number" label="Text..." [(ngModel)]="text1" max="1"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let hostEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    el.value = '2';
    fixture.detectChanges();

    fixture.whenStable().then( () => {
      expect(hostEl.classList.contains('is-invalid')).toBe(true);
    });
  }));


  it('should mark the component as invalid ngModel (step)', async(() => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="number" label="Text..." [(ngModel)]="text1" min="0" step="1"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let hostEl: HTMLElement = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    el.value = '0.1';
    fixture.detectChanges();

    fixture.whenStable().then( () => {
      expect(hostEl.classList.contains('is-invalid')).toBe(true);
    });
  }));


  it('should create a textarea if row is specified', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." rows="3"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('textarea'));

    expect(el).toBeDefined();

  });

  it('should restrict the line count if maxrows is present', () => {

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


  });

  it('should not restrict the line count if maxrows is -1', () => {

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

  });

  it('should create an expandable textfield if icon is present', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" icon="search"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;

    expect(el.classList.contains('mdl-textfield--expandable')).toBe(true);

  });

  it('should activate the expandable if the icon button is clicked', () => {

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

  });

  it('should add name and id to the input element if provided', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." id="id-1" name="name-1"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputEl.name).toEqual('name-1', 'name is not set');
    expect(inputEl.id).toEqual('id-1', 'id is not set');

  });

  it('should autogenerate an id that must match the labels for-attribute', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Text..." name="name-1"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    let id = inputEl.id;

    expect(id).toBeDefined();

    let labelEl: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;

    expect(labelEl.htmlFor).toBeDefined(id);

  });

  it('should pass autocomplete through to input', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield type="text" label="Name" autocomplete="name"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputEl.getAttribute('autocomplete')).toBe('name', 'The autocomplete attribute should pass to the input.');
  });

  it('should have native validity check', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield
            type="text"
            pattern="^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$"
            label="Text..." name="name-1">
        </mdl-textfield>'
      `
      }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'this is not a valid email';

    fixture.detectChanges();

    let el = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
    expect(el.classList.contains('is-invalid')).toBe(true, 'textfield should have css is-invalid');

  });

  it('should be possible to deactive native checking locally', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield
            disableNativeValidityChecking
            type="text"
            pattern="^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$"
            label="Text..." name="name-1">
        </mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'this is not a valid email';

    fixture.detectChanges();

    let el = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
    expect(el.classList.contains('is-invalid')).toBe(false, 'textfield should not have css is-invalid');
  });

  describe('globally deactivated native check', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MdlTextFieldModule, MdlButtonModule, FormsModule],
        declarations: [MdlTestComponent],
        providers: [
          {provide: DISABLE_NATIVE_VALIDITY_CHECKING, useValue: true}
        ]
      });
    });

    it ('should be possible to deactive native checking globally', () => {
      TestBed.overrideComponent(MdlTestComponent, { set: {
        template: `
          <mdl-textfield
            type="text"
            pattern="^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$"
            label="Text..." name="name-1">
        </mdl-textfield>'
      `
      }});
      let fixture = TestBed.createComponent(MdlTestComponent);
      fixture.detectChanges();

      let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      inputEl.value = 'this is not a valid email';

      fixture.detectChanges();

      let el = fixture.debugElement.query(By.directive(MdlTextFieldComponent)).nativeElement;
      expect(el.classList.contains('is-invalid')).toBe(false, 'textfield should not have css is-invalid');
    });

  });

  it('shoud support the autofocus attribute', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield  type="text" autofocus></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputEl.getAttribute('autofocus')).toBe('', 'the autofocus attribute should be set');

  });

  it('should emit the blur and focus event', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield  type="text" (focus)="onFocus($event)" (blur)="onBlur($event)"></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let component = fixture.componentInstance;

    spyOn(component, 'onFocus');
    spyOn(component, 'onBlur');

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.focus();

    expect(component.onFocus).toHaveBeenCalled();

    inputEl.blur();

    expect(component.onBlur).toHaveBeenCalled();
  });

  it('should be possible to set the focus programmatically', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield  type="text"></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);

    let textFieldDebugElement = fixture.debugElement.query(By.directive(MdlTextFieldComponent));
    let textFieldComonent = textFieldDebugElement.componentInstance;
    let el = textFieldDebugElement.nativeElement;

    // if called here the inputEl is not set - if the setFocus didn't check for inoutEl the next line throws.
    textFieldComonent.setFocus();


    fixture.detectChanges();

    // now it is save to call setFocus and the focus is set.
    textFieldComonent.setFocus();

    fixture.detectChanges();

    expect(el.classList.contains('is-focused')).toBe(true);

  });


  it('should be possible to disable the textinputfield', async(() => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield  type="text"></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);

    let cbDebugElem = fixture.debugElement.query(By.directive(MdlTextFieldComponent));

    cbDebugElem.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    let textInputElement: HTMLElement = cbDebugElem.nativeElement;
    expect(textInputElement.classList.contains('is-disabled')).toBe(true, 'should have css is-disabled');

    fixture.whenStable().then(() => {
      let inputElement: HTMLInputElement =  fixture.debugElement.query(By.css('input')).nativeElement;
      expect(inputElement.getAttribute('disabled')).toBe('', 'the underlaying input element should be disbaled');

    });

  }));

  it('should keep type number if the input field is type number', async(() => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield  type="number" [(ngModel)]="numberValue"></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    expect(typeof fixture.componentInstance.numberValue).toBe('number');

    let tfFieldComp = fixture.debugElement.query(By.directive(MdlTextFieldComponent));
    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    el.value = '1';
    tfFieldComp.componentInstance.triggerChange(<any> {target: el});
    fixture.detectChanges();

    expect(tfFieldComp.componentInstance.value).toBe(1);
    expect(typeof tfFieldComp.componentInstance.value).toBe('number');

    el.value = '';
    tfFieldComp.componentInstance.triggerChange(<any> {target: el});
    fixture.detectChanges();

    expect(tfFieldComp.componentInstance.value).toBe(null);
    expect(typeof tfFieldComp.componentInstance.value).toBe('object');

  }));


  it('should add the type text to the input field if no type is specified', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield ></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(el.type).toBe('text');

  });


  it('should set given tabindex value', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield tabindex="-1"></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(el.getAttribute('tabindex')).toBe('-1');
  });

  it('should not set a default tabindex', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-textfield></mdl-textfield>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(el.getAttribute('tabindex')).toEqual(null);

  });

  it('shoud support the readonly attribute', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield  type="text" readonly></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputEl.readOnly).toBe(true, 'the readonly attribute should be set');

  });

  it('shoud support the required attribute', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield  type="text" [required]="true"></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputEl.required).toBe(true, 'the required attribute should be set');

  });

  it('shoud support the floating-label attribute', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield  type="text" floating-label></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let tfEl = fixture.debugElement.query(By.css('.mdl-textfield--floating-label'));

    expect(tfEl).toBeDefined();

  });

  it('shoud support the maxlength attribute', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield  type="text" [maxlength]="10"></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputEl.getAttribute('maxlength')).toBe('10', 'the maxlength attribute should be set');

  });

  it('should emit the keyup event', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-textfield type="text" (keyup)="onKeyup()"></mdl-textfield>'
      `
    }});
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const testComponent = fixture.componentInstance;
    spyOn(testComponent, 'onKeyup');

    let debugElement = fixture.debugElement.query(By.css('input'));
    let el: HTMLElement = debugElement.nativeElement;
    debugElement.triggerEventHandler('keyup', {});

    expect(testComponent.onKeyup).toHaveBeenCalled();

  });

});


@Component({
  selector: 'test',
  template: 'replaced by the test'
})
class MdlTestComponent {
  public text1 = '';

  public numberValue = 0;

  public onBlur(event: FocusEvent) {}

  public onFocus(event: FocusEvent) {}

  public onKeyup(event: KeyboardEvent) {}
}
