import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlMenuModule, MdlMenuItemComponent } from './index';
import { MdlButtonComponent, MdlButtonModule } from '../button/mdl-button.component';
import { MdlMenuComponent, MdlMenuRegisty } from './mdl-menu.component';

describe('Component: MdlToggleMenu-Directive', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlMenuModule, MdlButtonModule],
      providers: [ MdlMenuRegisty ],
      declarations: [ MdlTestMenuItemComponent ],
    });
  });

  it('should show the menu if the button is clicked', () => {

    let fixture = TestBed.createComponent(MdlTestMenuItemComponent);
    fixture.detectChanges();

    let item: HTMLElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;

    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;
    spyOn(menu, 'show').and.callThrough();
    spyOn(menu, 'hide');

    // show
    item.click();
    fixture.detectChanges();

    // hide
    item.click();
    fixture.detectChanges();

    expect(menu.show).toHaveBeenCalled();
    expect(menu.hide).toHaveBeenCalled();

  });


});


@Component({
  selector: 'test-menu',
  template: `
    <button mdl-button [mdl-toggle-menu]="m"></button>
    <mdl-menu #m="mdlMenu" ><mdl-menu-item>x</mdl-menu-item></mdl-menu>
  `
})
class MdlTestMenuItemComponent {}
