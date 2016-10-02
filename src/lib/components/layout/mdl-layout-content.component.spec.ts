import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlLayoutContentComponent } from './mdl-layout-content.component';
import { MdlLayoutModule } from './index';

describe('Component: MdlLayoutContent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlLayoutModule ],
      declarations: [ MdlTestLayoutComponent ],
    });
  });

  it('should add the css class mdl-layout__content to the host element', () => {

    let fixture = TestBed.createComponent(MdlTestLayoutComponent);

    fixture.detectChanges();

    let layoutEl: HTMLElement = fixture.debugElement.query(By.directive(MdlLayoutContentComponent)).nativeElement;
    expect(layoutEl.classList.contains('mdl-layout__content')).toBe(true);
  });


});


@Component({
  selector: 'test-layout',
  template: '<mdl-layout-content>x</mdl-layout-content>',
})
class MdlTestLayoutComponent {}
