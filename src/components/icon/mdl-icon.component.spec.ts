import {
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { MdlIconModule } from './mdl-icon.component';

describe('Component: MdlIcon', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlIconModule ],
      declarations: [ MdlTestIconComponent ],
    });
  });

  it('should add the css class material-icons to the host element', () => {

    let fixture = TestBed.createComponent(MdlTestIconComponent);
    fixture.detectChanges();

    let iconEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(iconEl.classList.contains('material-icons')).toBe(true);

  });


});


@Component({
  selector: 'test-icon',
  template: '<mdl-icon>x</mdl-icon>'
})
class MdlTestIconComponent {}
