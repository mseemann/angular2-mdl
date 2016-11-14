import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlMenuModule, MdlMenuItemComponent } from './index';
import { MdlMenuRegisty } from './mdl-menu.component';

describe('Component: MdlMenuItem-Directive', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlMenuModule],
      providers: [ MdlMenuRegisty ],
      declarations: [ MdlTestMenuItemComponent ],
    });
  });

  it('should add the css class mdl-menu__item--full-bleed-divider to the host element', () => {

    let fixture = TestBed.createComponent(MdlTestMenuItemComponent);
    fixture.detectChanges();

    let item: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;
    expect(item.classList.contains('mdl-menu__item--full-bleed-divider')).toBe(true);

  });


});


@Component({
  selector: 'test-menu',
  template: '<mdl-menu><mdl-menu-item mdl-menu-item-full-bleed-divider>x</mdl-menu-item></mdl-menu>'
})
class MdlTestMenuItemComponent {}
