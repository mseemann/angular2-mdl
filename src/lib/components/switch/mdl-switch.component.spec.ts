import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MdlSwitchModule, MdlSwitchComponent } from './mdl-switch.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('Component: MdlSwitch', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ MdlSwitchModule, FormsModule ],
      declarations: [ MdlTestSwitchComponent ],
    });
  }));

  it('should add the css class mdl-switch to the host element', () => {

    let fixture = TestBed.createComponent(MdlTestSwitchComponent);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-switch')).toBe(true);

  });

  it('should fire a change event if the state changed', async(() => {
    let fixture = TestBed.createComponent(MdlTestSwitchComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;

    spyOn(instance, 'onChange');

    fixture.debugElement.query(By.directive(MdlSwitchComponent)).nativeElement.click();

    expect(instance.onChange).toHaveBeenCalledWith(true);
  }));

  it('should be possible to set readonly the switch', async(() => {
    let fixture = TestBed.createComponent(MdlTestSwitchComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;
    let cbDebugElem = fixture.debugElement.query(By.directive(MdlSwitchComponent));

    cbDebugElem.componentInstance.readonly = true;
    fixture.detectChanges();

    // should not change on click
    cbDebugElem.nativeElement.click();
    expect(instance.checkboxValue1).toEqual(false);

  }));

});


@Component({
  selector: 'test-icon',
  template: '<mdl-switch [(ngModel)]="checkboxValue1" mdl-ripple (change)="onChange($event)">switch</mdl-switch>'
})
class MdlTestSwitchComponent {
  public checkboxValue1 = false;

  public onChange(v: boolean) {}

}
