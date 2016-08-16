import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MdlSwitchModule } from './mdl-switch.component';
import { FormsModule } from '@angular/forms';

describe('Component: MdlSwitch', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlSwitchModule, FormsModule ],
      declarations: [ MdlTestSwitchComponent ],
    });
  });

  it('should add the css class mdl-switch to the host element', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestSwitchComponent);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-switch')).toBe(true);

    done();
  });


});


@Component({
  selector: 'test-icon',
  template: '<mdl-switch [(ngModel)]="checkboxValue1" mdl-ripple>switch</mdl-switch>'
})
class MdlTestSwitchComponent {
}
