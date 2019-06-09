import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlButtonComponent, MdlButtonModule} from './mdl-button.component';
import { MdlRippleModule} from '../common/mdl-ripple.directive';

describe('Component: MdlButton', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlButtonModule, MdlRippleModule],
      declarations: [MdlTestButtonComponent]
    });
  });


  it('should add the css class mdl-button to the host element', () => {

    TestBed.overrideComponent(MdlTestButtonComponent, { set: {
      template: '<mdl-button></mdl-button>' }
    });

    let fixture = TestBed.createComponent(MdlTestButtonComponent);
    fixture.detectChanges();

    let btnEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(btnEl.classList.contains('mdl-button')).toBe(true);

  });

  it('should add the css class mdl-button to the host element - if mdl-button is used as attribute', () => {

    TestBed.overrideComponent(MdlTestButtonComponent, { set: {
      template: '<button mdl-button></button>' }
    });

    let fixture = TestBed.createComponent(MdlTestButtonComponent);
    fixture.detectChanges();

    let btnEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(btnEl.classList.contains('mdl-button')).toBe(true);

  });

  it('should throw if an unsupported buttontype is provided', () => {

    TestBed.overrideComponent(MdlTestButtonComponent, { set: {
      template: '<mdl-button mdl-button-type="didNotExist"></mdl-button>' }
    });
    let fixture = TestBed.createComponent(MdlTestButtonComponent);

    expect( () => fixture.detectChanges() ).toThrow();

  });

  it('should throw if an unsupported colored type is provided', () => {

    TestBed.overrideComponent(MdlTestButtonComponent, { set: {
      template: '<mdl-button mdl-colored="didNotExist"></mdl-button>' }
    });
    let fixture = TestBed.createComponent(MdlTestButtonComponent);

    expect( () => fixture.detectChanges() ).toThrow();


  });

  it('should call blur on mouseup and mouseleave', () => {

    TestBed.overrideComponent(MdlTestButtonComponent, { set: {
      template: '<mdl-button></mdl-button>' }
    });
    let fixture = TestBed.createComponent(MdlTestButtonComponent);

    fixture.detectChanges();

    var mdlButtonDirective =  fixture.debugElement.query(By.directive(MdlButtonComponent)).componentInstance;

    spyOn(mdlButtonDirective, 'blurIt').and.callThrough();
    expect(mdlButtonDirective.blurIt).not.toHaveBeenCalled();

    mdlButtonDirective.onMouseUp();
    expect(mdlButtonDirective.blurIt).toHaveBeenCalled();

    mdlButtonDirective.onMouseLeave();
    expect(mdlButtonDirective.blurIt).toHaveBeenCalled();

  });


  it('should export the component instance as mdlButton', () => {

    TestBed.overrideComponent(MdlTestButtonComponent, { set: {
      template: '<mdl-button #button="mdlButton">x</mdl-button>' }
    });
    let fixture = TestBed.createComponent(MdlTestButtonComponent);

    fixture.detectChanges();

    let references = fixture.debugElement.query(By.directive(MdlButtonComponent)).references;

    expect(references['button']).toBeDefined();

  });

  it('should expose the elementRef to be used as openFrom for dialogs', () => {

    TestBed.overrideComponent(MdlTestButtonComponent, { set: {
      template: '<mdl-button>x</mdl-button>' }
    });
    let fixture = TestBed.createComponent(MdlTestButtonComponent);

    fixture.detectChanges();

    let button = fixture.debugElement.query(By.directive(MdlButtonComponent)).componentInstance;

    expect(button.elementRef).toBeDefined('elementRef must be present!')
  });

  it('should be possible to disable a button', () => {

    TestBed.overrideComponent(MdlTestButtonComponent, { set: {
      template: '<button mdl-button disabled="true"></button>' }
    });

    let fixture = TestBed.createComponent(MdlTestButtonComponent);
    fixture.detectChanges();

    let btnEl: HTMLButtonElement = fixture.nativeElement.children.item(0);
    expect(btnEl.disabled).toBe(true);

  });
});


@Component({
  selector: 'test-button',
  template: 'replaced by the test'
})
class MdlTestButtonComponent {}
