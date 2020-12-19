import {TestBed, waitForAsync} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MdlSwitchComponent} from './mdl-switch.component';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {MdlSwitchModule} from './mdl-switch.module';

@Component({
  // tslint:disable-next-line
  selector: 'test-icon',
  template: '<mdl-switch [(ngModel)]="checkboxValue1" mdl-ripple (change)="onChange($event)">switch</mdl-switch>'
})
class MdlTestSwitchComponent {

  checkboxValue1: any;

  public onChange(v: boolean) {
  }

}


describe('Component: MdlSwitch', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdlSwitchModule.forRoot(), FormsModule],
      declarations: [MdlTestSwitchComponent],
    });
  }));

  it('should add the css class mdl-switch to the host element', () => {

    const fixture = TestBed.createComponent(MdlTestSwitchComponent);
    fixture.detectChanges();

    const checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-switch')).toBe(true);

  });

  it('should fire a change event if the state changed', waitForAsync(() => {
    const fixture = TestBed.createComponent(MdlTestSwitchComponent);
    fixture.detectChanges();

    const instance = fixture.componentInstance;

    spyOn(instance, 'onChange');

    fixture.debugElement.query(By.directive(MdlSwitchComponent)).nativeElement.click();

    expect(instance.onChange).toHaveBeenCalledWith(true);
  }));

});

